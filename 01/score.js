const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'files/成绩.txt'), (err, data) => {
    if (err) return console.log(err)
    // console.log(data.toString())
    data = data.toString()
    data = data.replace(/=/g, ':')
    data = data.replace(/\s/g, '\n')
    // data = data.split(' ')
    // data = data.join('\n')
    console.log(data)
    fs.writeFile(path.join(__dirname, 'files/score.txt'), data, err => {
        if (err) return console.log(err)
        console.log('写文件成功')
    })
})