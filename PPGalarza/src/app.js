import express from 'express';
import carts from './routes/carts.router.js'
import products from './routes/products.router.js'
/* import { Router } from 'express'; */
/* import multer from 'multer' */

const app = express()
const PUERTO = process.env.PORT || 8080

app.use(express.json())

app.use('/api/carts', carts)

app.use('/api/products', products)

app.listen(PUERTO, () => `El servidor está escuchando en el puerto ${PUERTO}...`)

/* app.use(express.static('./src/public')) */
/* const storage = multer.diskStorage({
    destination: function (res, file, callback) {
        callback(null, './src/public/thumbnail')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().getTime() + file.originalname)
    } // 02:27:42
}) */ 
