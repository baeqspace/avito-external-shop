import { Link } from "react-router-dom";

export function Card({ id, title, price, photo }) {
    return (
        <Link to={`/baeq-aes/catalog/${id}`}>
            <div className="card rounded-3xl grid w-80 h-96 hover:scale-110 transition-all">
                <img className="card-img w-full h-full object-cover rounded-t-3xl" src={photo} alt="" />
                <div className="relative card-content p-4">
                    <h1 className="card-text text-2xl">{title}</h1>
                    <h2 className="absolute bottom-5 text-3xl">{price} RUB</h2>
                </div>
            </div>
        </Link>
    )
}