import fs from 'fs'

export interface SaveFileUseCase {
    execute: (options: Options) => boolean
}

export interface Options {
    fileContent: string
    fileDestination?: string
    fileName?: string
}

export class SaveFile implements SaveFileUseCase {

    execute({ fileContent, fileDestination = 'outputs', fileName = 'table' }: Options) {

        try {

            fs.mkdirSync(fileDestination, { recursive: true })
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)

            console.log('File Created!')

            return true

        } catch (error) {

            // console.error(error) Logger
            return false

        }

    }

}