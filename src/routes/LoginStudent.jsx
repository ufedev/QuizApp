import { useState } from "react"

import Form from '../components/forms/Form'
import Field from '../components/forms/Field'
import { toast } from "react-toastify"
import URL from "../contantes"

const LoginStudent = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSumit = async (e) => {
        e.preventDefault()

        if ([username, password].includes("")) {
            toast.error("Todos los campos son obligatorios", {
                autoClose: 2000,
                hideProgressBar: true
            })

            return
        }

        try {

            const url = `http://${URL}/api/login`
            const config = {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }

            const req = await fetch(url, config)
            const res = await req.json()

            if (res.success) {
                sessionStorage.setItem("jwt", res.message)
                location.reload()
            } else {
                toast.error(res.message)
            }

        } catch (err) {
            console.log(err)
        }



    }
    return (
        <div className="max-w-[500px] mx-auto">
            <Form name="Login" onSubmit={handleSumit}>
                <Field name='Usuario' type='text' placeholder='nombre de usuario' value={username} onChange={e => setUsername(e.target.value)} />
                <Field name='Contraseña' type='password' placeholder='contraseña' value={password} onChange={e => setPassword(e.target.value)} />
            </Form>
        </div>
    )
}

export default LoginStudent