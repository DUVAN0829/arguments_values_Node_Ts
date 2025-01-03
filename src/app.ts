import { yarg } from "./config/plugins/yargs.plugin"
import { serverApp } from "./presentation/server-app"

// console.log(process.argv)

// console.log(yarg.b)

(() => {
    main()
})()

async function main() {

    const { b: base, l: limit, s: showTable, n: fileName, d: destination } = yarg

    serverApp.run({ base, limit, showTable, fileName, destination})

}