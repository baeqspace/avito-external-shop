import { Card } from './Card.jsx'
import { useState, useEffect} from 'react'

export function CardsContainer({items}) {

    return (
        <div className="cards-container grid justify-items-center gap-9 p-9">
            {items.map((item) => {
                const photos = JSON.parse(item.photos)
                return <Card key={item.id} id={item.id} title={item.itemName} price={item.price} photo={photos[0]}/>
            })}
        </div>
    )
}