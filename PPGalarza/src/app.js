import express from "express";
import { Router } from "express";
import multer from 'multer'

const app = express()

app.use(express.static('./src/public'))

const storage = multer.diskStorage({
    destination: function (res, file, callback) {
        callback(null, './src/public/thumbnail')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().getTime() + file.originalname)
    } // 02:27:42
})
