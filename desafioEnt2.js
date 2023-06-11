
const fs = require('fs')

class ProductManager {

    constructor ( path ) {
        this.products = []
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

        let prod = {
            id: this.createId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        const enlistar = await this.getProducts()

        this.products.push(prod)

        await fs.promises.writeFile(this.path, JSON.stringify( enlistar ))
    }
    
    // funcion getProducts = devolver el arreglo con todos los productos creados hasta ese momento

    getProducts = async () => {
        try {  

            // Cuál es la diferencia entre fs.existsSync y fs.accessSync ???
            if(fs.accessSync(this.path)) {
                // existe
                const parsear = await fs.promises.readFile(this.path, this.format)
                const parseoListo = JSON.parse( parsear )
                return parseoListo
            }

            return this.products
            
        } catch (err) {
            console.log('No se encontro el archivo, se devuelve vacio')
            return this.products
        }
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

// ---------- // CALLING... 📞// ---------- //  
const retornar = async (path) => {
    const factory = new ProductManager(path)

    await factory.addProduct('producto PRUEBA1', 'Este es un producto prueba', 200,'Sin imagen', 'abc1',25)

    await factory.addProduct('producto PRUEBA2', 'Este es un producto prueba', 200,'Sin imagen', 'abc2',25)

    await factory.addProduct('producto PRUEBA3', 'Este es un producto prueba', 200,'Sin imagen', 'abc3',25)

    await factory.addProduct(' producto PRUEBA4', 'Este es un producto prueba', 200,'Sin imagen', 'abc4',25)

    console.log(await factory.getProducts() )

    // Devuelve el id en formato objeto. 
    await factory.getProductById(2)
    
    // Actualizano producto - no se elimina id ni code ✨
    await factory.updateProduct(4, { title: 'NUEVO Producto n°2', description: 'Sin descripcion',price: 50, thumbnail: 'sin img', stock: 50} )
    // Eliminando objeto id 1 y actualizando en JSON
    await factory.deleteProduct(1)

}
retornar('ProductsAdded.json')