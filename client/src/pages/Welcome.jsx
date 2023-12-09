import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useContext } from "react";
import { IntlContext } from "../contexts/IntlContext";

export function Welcome() {
    const [locale] = useContext(IntlContext)

    return (
        <div className="flex items-center justify-center w-3/4 h-full mx-auto text-6xl text-center">
            <article>
                <h1 className="font-bold">{locale.welcome1}</h1>
                <br />
                <p>{locale.welcome2}</p>
                <br />
                <p>{locale.welcome3}</p>
                <Link to='/baeq-aes/catalog'><Button classes="mt-11 mx-auto">{locale.welcome4}</Button></Link>
            </article>
        </div>
    )
}