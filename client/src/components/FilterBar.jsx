import { useState, useEffect, useContext } from 'react'
import {IntlContext} from '../contexts/IntlContext.jsx'


export function FilterBar({items, setSortedItems}) {
    const [locale] = useContext(IntlContext)
    const [sortSelect, setSortSelect] = useState('by-name-asc')
    const [searchQuery, setSearchQuery] = useState('')

    
    const prices = items.map(item => item.price)
    const maxPrice = items.length ? Math.max(...prices) : 0
    const minPrice = items.length ? Math.min(...prices) : 0

    const [state, setState] = useState()
    
    const [priceRange, setPriceRange] = useState({min: minPrice,  max: maxPrice})

    useEffect(()=>{
        setPriceRange({min: minPrice, max: maxPrice})
        setState({})
    },[items])

    useEffect(()=> {
        applyFilters()
    }, [state])

    if (!items.length) {return <h1>Загрузка</h1>}

    
    function applyFilters() {
         if (Number(priceRange.min) > Number(priceRange.max)) {
            alert(locale.filterPriceRangeWarning)
            return
        } 

        let sortedItems = [...items]
        sortedItems = sortedItems.filter((item) => {
            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        })
        sortedItems = sortedItems.filter((item) => {
            return item.price >= priceRange.min && item.price <= priceRange.max
        })
        sortedItems = sortedItems.sort((a,b)=> {
            switch (sortSelect) {
                case 'by-name-asc':
                    return a.itemName.localeCompare(b.itemName)
                case 'by-name-desc':
                    return b.itemName.localeCompare(a.itemName)
                case 'by-price-asc':
                    return a.price - b.price
                case 'by-price-desc':
                    return b.price - a.price
            }
        })
        setSortedItems([...sortedItems])
    }

    


    return (
        <div className="sticky top-0 filter-bar p-9 text-2xl">
                <h1 className="text-center">{locale.filterTitle}</h1>
                <h2 className="mt-4">{locale.filterSearchTitle}</h2>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mt-2 w-full" type="text" placeholder={locale.filterSearchPlaceholder}/>
                <h2 className="mt-5">{locale.filterSortTitle}</h2>
                <select value={sortSelect} onChange={(e) => setSortSelect(e.target.value)} className="mt-2">
                    <option value="by-name-asc">{locale.filterSortType1}</option>
                    <option value="by-name-desc">{locale.filterSortType2}</option>
                    <option value="by-price-asc">{locale.filterSortType3}</option>
                    <option value="by-price-desc">{locale.filterSortType4}</option>
                </select>
                <h2 className="mt-5">{locale.filterPriceFrom}</h2>
                <input className="price-range" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} min={minPrice} max={maxPrice} type="range" />{priceRange.min}
                <h2 className="mt-5">{locale.filterPriceTo}</h2>
                <input className="price-range" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} min={minPrice} max={maxPrice} type="range" />{priceRange.max}
                <button onClick={() => applyFilters()} className="filter-apply w-64 h-20 rounded-lg absolute block bottom-9">{locale.filterApplyButton}</button>
            </div>
    )
}