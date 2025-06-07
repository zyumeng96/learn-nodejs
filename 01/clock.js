import fs from 'fs'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname).split(':')[1]
console.log(__dirname)

// const clockSrc = new Promise((resolve, reject) => {
//     fs.readFile(path.join(__dirname, 'files/index.html'), (err, data) => {
//         if (err) reject(err)
//         resolve(data)
//     })
// })

// clockSrc.then(value => {
//     console.log(value.toString())
// }).catch(err => {
//     console.log(err)
// })

async function readSrc(filename) {
    const clockSrc = new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
    return clockSrc
}

async function writeSrc(filename, data) {
    const writeData = new Promise((resolve, reject) => {
        fs.writeFile(filename, data, err => {
            if (err) reject(err)
            resolve('文件写成功')
        })
    })
    return writeData
}

// readSrc(path.join(__dirname, 'files/index.html')).then(value => {
//     console.log(value.toString())
//     }).catch(err => {
//         console.log(err)
//     })

const scriptReEx = /<script>[\s\S]*<\/script>/
const cssReEx = /<style>[\s\S]*<\/style>/

try {
    const value = (await readSrc(path.join(__dirname, 'files/index.html'))).toString()
    const scriptSrc = value.match(scriptReEx)[0].replace(/<script>\s|<\/script>/g, '')
    const cssSrc = value.match(cssReEx)[0].replace(/<style>\s|<\/style>/g, '')

    
    await writeSrc(path.join(__dirname, 'files/index.js'), scriptSrc.toString())
    await writeSrc(path.join(__dirname, 'files/index.css'), cssSrc.toString())

    const newValue = value.replace(scriptReEx, '<script src="./index.js"></script>').replace(cssReEx, '<link rel="stylesheet" href="./index.css">')
    await writeSrc(path.join(__dirname, 'files/index1.html'), newValue)
    
} catch(err) {
    console.log(err)
}