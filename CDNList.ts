import vm from 'vm'
import { parseScript } from 'esprima'
import { traverse } from 'estraverse'
import { load as loadHtml } from 'cheerio'
import { inspect } from 'util'
const R = '\x1b[31m'
const G = '\x1b[32m'
const Y = '\x1b[33m'
const ED = '\x1b[0m'

const predictGlobalVarName = (packageName: string) =>
    packageName.replace(/[^a-zA-Z]+(.)/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^[a-z]/, m => m.toUpperCase())

const getGlobalVar = (code: string, packageName: string) => {
    packageName = predictGlobalVarName(packageName)
    // 动态执行分析全局变量
    const ctx = vm.createContext()
    const initStat = Object.keys(ctx)
    initStat.push('window')
    try {
        vm.runInContext('var window=globalThis;' + code, ctx)
    } catch (err: any) {
        console.log(`${R}global vars analysis-vm: failed with err {${err.message}} !DEP!${ED}`)
    }
    const finalStat = Object.keys(ctx)
    const newVars = finalStat.filter(v => !initStat.includes(v))
    if (newVars.length) {
        const res = newVars
            .sort((a, b) => b.length - a.length)
            .find(v => v.toLowerCase().includes(packageName.toLowerCase()) ||
                packageName.toLowerCase().includes(v.toLowerCase())
            )
        if (res) return res
    }
    // 若失败，静态语法树分析
    // 解析代码为AST
    const globalVariables: string[] = [];
    try {
        const ast = parseScript(code);

        // 存储全局变量的名字

        // 辅助函数来检查是否是标识符并返回名称
        function getIdentifierName(node: any) {
            return node.type === 'Identifier' ? node.name : null;
        }

        // 遍历AST
        traverse(ast, {
            enter(node) {
                // 检查 var 声明
                if (node.type === 'VariableDeclaration') {
                    node.declarations.forEach(declaration => {
                        const name = getIdentifierName(declaration.id);
                        if (name) globalVariables.push(name);
                    });
                }
                // 检查 window 或 globalThis 上的属性赋值
                if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression') {
                    let objectName = getIdentifierName(node.left.object)
                    if ((objectName === 'window' || objectName === 'globalThis') && node.left.property.type === 'Identifier') {
                        globalVariables.push(node.left.property.name);
                    }
                }
            }
        })
    } catch { }
    if (globalVariables.length) {
        const res = globalVariables
            .sort((a, b) => b.length - a.length)
            .find(v => v.toLowerCase().includes(packageName.toLowerCase()) ||
                packageName.toLowerCase().includes(v.toLowerCase()))
        if (res) return res
    }
    // 若仍失败，则返回预测字符串
    console.log(`${R}global vars analysis-ast: failed.${ED}`)
    return '<' + packageName + '>'
}

const cmpVersion = (a: string, b: string) => {
    if (a === b)
        return 0
    const aArr = a.replaceAll(/[^\d\.]/g, '').split('.')
    const bArr = b.replaceAll(/[^\d\.]/g, '').split('.')
    for (let i = 0; i < Math.min(aArr.length, bArr.length); i++) {
        const aNum = +aArr[i]
        const bNum = +bArr[i]
        if (aNum > bNum) return 1
        if (aNum < bNum) return -1
    }
    return aArr.length - bArr.length
}

const evaluateVerDiff = (target: string, cur: string) => {
    const targetArr = target.replaceAll(/[^\d\.]/g, '').split('.')
    const curArr = cur.replaceAll(/[^\d\.]/g, '').split('.')
    const len = Math.min(targetArr.length, curArr.length)
    let score = 0
    for (let i = 0; i < len; i++) {
        score += Math.abs(+targetArr[i] - +curArr[i]) * Math.pow(10, len - i - 1)
    }
    return score
}

