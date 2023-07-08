import FileManager from "./file.manager.js"

export default class ProductManager extends FileManager {
    constructor () {
        super('./products.json')
    }

    create = async (data) => {
        return await this.set(data)        
    }

    toListProducts = async () => {
        return await this.get()
    }         
}