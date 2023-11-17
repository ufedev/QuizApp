import { useApp } from "../Context"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { MagicMotion } from "react-magic-motion"
import { useNavigate } from "react-router-dom"

const Response = ({ response, quizIndex }) => {
    const { quizId, uid, ask } = response

    return (
        <div className="flex gap-2 items-center">
            <input type='radio' name={`${quizId}`} value={`${uid}`} id={`${uid}`} />
            <label htmlFor={`${uid}`}>{ask}</label>
        </div>
    )
}


const Ask = ({ question, index }) => {
    const { responses, quiz } = question

    return (
        <details className="border-[1px] border-slate-700 p-2">
            <summary>{index}) {quiz}</summary>
            <div className="ml-5 flex flex-col gap-2 my-2">
                {responses.map(response => <Response response={response} quizIndex={index} />)}
            </div>
        </details>
    )
}


const StudentExam = () => {

    const [quiz, setQuiz] = useState([])
    const { authInfo } = useApp()
    const { name, trys, username, uid } = authInfo
    const date = new Date()
    const navigate = useNavigate()
    const getQuiz = async () => {
        try {
            const url = `http://localhost:8000/api/quiz/all`
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            const req = await fetch(url, config)

            const res = await req.json()



            if (res.success) {
                const all = res.message
                const randomize = all.sort(() => {
                    return Math.random() - 0.5
                })

                setQuiz(randomize.slice(0, 19))
            } else {
                toast.error(res.message)
            }

        } catch (err) {
            toast.error("Hubo un error al traer las preguntas")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const entradas = Object.fromEntries(new FormData(e.target))
        const respuestas = Object.values(entradas)
        if (trys === 0) {
            toast.error('Se te acabaron los intentos 👋 ', {
                theme: 'dark',
                hideProgressBar: true,
                autoClose: 1000,
                closeButton: false
            })
            return
        }
        if (respuestas.length < quiz.length) {
            toast.error("Falta contestar " + (quiz.length - respuestas.length) + " preguntas 👽", {
                theme: 'dark',
                hideProgressBar: true,
                autoClose: 3000

            })
            return
        }
        try {
            const url = 'http://localhost:8000/api/calification'
            const config = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ responses: respuestas, student: username })
            }

            const req = await fetch(url, config)
            const res = await req.json()

            if (res.success) {
                navigate(`/calification/${res.message}`)
            } else {
                toast.error(res.message)
            }



        } catch (err) {

            toast.error('Hubo un problema en el servidor')
        }
    }

    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <MagicMotion>
            <div className="flex flex-col mt-10 gap-10">
                <h1 className="text-5xl font-bold text-center">Examen</h1>
                <div className="w-[80rem] mx-auto flex justify-end items-center gap-2">
                    <a href={`/calification/${username}`} className='border-[1px] border-slate-700 bg-slate-800 w-fit p-2'>Ver nota</a>

                    <button className="border-[1px] border-slate-700 bg-slate-800 w-fit p-2 " onClick={() => {
                        toast.warning("No podes cerrar sesión 😆 ", {
                            closeButton: false,
                            theme: "dark",
                            hideProgressBar: true

                        })
                    }}>Cerrar Sesión</button>

                </div>
                <section className="w-[60rem] max-w-[95%] mx-auto flex flex-col items-end">
                    <div>
                        <p>Nombre: <span className="font-bold text-right">{name}</span></p>
                        <p>Fecha: <span className="font-bold text-right">{date.toLocaleDateString('es-ES', { day: "numeric", month: 'long', year: 'numeric' })}</span></p>
                        <p>Intentos Disponibles: <span className="font-bold text-right">{trys}</span></p>
                    </div>
                </section>
                <form className="w-[60rem] max-w-[95%] mx-auto flex flex-col gap-2" onSubmit={handleSubmit}>
                    {quiz.map((question, index) => <Ask index={index + 1} question={question} key={question.uid} />)}
                    <input type='submit' value="Enviar" className="mt-10 p-2 mx-auto w-fit min-w-[10rem] border-[1px] border-slate-500 bg-slate-600 text-2xl font-bold cursor-pointer hover:bg-slate-800 transition-all" />
                </form>
            </div>
        </MagicMotion>

    )
}

export default StudentExam