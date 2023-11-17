import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useApp } from "../Context"
import { useNavigate } from "react-router-dom"




const LayoutExam = () => {
    const { isAuth, authInfo } = useApp()
    const navigate = useNavigate()

    useEffect(() => {

        if (!isAuth) {
            navigate("/")
        } else if (isAuth && authInfo?.teacher) {
            navigate("/private")
        }

    }, [])


    return (

        <main>
            <Outlet />
        </main>

    )
}

export default LayoutExam