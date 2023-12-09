import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import queryDB from '../utils/queryDB.js'
import updateAvitoDB from '../utils/updateAvitoDB.js'

const router = new Router()

router.get('/avitoAll', async (req, res) => {
    const data = await queryDB('select * from AvitoItems')
    res.json(data)
})

router.get('/avitoOne/:id', async (req, res) => {
    const id = req.params.id
    const data = (await queryDB(`select * from AvitoItems where id=${id}`))[0]
    res.json(data)
})

router.delete('/avitoOne/:id', authMiddleware('admin'), async (req, res) => {
    const id = req.params.id
    await queryDB(`delete from AvitoItems where id=${id}`)
    res.json('success')
})

router.post('/addAvito', authMiddleware('admin'), async (req, res) => {
    const item = req.body
    await queryDB(`insert into AvitoItems (id, itemName, price, startTime, itemLocation, photos, avitoLink) values (${Date.now()}, "${item.title}", ${item.price}, ${Date.now()}, "${item.location}", '${JSON.stringify(item.photos)}', null)`)
    res.json('success')
})

router.get('/updateAvito', authMiddleware('admin'), async (req, res) => {
    await updateAvitoDB()
    res.json('success')
})

export default router