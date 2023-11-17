import URL from "./contantes"
import { createContext, useContext, useState, useEffect } from "react"
import Spinner from "./components/Spinner"
import { ToastContainer } from "react-toastify"
const ContextApp = createContext()


const Provider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [authInfo, setAuthInfo] = useState({})
    const [load, setLoad] = useState(false)

    const handleAuth = async () => {
        try {
            setLoad(true)
            const token = sessionStorage.getItem('jwt')
            const url = `http://${URL}/api/auth`
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            const req = await fetch(url, config)
            const res = await req.json()

            if (res.success) {
                setAuthInfo(res.message)
                setIsAuth(true)
            } else {
                setAuthInfo({})
                setIsAuth(false)
            }

        } catch (err) {
            console.log(err)
        } finally {

            setLoad(false)
        }

    }

    useEffect(() => {
        handleAuth()
    }, [])

    return <ContextApp.Provider value={{
        setIsAuth,
        isAuth,
        authInfo,
        handleAuth


    }}>

        {load ? <Spinner /> : children}
        <ToastContainer />
    </ContextApp.Provider>
}


export const useApp = () => useContext(ContextApp)

export default Provider


