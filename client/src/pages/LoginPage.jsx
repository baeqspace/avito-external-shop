import { Button } from "../components/Button";
import { useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { IntlContext } from "../contexts/IntlContext";

export function LoginPage() {
    const [authUser, setAuthUser, checkAuth] = useContext(AuthContext)
    const [locale] = useContext(IntlContext)

    const [form, setForm] = useState({ isReg: false, email: '', pass: '' })

    const nav = useNavigate()

    async function sendAuth() {
        if (!form.email || !form.pass) { alert('данные не указаны'); return }

        let data;
        if (form.isReg) {
            data = await AuthService.reg(form.email, form.pass)
        } else {
            data = await AuthService.login(form.email, form.pass)
        }

        console.log(data)
        if (data.error) { alert(data.error); return }
        localStorage.setItem('token', data.accessToken)
        checkAuth()
    }

    useEffect(()=>{
        if (authUser?.id) {
            nav('/baeq-aes/profile')
        }
    }, [authUser])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="login-form flex flex-col justify-center items-center">
                <label className="login-checkbox w-80 h-12 text-3xl rounded-full text-center flex items-center justify-between p-4 text-black">
                    <span className="z-10">{locale.loginLogin}</span>
                    <span className="z-10">{locale.loginReg}</span>
                    <input className="hidden" checked={form.isReg} onChange={e => setForm(prev => { return { ...prev, isReg: e.target.checked } })} type="checkbox" />
                </label>
                <input className="rounded-full px-5 w-60 mt-6 h-8" value={form.email} onChange={e => setForm(prev => { return { ...prev, email: e.target.value, } })} type="text" placeholder={locale.loginEmail} />
                <input className="rounded-full px-5 w-60 mt-6 h-8" value={form.pass} onChange={e => setForm(prev => { return { ...prev, pass: e.target.value } })} type="password" placeholder={locale.loginPass} />
                <Button classes="login-button w-60 mt-6" onClick={sendAuth}>{locale.loginSend}</Button>
            </div>
        </div>
    )
}