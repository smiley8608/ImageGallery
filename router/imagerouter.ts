
import express = require('express')
import { date } from 'joi'
import multer = require('multer')
import path from 'path'
import * as Imageuplode from '../controller/imagecontroller'
import middleware from '../middleware/middleware'

const ImageRouter:any = express.Router()
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'dbimages')
    }, filename(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const uplode = multer({ storage: storage, limits: { fileSize: 1025 * 1025 * 25 } })
ImageRouter.post('/uploade', middleware,uplode.array('dbimages'), Imageuplode.ImageController)
ImageRouter.get('/allimages',middleware,Imageuplode.AllImageController)
ImageRouter.get('/myimages',middleware,Imageuplode.MyImageCOntroller)
ImageRouter.get('/viewer/:id',middleware,Imageuplode.ImageViewer)

export default ImageRouter