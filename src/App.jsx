import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MagicMotion } from "react-magic-motion"
import Layout from "./views/Layout"
import LayoutExam from "./views/LayoutExam"
import LayoutAdmin from "./views/LayoutAdmin"
import AdminQuiz from "./routes/AdminQuiz"
import AdminStudents from "./routes/AdminStudents"
import AllQuiz from "./routes/AllQuiz"
import LoginStudent from "./routes/LoginStudent"
import StudentExam from "./routes/StudentExam"
import Calification from "./routes/Calification"
import Provider, { useContext } from "./Context"
const App = () => {

    return (

        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LoginStudent />} />
                    </Route>
                    <Route path="/exam" element={<LayoutExam />}>
                        <Route index element={<StudentExam />} />
                    </Route>
                    <Route path="/private" element={<LayoutAdmin />}>
                        <Route index element={<AdminStudents />} />
                        <Route path='allquiz' element={<AllQuiz />} />
                        <Route path="quiz" element={<AdminQuiz />} />
                    </Route>
                    <Route path='/calification/:student' element={<Calification />} />

                </Routes>
            </BrowserRouter>
        </Provider>

    )
}

export default App