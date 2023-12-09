import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { CartItem } from "../components/CartItem"
import api from "../axios"
import { IntlContext } from "../contexts/IntlContext"

export function Cart() {
    const [authUser] = useContext(AuthContext)

    const [cartItems, setCartItems] = useState([])

    async function getCartItems() {
        const cart = (await api.get('/userCart'))?.data?.cart
        setCartItems(JSON.parse(cart))
    }

    const [locale] = useContext(IntlContext)

    useEffect(() => {
        getCartItems()
    },[])
    
    if (authUser === 'unauth') {
        return (
            <div className="flex flex-col items-center justify-center mx-auto h-full text-4xl text-center w-1/2 gap-5">
                <p>{locale.cartUnauth}</p>
                <Link to='/baeq-aes/login'><Button>{locale.cartLogin}</Button></Link>
            </div>
        )
    }
    
    return (
        <div className="p-9 h-full">
            <h1 className="text-4xl font-bold">{locale.cartTitle}</h1>
            <div className="cart w-5/6 h-5/6 mx-auto mt-8 p-9">
                {!cartItems?.length && <div className="text-5xl text-center">{locale.cartEmpty}</div> }
                {cartItems.map((item, index) => {
                    return <CartItem multiple={item.multiple} index={index} itemId={item.id} setCartItems={setCartItems} key={item.id} title={item.title} q={item.q}/>
                })}
            </div>
        </div>
    )
}