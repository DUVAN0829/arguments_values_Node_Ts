import fs from "fs"
import { yarg } from "./config/plugins/yargs.plugin"

const { b: base, l: limit, s: show } = yarg

let outputMessage = ''
const headerMessage = `
==========================
    Tabla de ${base}
========================== \n`

for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`
}

if (show) {
    outputMessage = headerMessage + outputMessage
    console.log(outputMessage)

    const outputPath = 'outputs'

    fs.mkdirSync(outputPath, { recursive: true })
    fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage)
} else {
    throw 'No se puede mostrar la tabla...'
} 