const kws = ['js', 'min', 'prod', 'runtime', 'iife', 'full', 'global']
function evaluateFileName(fileName: string) {
    let score = 0
    if (!fileName.endsWith('.js') || fileName.includes('.amd') || fileName.includes('.cjs') || fileName.includes('.es') || fileName.includes('.umd') || fileName.includes('.mjs'))
        return 0
    kws.forEach(kw => score += fileName.includes(kw) ? 1 : 0)
    score += fileName.includes('global') ? 10 : 0
    return score
}

async function cdnjsVers(libraryName: string) {
    console.log(libraryName)
    const resp = await fetch(`https://api.cdnjs.com/libraries/${libraryName}?fields=versions`)
    if (!resp.ok) return []
    const res = (await resp.json()) as { versions: string[] }
    return res.versions.sort(cmpVersion)
}

async function cdnjsFiles(libraryName: string, version: string) {
    const resp = await fetch(`https://api.cdnjs.com/libraries/${libraryName}/${version}?fields=files`)
    const res = await resp.json() as { files: string[] }
    return res
}


async function unpkgVers(libraryName: string) {
    console.log(libraryName)
    const resp = await fetch(`https://unpkg.com/browse/${libraryName}/`)
    if (!resp.ok) return []
    const $ = loadHtml(await resp.text())
    return $('select[name="version"] option').map((_, el) => $(el).text()).toArray()
}

async function unpkgFiles(libraryName: string, version: string) {
    const baseURl = `https://unpkg.com/browse/${libraryName}@${version}/`
    let resp = await fetch(baseURl + '/dist/')
    // if (!resp.ok) {
    //     resp = await fetch(baseURl + '/bin/')
    // } if (!resp.ok) {
    //     return []
    // }
    const $ = loadHtml(await resp.text())
    // @ts-ignore
    const { target } = JSON.parse($('script')
        .map((_, el) => $(el).text())
        .toArray()
        .find(str => str.startsWith('window.__DATA__')).slice(18)) as { target: { details: { [k: string]: any } } }
    const res = Object.keys(target.details).map(str => str.split('/')[2])
    return res
}

async function zhihuUnpkgVers(libraryName: string) {
    const resp = await fetch(`https://unpkg.zhihu.com/${libraryName}/`)
    const $ = loadHtml(await resp.text())
    return $('select#version option').map((_, el) => $(el).text()).toArray().map(str => str.split('@')[1])
}

