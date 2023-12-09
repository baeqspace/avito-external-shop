import { Card } from "../components/Card";
import { CardsContainer } from "../components/CardsContainer";
import { FilterBar } from "../components/FilterBar";
import {useState, useEffect} from 'react'
import AvitoService from "../services/AvitoService";

export function Catalog() {
    const [items, setItems] = useState([])
    const [sortedItems, setSortedItems] = useState([])

    async function getItems() {
        const data = await AvitoService.avitoAll()
        setItems(data)
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className="catalog grid h-full">
            <FilterBar items={items} setSortedItems={setSortedItems}/>
            <CardsContainer items={sortedItems}/>
        </div>
    )
}