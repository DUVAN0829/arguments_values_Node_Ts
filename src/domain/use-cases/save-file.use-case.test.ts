import fs from 'fs'
import { SaveFile } from './save-file.use-case';
import { error } from 'console';


describe('SaveFileUseCase', () => {

    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs')
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true })

        const customOutputFolderExists = fs.existsSync('custom-outputs')
        if (customOutputFolderExists) fs.rmSync('custom-outputs', { recursive: true })
    })

    test('should save file with default values', () => {

        const saveFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options)
        const fileExists = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBe(true)
        expect(fileExists).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)

    })

    test('should save file with custom values', () => {

        const saveFile = new SaveFile()
        const options = {
            fileContent: 'custom content',
            fileDestination: 'custom-outputs',
            fileName: 'custom-table-name'
        }

        const filePath = `${options.fileDestination}/${options.fileName}.txt`

        const result = saveFile.execute(options)
        const fileExists = fs.existsSync(filePath)
        const fileContet = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBeTruthy()
        expect(fileExists).toBe(true)
        expect(fileContet).toBe(options.fileContent)

    })

    test('should return false if directory could not be saved', () => {

        const saveFile = new SaveFile()
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { throw new Error('This is a custom error message from testing.') })

        const result = saveFile.execute({ fileContent: 'custom content' })

        expect(result).toBe(false)
        
        mkdirSpy.mockRestore()

    })

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile()
        const writeSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { throw new Error('This is a custom error writing from testing.') })

        const result = saveFile.execute({ fileContent: 'custom content' })

        expect(result).toBe(false)

        writeSpy.mockRestore()

    })

})