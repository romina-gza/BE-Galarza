class ProductManager {

    constructor(){
        this.products = []
    }
    /* 
    Agregará un producto al arreglo de productos inicial.
    -Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    -Al agregarlo, debe crearse con un id autoincrementable
 */
    createId(){
        return this.products.length + 1
    }
    addProduct(title, description, price, thumbnail, code, stock){

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.")
            return
        }

        const codigoRepetido = this.products.some(prod => prod.code === code);
        if (codigoRepetido) {
            console.log(`El código ${code} ya existe.`)
            return
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

        this.products.push(prod)
    }

    //devolver el arreglo con todos los productos creados hasta ese momento
    getProduct(){
        return this.products
    }

    getProductById(Id){
        const product = this.products.find(prod => prod.id === Id);

        if (product) {
            return console.log(product);
        } else {
            return console.log(`Not found the Id ${Id}`);
        }
    }
}

const factory = new ProductManager()

factory.addProduct('producto prueba1', 'Este es un producto prueba', 200,'Sin imagen', 'abc123',25)

factory.addProduct('producto prueba2', 'Este es un producto prueba', 200,'Sin imagen', 'abc123',25)

/* console.log('getproducts: ' ,factory.getProduct()) */
factory.getProductById(0)