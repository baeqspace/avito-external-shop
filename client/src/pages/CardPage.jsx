import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { IntlContext } from '../contexts/IntlContext'
import AvitoService from '../services/AvitoService'
import api from '../axios'

export function CardPage() {
    const params = useParams()

    const [locale] = useContext(IntlContext)

    const [item, setItem] = useState({})
    const [currentPhoto, setCurrentPhoto] = useState('')
    const [inCart, setInCart] = useState({isInCart: false, q: 0})

    async function getItem() {
        const data = await AvitoService.getAvitoOne(params.id)
        data.photos = JSON.parse(data.photos)
        data.multiple = JSON.parse(data.multiple)
        setItem(data)
        setCurrentPhoto(data.photos[0])
    }

    async function handleCartChange(id, q, method) {
        if (q === 0) {
            method = 'remove'
        }
        const data = (await api.post('/userCart', {id, q, title: item.itemName, multiple: item.multiple, method})).data
        if (data !== 'success') return

        if (method === 'add') {
            setInCart({isInCart: true, q})
        } else {
            setInCart({isInCart: false, q})
        }
    }

    async function isInCart() {
        const id = params.id
        const data = (await api.post('/userCart/one', {id: Number(id)})).data
        if (data.isInCart) {
            setInCart({isInCart: true, q: data.q})
        }
    }

    useEffect(()=>{
        getItem()
        isInCart()
    },[])

    return (
        <div className="grid grid-cols-2 p-9 gap-9">
            <div>
                <img className="card-page-img w-full object-contain rounded-2xl" src={currentPhoto} alt="" />
                <div className="flex flex-wrap justify-center gap-8 mt-9">
                    {item.photos?.map((photo) => {
                        return <img key={photo} onClick={(e) => setCurrentPhoto(e.target.src)} className="page-img w-24 h-24 object-cover rounded-2xl transition-all cursor-pointer" src={photo}/>
                    })}
                </div>
            </div>
            <div>
                <h1 className="item-name text-5xl">{item.itemName}</h1>
                <h2 className="item-price text-5xl mt-14">{item.price} RUB</h2>
                <h3 className="item-location text-3xl mt-14">{item.itemLocation}</h3>
                <h3 className="text-3xl mt-5">{item.multiple ? locale.cardPageMultiple1 : locale.cardPageMultiple2}</h3>
                {!inCart.isInCart 
                ?   <Button classes="mt-5" onClick={() => handleCartChange(item.id, 1, 'add')}>{locale.cardPageAdd}</Button>
                :   <div className="flex items-center justify-between w-3/4 mt-5">
                        {item.multiple && <button onClick={() => handleCartChange(item.id, inCart.q - 1, 'add')} className="button-ui text-5xl w-10 h-10 flex items-end justify-center rounded-full">-</button>}
                        {inCart.q === 1 ? <Button onClick={() => handleCartChange(item.id, 1, 'remove')}>{locale.cardPageRemove}</Button> : <div className={"text-5xl"}>{locale.cardPageAlready} {inCart.q} {locale.cardPageAlreadyUnit}</div> }
                        {item.multiple && <button onClick={() => handleCartChange(item.id, inCart.q + 1, 'add')} className="button-ui text-5xl w-10 h-10 flex items-center justify-center rounded-full">+</button>}
                    </div> }
                {item.avitoLink && <p className="item-info mt-36 text-2xl text-center">{locale.cardPageHint}</p>}
                {item.avitoLink && <a href={item.avitoLink}><Button classes="mx-auto">{locale.cardPageButton}</Button></a>}
            </div>
        </div>
    )
}