async function zhihuUnpkgFiles(libraryName: string, version: string) {
    const resp = await fetch(`https://unpkg.zhihu.com/${libraryName}@${version}/dist/`)
    const $ = loadHtml(await resp.text())
    return $('tr>td>a').map((_, el) => $(el).text()).toArray().filter(str => str.endsWith('.js'))
}
// 1.将包名拿去cdnjs和unpkg上查询版本号
// 2.有无该版本?
//  1.如果没有，则从该版本到低版本找，找到一个看评估值18以内取之。找不到就放弃。
//  2.如果有，拼接看看是不是真的有，随后查询国内镜像源。同理从高往低找，找到一个看评估值18以内取之。找不到就放弃。（优先级：南方科技大学、loli、bootcdn、zhihuUnpkg、bdstatic）
async function handlePackage(packageName: string, targerVer: string): Promise<[string[], string]> {
    packageName = packageName.replaceAll(/[^\w-]/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    const cdns: string[] = []
    let globalVariableName = ''
    targerVer = targerVer.replaceAll(/[^\d\.]/g, '')
    // 1.cdnjs
    const vers = await cdnjsVers(packageName)
    let idx = vers.findIndex(v => v === targerVer)
    idx = idx === -1 ? vers.length - 1 : idx
    let cdnjsFound = -1, cdnjsFileName = ''
    for (let i = idx; i >= 0; i--) {
        if (evaluateVerDiff(vers[i], targerVer) > 18) {
            console.log(`${R}cdnjs: ${packageName} ${targerVer} not found. Only ${vers[i]} found with high version diff!${ED}`)
            break
        }
        console.log(`${Y}cdnjs: ${ED}${G}${packageName}/${vers[i]}${ED} searching...`)
        const { files } = await cdnjsFiles(packageName, vers[i])
        if (!files.length) {
            console.log(`${Y}cdnjs: ${ED}${G}${packageName}/${vers[i]}${ED} has no valid files.`)
            continue
        }
        const candidateFileName = files.sort((a, b) => evaluateFileName(b) - evaluateFileName(a))[0]
        const url = `https://cdnjs.cloudflare.com/ajax/libs/${packageName}/${vers[i]}/${candidateFileName}`
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`${Y}cdnjs: ${ED}${G}${packageName}/${vers[i]}/${candidateFileName}${ED} files request failed.`)
            continue
        }
        cdnjsFound = i
        cdnjsFileName = candidateFileName
        console.log(`${G}cdnjs: ${packageName}/${vers[i]}/${cdnjsFileName} determined.${ED}`)
        cdns.unshift(url)
        // 获取全局变量
        const jsCode = await res.text()
        globalVariableName = getGlobalVar(jsCode, packageName)
        // 结束获取全局变量
        break
    }
    async function _cndjsMirror(urlPrefix: string) {
        for (let i = cdnjsFound; i >= 0; i--) {
            if (evaluateVerDiff(vers[i], targerVer) > 18)
                break
            const url = `${urlPrefix}/${packageName}/${vers[i]}/${cdnjsFileName}`
            const res = await fetch(url)
            if (!res.ok) {
                console.log(`${Y}${urlPrefix}${ED}: ${G}${packageName}/${vers[i]}/${cdnjsFileName}${ED} files request failed.`)
                continue
            }
            cdns.unshift(url)
            break
        }
    }
    // 2.bootcdn
    await _cndjsMirror('https://cdn.bootcdn.net/ajax/libs')
    // 3.lolicdn
    await _cndjsMirror('https://cdnjs.loli.net/ajax/libs')
    // 4.sustech
    await _cndjsMirror('https://mirrors.sustech.edu.cn/cdnjs/ajax/libs')
    if (cdns.length)
        return [cdns, globalVariableName]
    // 5.unpkg
    const vers2 = await unpkgVers(packageName)
    let idx2 = vers2.findIndex(v => v === targerVer)
    idx2 = idx2 === -1 ? vers2.length - 1 : idx2
    let unpkgFound = -1, unpkgFileName = ''
    for (let i = idx2; i >= 0; i--) {
        if (evaluateVerDiff(vers2[i], targerVer) > 18) {
            console.log(`${R}unpkg: ${packageName} ${targerVer} not found. Only ${vers2[i]} found with high version diff!${ED}`)
            break
        }
        console.log(`${Y}unpkg: ${ED}${G}${packageName}/${vers2[i]}${ED} searching...`)
        const files = await unpkgFiles(packageName, vers2[i])
        if (!files.length) {
            console.log(`${Y}unpkg: ${ED}${G}${packageName}/${vers2[i]}${ED} has no valid files.`)
            continue
        }
        const candidateFileName = files.sort((a, b) => evaluateFileName(b) - evaluateFileName(a))[0]
        const url = `https://unpkg.com/${packageName}@${vers2[i]}/dist/${candidateFileName}`
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`${Y}unpkg: ${ED}${G}${packageName}/${vers2[i]}/${candidateFileName}${ED} files request failed.`)
            continue
        }
        unpkgFound = i
        unpkgFileName = candidateFileName
        console.log(`${G}unpkg: ${packageName}/${vers2[i]}/${candidateFileName} determined.${ED}`)
        cdns.unshift(url)
        const jsCode = await res.text()
        globalVariableName = getGlobalVar(jsCode, packageName)
        break
    }
    // 5.bdstatic
    await (async function _unpkgMirror(urlPrefix: string) {
        for (let i = unpkgFound; i >= 0; i--) {
            if (evaluateVerDiff(vers2[i], targerVer) > 18)
                break
            const url = `${urlPrefix}/${packageName}@${vers2[i]}/dist/${unpkgFileName}`
            const res = await fetch(url)
            if (!res.ok) {
                console.log(`${Y}${urlPrefix}${ED}: ${G}${packageName}@${vers2[i]}/${unpkgFileName}${ED} files request failed.`)
                continue
            }
            cdns.unshift(url)
            break
        }
    })('https://code.bdstatic.com/npm');
    // 6.unpkg.zhihu
    const vers3 = await zhihuUnpkgVers(packageName)
    let idx3 = vers3.findIndex(v => v === targerVer)
    idx3 = idx3 === -1 ? vers3.length - 1 : idx3
    for (let i = idx3; i >= 0; i--) {
        if (evaluateVerDiff(vers3[i], targerVer) > 18) {
            console.log(`${R}zhihuUnpkg: ${packageName} ${targerVer} not found. Only ${vers3[i]} found with high version diff!${ED}`)
            break
        }
        console.log(`${Y}zhihuUnpkg: ${ED}${G}${packageName}/${vers3[i]}${ED} searching...`)
        const files = await zhihuUnpkgFiles(packageName, vers3[i])
        if (!files.length) {
            console.log(`${Y}zhihuUnpkg: ${ED}${G}${packageName}/${vers3[i]}${ED} has no valid files.`)
            continue
        }
        const candidateFileName = files.sort((a, b) => evaluateFileName(b) - evaluateFileName(a))[0]
        const url = `https://unpkg.zhihu.com/${packageName}@${vers3[i]}/dist/${candidateFileName}`
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`${Y}zhihuUnpkg: ${ED}${G}${packageName}/${vers3[i]}/${candidateFileName}${ED} files request failed.`)
            continue
        }
        console.log(`${G}zhihuUnpkg: ${packageName}/${vers3[i]}/${candidateFileName} determined.${ED}`)
        cdns.unshift(url)
        break
    }
    return [cdns, globalVariableName]
}

