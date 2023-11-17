import { useState, useEffect } from "react"
import Student from "../components/Student"
import URL from "../contantes"
const AdminStudents = () => {

    const [students, setStudents] = useState([])


    const getStudents = async () => {
        try {

            const token = sessionStorage.getItem('jwt')

            const url = `http://${URL}/api/students`
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            const req = await fetch(url, config)
            const res = await req.json()


            setStudents(res.message)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])




    return (

        <>
            <section className='w-full rounded-lg overflow-hidden bg-slate-800'>
                {students.map(student => <Student student={student} />)}
            </section>

        </>

    )
}

export default AdminStudents