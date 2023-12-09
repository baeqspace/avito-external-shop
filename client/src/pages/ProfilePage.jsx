import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Button } from "../components/Button"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"
import { IntlContext } from "../contexts/IntlContext"



export function ProfilePage() {
    const [authUser, setAuthUser, checkAuth] = useContext(AuthContext)
    const [locale] = useContext(IntlContext)
    const nav = useNavigate()

    async function logout() {
        let data = await AuthService.logout()
        localStorage.removeItem('token')
        setAuthUser('unauth')
        nav('/baeq-aes/login')
    }

    useEffect(()=> {
        checkAuth()
    },[])

    return (
        <div className="p-9">
            <h1 className="font-bold text-4xl">{locale.profileTitle}</h1>
            <h2 className="text-4xl mt-12">{locale.profileEmail}</h2>
            <div className="text-3xl mt-5">{authUser?.email}</div>
            <h2 className="text-4xl mt-12">{locale.profileRoles}</h2>
            <div className="text-3xl mt-5">{authUser?.roles.includes('admin') ? locale.profileAdmin : locale.profileUser}</div>
            <div className="flex flex-col justify-center mt-36">
                {authUser?.roles.includes('admin') && <Link to='/baeq-aes/admin'><Button classes="mx-auto">{locale.profileAdminDashboard}</Button></Link>}
                <Button classes="mt-5 mx-auto" onClick={logout}>{locale.profileLogout}</Button>
            </div>
        </div>
    )
}