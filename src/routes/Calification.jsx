import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import URL from "../contantes"
// import { useApp } from "../Context"
const Calification = () => {

    const navigate = useNavigate()
    const { student } = useParams()
    const [studentData, setStudentData] = useState({})

    const handleAuth = async () => {
        try {
            const url = `http://${URL}/api/auth`
            const config = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${sessionStorage.getItem('jwt')}`
                }
            }

            const req = await fetch(url, config)
            const res = await req.json()
            if (!res.success) {
                navigate('/')
            }


        } catch (err) { console.log(err) }

    }

    const handleStudent = async () => {

        try {

            const url = `http://${URL}/api/getcalification`
            const config = {
                method: 'POST',
                headers: {

                    'content-type': 'application/json',
                    // authorization: `Bearer ${sessionStorage.getItem('jwt')}`
                },
                body: JSON.stringify({ student })
            }

            const req = await fetch(url, config)
            const res = await req.json()

            if (res.success) {
                setStudentData(res.message)
                // toast.success('muy BIEN!')
            } else {
                toast.error(res.message)
            }

        } catch (err) { console.log(err) }
    }
    const handleAll = async () => {
        await Promise.all([handleAuth(), handleStudent()])
    }

    const handleClick = (e) => {
        e.preventDefault()

        // if (studentData.trys === 0) {
        //     toast.error("Ya no te quedan intentos! 😧 ")
        //     return
        // }

        location.href = "/"
    }
    useEffect(() => {
        handleAll()
    }, [])
    return (

        <main className="min-h-screen w-full flex flex-col gap-2 justify-center items-center">
            <p className="text-2xl">Estudiante: <span className="font-bold">{studentData.user}</span></p>
            <h1 className="text-4xl font-bold">Calificación maxima: <span className={`${studentData.calification < 46 ? 'text-red-400' : (studentData.calification >= 46 && studentData.calification < 66 ? 'text-orange-400' : studentData.calification >= 66 && 'text-green-400')}`}>{studentData.trys === 2 ? 'Todavia no realizo ningún intento' : studentData.calification}{`${studentData.calification < 46 ? ' 😢' : studentData.calification >= 46 && studentData.calification < 66 ? ' 👍 ' : studentData.calification >= 66 && ' 👽 '}`}</span></h1>
            <h2>Intentos disponibles: {studentData.trys}</h2>
            <button onClick={handleClick} className="border-[1px] border-slate-600 p-2 text-xl font-bold bg-slate-700 hover:bg-slate-800 transition-all">{studentData.trys === 2 ? "Intentar" : "Volver a intentar"}</button>
        </main>

    )
}

export default Calification