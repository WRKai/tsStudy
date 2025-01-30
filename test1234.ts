import { exec } from 'child_process'


const regex = /\[STREAM\]\s+codec_name=(.+)\s+\[\/STREAM\]/g
async function test() {
    const p = `"D:\\BaiduNetdiskDownload\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffprobe.exe"`
    const p2 = `"D:\\BaiduNetdiskDownload\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe"`
    const cmdArgs = ` -v error -select_streams v:0 -show_entries stream=codec_name `
    const f = `"D:\\BaiduNetdiskDownload\\05 vue ssr\\converted.mp4"`
    const cmdArgs2 = ` -y -i ${f} -c:v libx264 -crf 20`
    // const codec = regex.exec(await executeCommand(p, cmdArgs, f))![1].trim()
    // if (codec === 'hevc') {
    //     await executeCommand(p2, cmdArgs2, `"D:\\BaiduNetdiskDownload\\05 vue ssr\\converted.mp4"`)
    // }
    // console.log(codec)
    // 生成缩略图
    const smallImagePath = `"D:\\BaiduNetdiskDownload\\05 vue ssr\\cover.png"`
    const cmdArgs3 = `${p2} -i ${f} -y -vframes 1 -vf "scale=min(170\\,iw*min(170/iw\\,170/ih)):min(170\\,ih*min(170/iw\\,170/ih))" ${smallImagePath}`
    await executeCommand('', cmdArgs3, '')
}
async function executeCommand(p: string, cmdArgs: string, f: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const fullCmd = `${p} ${cmdArgs} ${f}`
        console.log(fullCmd)
        exec(fullCmd, (err, o, _) => {
            if (err) {
                console.log(err)
                reject('error')
            } else
                resolve(o)
        })
    })
}
test()

/**
 * [STREAM]
codec_name=h264
[/STREAM]
 */