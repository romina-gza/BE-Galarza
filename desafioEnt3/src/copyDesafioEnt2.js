import fs from 'fs'
/* const fs = require('fs')
 */
export default class ProductManager {

    constructor ( path ) {
        this.products = this.getExistingProductsSync();
        // agregando this.path
        this.path = path
        this.format = 'utf-8'
    }

    createId = () => {
        return this.products.length + 1
    }

    // -> (recuerda siempre guardarlo como un array en el archivo).
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Todos los campos son obligatorios. 💢")
        }

        const codigoRepetido = this.products.some(prod => prod.code === code)
        
        if (codigoRepetido) {
            return console.log(`El código ${code} ya existe.`)
        }

        const prod = {
            id: this.createId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        this.products.push(prod);

        await this.writeFileAsync();
    }
    
    // funcion getProducts = devolver el arreglo con todos los productos creados hasta ese momento

    getProducts = async (limit) => {
        try {
            if (limit) {
                return this.products.slice(0, limit);
            }
            return this.products;
            
        } catch (err) {
            console.log('No se encontro el archivo, se devuelve vacio');
            return this.products;
            }
    }

    getExistingProductsSync() {
        try {
            if (fs.existsSync(this.path)) {
            const content = fs.readFileSync(this.path, this.format);
            const parsedContent = JSON.parse(content);
            return parsedContent;
            }
        } catch (err) {
            console.log('No se encontro el archivo, se devuelve vacio');
        }

        return [];
    }

    writeFileAsync() {
        return fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, 2)
        );
    }

    getProductById = async (Id) => {
        // tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
        let leer = await fs.promises.readFile( this.path, this.format )
        let afterRead = JSON.parse(leer)
        const product = afterRead.find(prod => prod.id === Id);

        if (!product) {
            return console.log(`Not found the Id ${Id}`);
        } else {
            return console.log('producto devuelto como obj : ', product);
        }
    }

    updateProduct = async (Id, updatedContent) => {
        try {
            const content = await fs.promises.readFile(this.path, this.format);
            let contentParse = JSON.parse(content);
            const getIndex = contentParse.findIndex((prod) => prod.id === Id);
            
            if (getIndex !== -1) {
                const { id: idExistente, code: codeExistente, ...propiedadExistente } = contentParse[getIndex];
                const productoActualizado = { id: idExistente, code: codeExistente, ...propiedadExistente, ...updatedContent };
                contentParse[getIndex] = productoActualizado;
                const actualizarDatos = JSON.stringify(contentParse, null, 2); 
                
                await fs.promises.writeFile(this.path, actualizarDatos, this.format);

                console.log('Archivo actualizado correctamente.');
            } else {
                console.log(`No se encontró el objeto con el ID ${Id}.`);
            }
            } catch (err) {
            console.log(err);
            }
        };
        

    deleteProduct = async (Id) => {
        // debe recibir un id y debe eliminar el producto que tenga ese id en el archivo
        const content = await fs.promises.readFile(this.path, this.format);
        let contentParse = JSON.parse(content); 
        const newArray = contentParse.filter((obj) => obj.id !== Id);
        const newString = JSON.stringify(newArray, null, 2);
        await fs.promises.writeFile(this.path, newString, this.format);
    }

}

