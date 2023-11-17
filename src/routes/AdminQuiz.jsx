import URL from "../contantes"
import { MagicMotion } from "react-magic-motion"
import Form from "../components/forms/Form"
import Field from "../components/forms/Field"
import { useState } from "react"
import { toast } from "react-toastify"
const QuizForm = () => {
    const [quiz, setQuiz] = useState('')
    const [questionsNumber, setQuestionNumber] = useState([{
        uid: (Math.random() + Date.now()).toString(36).substring(2,),
        ask: '',
        points: 0
    }])


    const handleMoreChoices = (e) => {
        e.preventDefault()
        const uid = (Math.random() + Date.now()).toString(36).substring(2,)
        setQuestionNumber([...questionsNumber, {
            uid,
            ask: "",
            points: 0
        }])

    }

    const handleChange = (e, uid, key) => {
        e.preventDefault()

        const updated = questionsNumber.map((obj) => {
            if (uid === obj.uid) {
                return {
                    ...obj,
                    [key]: e.target.value
                }
            }
            return obj
        })
        setQuestionNumber(updated)

    }

    const handleDelete = (e, uid) => {
        e.preventDefault()


        const updatedQuestions = questionsNumber.filter((obj) => {
            if (obj.uid !== uid) return obj
        })
        //console.log(updatedQuestions)
        setQuestionNumber(updatedQuestions)
        // console.log()

    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (quiz === "" || questionsNumber.length <= 1) {
            toast.error("Debe completar al menos 2 respuestas y una pregunta")
            return
        }

        const asks = questionsNumber.map(q => q.ask)

        if (asks.includes("")) {
            toast.error("Las posibles respuestas no deben estar vacias")
            return
        }

        try {
            const data = JSON.stringify({
                quiz,
                questionsNumber
            })

            console.log(data)
            const token = sessionStorage.getItem('jwt')
            const url = `http://${URL}/api/create/quiz`
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: data
            }
            const req = await fetch(url, config)
            const res = await req.json()


            if (res.success) {
                toast.success(res.message)
                setQuiz("")
                setQuestionNumber([{
                    ask: "",
                    points: 0
                }])
            } else {

                toast.error(res.message)
            }


        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MagicMotion>
            <div className="w-[95%] max-w-[60rem] mx-auto">
                <Form name="New Quiz" onSubmit={handleSubmit} buttonName="Crear">
                    <Field name='Pregunta' placeholder="Qué pregunta desea hacer?" value={quiz} onChange={e => setQuiz(e.target.value)} />
                    <div className="flex justify-end w-full">
                        <button className="block m1-10 bg-slate-500 p-2 rounded border-[0.5px] border-slate-300" onClick={handleMoreChoices}>Agregar respuesta</button>
                    </div>
                    {questionsNumber.map((quest) => {
                        return (
                            <div className="flex items-end gap-5" key={quest.uid}>
                                <Field className="" name={`Respuesta ${quest.uid}`} type="text" placeholder="Posible respuesta" onChange={e => {
                                    handleChange(e, quest.uid, 'ask')
                                }} />
                                <Field className="w-20" name={`puntos`} min='0' max='1' type="number" placeholder="pts" onChange={(e) => {
                                    handleChange(e, quest.uid, 'points')
                                }} />
                                <button onClick={(e) => {
                                    handleDelete(e, quest.uid)
                                }}>
                                    <span class="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                        )
                    })}
                </Form>
            </div>
        </MagicMotion>
    )
}

export default QuizForm