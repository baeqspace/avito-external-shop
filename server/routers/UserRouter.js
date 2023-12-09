import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import queryDB from "../utils/queryDB.js";

const router = new Router()

router.get('/usersAll', authMiddleware('admin'), async (req, res) => {
    const users = await queryDB('select id, email, roles from Users')
    res.json(users)
})

router.delete('/user/:id', authMiddleware('admin'), async (req, res) => {
    const id = req.params.id
    const data = await queryDB(`delete from Users where id=${id}`)
    if (data.error) {res.json(data.error); return}
    res.json('success')
})

router.post('/user/:id', authMiddleware('admin'), async (req,res)=>{
    const id = req.params.id
    const data = await queryDB(`update Users set roles='${JSON.stringify(req.body)}' where id=${id}`)
    if (data.error) {res.json(data.error); return}
    res.json('success')
})

router.get('/userCart', authMiddleware('user'), async (req, res) => {
    const userId = req.userId
    const cart = (await queryDB(`select cart from Users where id=${userId}`))[0]
    res.json(cart)
})

router.post('/userCart', authMiddleware('user'), async (req, res) => {
    const userId = req.userId
    const item = req.body

    const user = (await queryDB(`select cart from Users where id=${userId}`))[0]
    let cart = JSON.parse(user.cart)
    if (item.method === 'add') {
        let notFound = true
        for (let cartItem of cart) {
            if (cartItem.id === item.id) {
                cartItem.q = item.q
                notFound = false
            }
        }
        if (notFound) {
            cart.push({id: item.id, q: item.q, title: item.title, multiple: item.multiple})
        }
    } else {
        cart.splice(cart.findIndex((e) => e.id === item.id), 1)
    }

    cart = cart.map(item => {item.title = item.title?.replaceAll("'", ""); return item})

    await queryDB(`update Users set cart='${JSON.stringify(cart)}' where id=${userId}`)
    res.json('success')
})

router.post('/userCart/one', authMiddleware('user'), async (req, res) => {
    const userId = req.userId
    const item = req.body
    const cart = JSON.parse((await queryDB(`select cart from Users where id=${userId}`))[0].cart)
    for (let cartItem of cart) {
        if (cartItem.id === item.id) {
            res.json({isInCart: true, q: cartItem.q})
            return
        }
    }
    res.json({isInCart: false, q: 0})
})

export default router