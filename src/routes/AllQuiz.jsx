import { useEffect, useState } from "react"
import { MagicMotion } from "react-magic-motion"
import { toast } from 'react-toastify'
import QuizCardAdmin from "../components/QuizCardAdmin"
const AllQuiz = () => {

    const [quizes, setQuizes] = useState([])

    const getQuizes = async () => {
        const token = sessionStorage.getItem('jwt')
        try {

            const url = `http://localhost:8000/api/quiz/all`
            const config = {
                headers: {
                    'authorization': `Bearer + ${token}`,
                    'content-type': 'application/json'
                }
            }

            const req = await fetch(url, config)
            const res = await req.json()


            if (res.success) {
                setQuizes(res.message)
            } else {
                toast.error(res.message)
            }

        } catch (err) {
            toast.error('Ocurrio un error al cargar los datos')
        }

    }
    useEffect(() => {
        getQuizes()

    }, [])

    return (
        <MagicMotion transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}>
            <main className='flex flex-col gap-2'>
                {quizes.map((q, index) => <QuizCardAdmin q={q} index={index + 1} key={q.uid} />)}
            </main>
        </MagicMotion>

    )
}

export default AllQuiz