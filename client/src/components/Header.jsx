import { Link } from "react-router-dom";
import {useContext, useEffect, useState} from 'react'
import { IntlContext } from "../contexts/IntlContext";
import { LocaleCheckbox } from "./LocaleCheckbox";
import { ThemeSlider } from "./ThemeSlider";
import { AuthContext } from "../contexts/AuthContext";

export function Header({setTheme}) {
    const [locale] = useContext(IntlContext)
    const [authUser] = useContext(AuthContext)

    return (
        <header className="h-full flex items-center px-9 justify-between">
            <div className="logo text-3xl w-fit">baeq.shop</div>
            <nav className="flex gap-12 text-2xl">
                <Link to='/baeq-aes/'>{locale.headerMain}</Link>
                <Link to='/baeq-aes/catalog'>{locale.headerCatalog}</Link>
                <Link to='/baeq-aes/contact'>{locale.headerContacts}</Link>
            </nav>
            <div className="flex gap-6 text-2xl items-center">
                <LocaleCheckbox/>
                <ThemeSlider setTheme={setTheme}/>
                {authUser?.roles?.includes('user') ? <Link to='/baeq-aes/profile' title={authUser.email}>{locale.headerProfile}</Link> : <Link to='/baeq-aes/login'>{locale.headerLogin}</Link>}
                <Link to='/baeq-aes/cart'>{locale.headerCart}</Link>
            </div>
        </header>
    )
}