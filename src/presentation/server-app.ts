import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"

interface RunOptions {
    base: number
    limit: number
    showTable: boolean
    fileName: string
    destination: string
}

export class serverApp {

    static run({ base, limit, showTable, fileName, destination }: RunOptions) {

        // const { base, limit, showTable } = options

        const table = new CreateTable().execute({ base, limit })
        const wasCreated = new SaveFile().execute({ fileContent: table, fileName, fileDestination: destination })

        if (showTable) console.log(table)

    }

}