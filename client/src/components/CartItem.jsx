import { useContext } from "react"
import api from "../axios"
import { IntlContext } from "../contexts/IntlContext"

export function CartItem({setCartItems, multiple, itemId, title, q, index}) {
    const [locale] = useContext(IntlContext)

    async function sendCart(q, method) {
        if (q === 0) {
            method = 'remove'
        }
        const data = (await api.post('/userCart', {id: itemId, q, title, method})).data
        if (!data === 'success') return

        setCartItems(prev => {
            if (method === 'remove') {
                prev.splice(index, 1)
                return [...prev]
            }
            prev[index].q = q
            return [...prev]
        })
    }

    return (
        <div className="cart-item flex items-center mb-5 h-16 rounded-3xl">
            <p className="w-full ml-5 text-2xl">{title}</p>
            {multiple && <div className="flex items-center text-center gap-4 mr-8">
                <div onClick={() => sendCart(q - 1, 'add')} className="flex items-center justify-center cart-item-button text-4xl w-9 h-9 rounded-3xl cursor-pointer">-</div>
                <div className="text-3xl w-9">{q}</div>
                <div onClick={() => sendCart(q + 1, 'add')} className="flex items-end justify-center cart-item-button text-4xl w-9 h-9 rounded-3xl cursor-pointer">+</div>
            </div>}
            <button onClick={() => sendCart(0, 'remove')} className="cart-item-delete flex-shrink-0 text-2xl h-full w-40 text-white rounded-r-3xl">{locale.cartDelete}</button>
        </div>
    )
}