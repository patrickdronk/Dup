const fs = require('fs')
const path = require('path');

const listProcessorFilesRecursive = (processorFiles, rootPath) => {
    const names = fs.readdirSync(rootPath, {withFileTypes: true})

    for(let name of names) {
        if(name.name.includes("processor.ts")) processorFiles.push(name.name)
    }

    const dirNames = names.filter((name) => name.isDirectory())
    if(!dirNames.length) return processorFiles

    for(let dirName of dirNames) {
        const dirPath = path.join(rootPath, dirName.name)
        listProcessorFilesRecursive(processorFiles, dirPath)
    }

    return processorFiles
}

const files = listProcessorFilesRecursive([], path.join(__dirname, "myApp"))