// handlePackage('pinia', '^2.3.0')

// console.log(getGlobalVar('window.Vue=function(){};', 'vue'))

; (async f => {
    const res = await main({
        deps: {
            "vue": "^3.5.13",
        },
        noDeps: {
            // "qs": "^6.14.0",
            "reconnecting-websocket": "^4.4.0",
            // "axios": "^1.7.9",
            // "jsencrypt": "^3.3.2",
            "mock-socket": "^9.3.1",
            // "mockjs": "^1.1.0",

        },
        depsRequired: {
            "vue-router": "^4.5.0",
            // "pinia": "^2.3.0",
            // "element-plus": "^2.9.3",
            // "@element-plus/icons-vue": "^2.3.1",
        }
    })
    console.log(inspect(res, { depth: 4 }))
    // const res = await handlePackage('mock-socket', '^9.3.1')
    // console.log(res)
})();
type SingleModuleNameMapVarNameCdn = {
    mod?: string
    globVar: string
    cdns: string[]
}

type ModuleNameMapVarNameCdn = {
    noDeps: SingleModuleNameMapVarNameCdn[]
    deps: SingleModuleNameMapVarNameCdn[]
    depsRequired: SingleModuleNameMapVarNameCdn[]
    styles?: { id: string, cdns: string[] }[]
}
async function main({ noDeps, deps, depsRequired }: {
    noDeps: { [k: string]: string }
    deps: { [k: string]: string }
    depsRequired: { [k: string]: string }
    styles?: { [k: string]: string }
}) {
    const res: ModuleNameMapVarNameCdn = {
        noDeps: [],
        deps: [],
        depsRequired: []
    }
    for (const k in noDeps) {
        const [cdns, globVar] = await handlePackage(k, noDeps[k])
        res.noDeps.push({ mod: k, cdns, globVar })
    }
    for (const k in deps) {
        const [cdns, globVar] = await handlePackage(k, deps[k])
        res.deps.push({ mod: k, cdns, globVar })
    }
    for (const k in depsRequired) {
        const [cdns, globVar] = await handlePackage(k, depsRequired[k])
        res.depsRequired.push({ mod: k, cdns, globVar })
    }
    return res
}
