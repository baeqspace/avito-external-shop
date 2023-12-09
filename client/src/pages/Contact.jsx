import { useContext } from "react";
import { Button } from "../components/Button";
import { IntlContext } from "../contexts/IntlContext";


export function Contact() {
    const [locale] = useContext(IntlContext)
    return (
        <article className="text-4xl p-9">
            <h1 className="font-bold">{locale.contact1}</h1>
            <p className="mt-6 w-3/4">{locale.contact2}</p>
            <h1 className="font-bold mt-16">{locale.contact3}</h1>
            <p className="mt-6 w-3/4">{locale.contact4}</p>
            <a href="https://www.avito.ru/user/83db39dfb98ea05a421c3d61a413be98/profile"><Button classes="mt-20 mx-auto">{locale.contactProfileButton}</Button></a>
        </article>
    )
}