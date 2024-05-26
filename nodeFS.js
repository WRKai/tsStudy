const fs = require('fs'), path = require('path'), os = require('os')
const filename = path.resolve(__dirname, './nothing.txt')
class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename
        this.name = name
        this.ext = ext
        this.isFile = isFile
        this.size = size
        this.createTime = createTime
        this.updateTime = updateTime
    }
    static async fromFilename(filename) {
        const stat = await fs.promises.stat(filename)
        const name = path.basename(filename)
        const ext = path.extname(filename)
        const isFile = stat.isFile()
        const size = stat.size
        const createTime = new Date(stat.birthtime)
        const updateTime = new Date(stat.mtime)
        return new File(filename, name, ext, isFile, size, createTime, updateTime)
    }
    async getContent(isBuffer = false) {
        if (!this.isFile) return null
        if (isBuffer) {
            return await fs.promises.readFile(this.filename)
        } else {
            return await fs.promises.readFile(this.filename, 'utf-8')
        }
    }
    async getChildren() {
        if (this.isFile) return []
        let children = await fs.promises.readdir(this.filename)
        children = children.map(child => {
            const childPath = path.resolve(this.filename, child)
            return File.fromFilename(childPath)
        })
        return await Promise.all(children)
    }
}
const readDir = async dirname => (await (await File.fromFilename(dirname)).getChildren())

    //
    // fs.readFile(path.resolve(__dirname, './nodeTopObj.js'), (err, data) => {
    //     console.log(data.toString('utf-8'))
    // })
    // fs.promises.readFile(path.resolve(__dirname, './nodeTopObj.js'), 'utf-8').then(data => {
    //     console.log(data.toString('utf-8'))
    // })
    ; (async () => {
        // const data = await fs.promises.readFile(path.resolve(__dirname, './nodeTopObj.js'), 'utf-8')
        // console.log(data.toString('utf-8'))
        // await fs.promises.writeFile(filename, 'Hello World!')
        // await fs.promises.writeFile(filename, `${os.EOL}Hello World!${os.EOL}`, {
        //     flag: 'a'
        // })
        //
        //手动复制文件
        // const originBuffer = await fs.promises.readFile(path.resolve(__dirname, './moxin.jpg'))
        // await fs.promises.writeFile(path.resolve(__dirname, './moxinCopy.jpg'), originBuffer)
        // console.log("复制成功!!")
        //
        // const stat = await fs.promises.stat(filename)
        // console.log(stat)
        // console.log(stat.isDirectory())
        // console.log(stat.isFile())
        //
        // const list = await fs.promises.readdir(path.resolve(__dirname))
        // console.log(list)
        const filename = path.resolve(__dirname, './.vscode')
        // const file = await File.fromFilename(filename)
        // console.log(file)
        // console.log(await file.getContent())
        // console.log(await file.getChildren())
        console.log(await readDir(filename))
    })();
//

