import { Outlet, Link } from "react-router-dom"
import { useEffect } from "react"
import { useApp } from "../Context"
import { useNavigate } from "react-router-dom"

const LayoutAdmin = () => {
    const { isAuth, authInfo } = useApp()
    const navigate = useNavigate()

    useEffect(() => {

        if (isAuth) {
            if (authInfo?.student) {
                navigate("/exam")
            }
        } else {
            navigate('/')
        }

    }, [isAuth])
    return (

        <div className="flex flex-col min-h-screen justify-center w-full">
            <header className='fixed top-0 left-0 w-full'>
                <nav className='p-5 text-slate-600 flex gap-5 justify-end bg-slate-50/90'>
                    <Link className='font-bold hover:text-slate-950 transition-all' to="/">Estudiantes</Link>
                    <Link className='font-bold hover:text-slate-950 transition-all' to="allquiz">Preguntas</Link>
                    <Link className='font-bold hover:text-slate-950 transition-all' to="quiz">Nueva Pregunta</Link>
                    <button className="text-sm" onClick={(e) => {

                        e.preventDefault()
                        sessionStorage.removeItem('jwt')
                        location.reload()

                    }}>Cerrar Sesión</button>
                </nav>
            </header>
            <main className="w-[60rem] max-w-[95%] mx-auto">
                <Outlet />
            </main>

        </div>

    )
}

export default LayoutAdmin