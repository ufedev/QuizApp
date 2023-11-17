import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useApp } from "../Context"
import { useNavigate } from "react-router-dom"
const Layout = () => {

    const { isAuth, authInfo } = useApp()
    const navigate = useNavigate()

    useEffect(() => {

        if (isAuth) {
            // console.log(authInfo)
            if (authInfo?.student) {
                navigate("/exam")
            } else if (authInfo?.teacher) {
                navigate("/private")
            }
        }

    }, [isAuth])

    return (
        <main className="max-w-[95%] min-h-screen mx-auto flex flex-col justify-center items-center">
            <Outlet />
        </main>
    )
}

export default Layout