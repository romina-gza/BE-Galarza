import fs from 'fs'

export default class FileManager {
	constructor( filename = './productsDatabase.json'	) {
		this.filename = filename
		}
	
	getNextId = (list) => {
		return (list.length == 0) ? 1 : list[list.length -1].id + 1 
	}

	get = async (list) => {
		return fs.promises.readFile(this.filename, 'utf-8')
			.then(resp => JSON.parse(resp))
			.catch(err => { return [] })
	}

	getById = async (id) => {
		const data = await this.get()
		return data.find(prod => prod.id == id) 
	}

	set = async (data) => {
		const list = await this.get()
		data.id = this.getNextId(list)

		//codigo repetido
		const repeadCode = list.some(prod => prod.code === data.code)
        
        if (repeadCode) {
            return console.log(`El código ${data.code} ya existe.`)
		} 

		console.log('este es DATA: ', data)
		console.log('este es list= ', list)
		list.push(data)
		return fs.promises.writeFile(this.filename, JSON.stringify(list, null, 2))
	}

	update = async (data) => { 
		const list = await this.get()
		const idx = list.findIndex(prod => prod.id == data.id)
		list[idx] = data

		return fs.promises.writeFile(this.filename, JSON.stringify(list))
	}
}