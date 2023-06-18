import express, { request, response } from 'express'

const app = express()
const {default: ProductManager } = await import('./copyDesafioEnt2.js')
// ---------- // CALLING... 📞// ---------- //  
const serverInit = async () => {
    const factory = new ProductManager('ProductsAdded.json')

    await factory.addProduct('remera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/201472-800-auto?v=638107008425630000&width=800&height=auto&aspect=true', 'abc1',25)

    await factory.addProduct('remera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/204904-800-auto?v=638149275925630000&width=800&height=auto&aspect=true', 'abc2',25)

    await factory.addProduct('remera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/202984-800-auto?v=638128632568600000&width=800&height=auto&aspect=true', 'abc3',25)

    await factory.addProduct('mochila', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/189252-1000-NaN?v=637856440450930000&width=1000&height=NaN&aspect=true', 'abc4',25)

    await factory.addProduct('riñonera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/189679-800-auto?v=637871107706470000&width=800&height=auto&aspect=true', 'abc5',25)

    await factory.addProduct('borcegos', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/201860-800-auto?v=638114578153600000&width=800&height=auto&aspect=true', 'abc6',25)

    await factory.addProduct('polera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/206162-800-auto?v=638203661067800000&width=800&height=auto&aspect=true', 'abc7',25)

    await factory.addProduct('campera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/194239-800-auto?v=637963424042600000&width=800&height=auto&aspect=true', 'abc8',25)

    await factory.addProduct('campera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/204303-1000-NaN?v=1773258613&width=1000&height=NaN&aspect=true', 'abc9',25)

    await factory.addProduct('remera', 'Este es un producto prueba', 200,'https://street47.vtexassets.com/arquivos/ids/201732-800-auto?v=638107898091130000&width=800&height=auto&aspect=true', 'abc10',25)

    const escape = await factory.getProducts();
    
    app.get('/products', (request, response) => {
      let limit = parseInt(request.query.limit);
      console.log('es limit ', limit);
      let escapeLimit;
    
      if (!limit || isNaN(limit)) {
        escapeLimit = escape;
      } else {
        escapeLimit = factory.getProducts(limit);
      }
    
      response.send({ escape: escapeLimit });
    } )

    app.listen(8080, ()=> console.log('escuchando en puerto 8080 ...'))
}
serverInit()
