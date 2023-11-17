


const ResposeRadio = ({ r }) => {

    return (

        <div className="flex gap-5 ml-6">
            <input type="radio" name={`${r.quizId}`} value={r.uid} />
            <p>{`${r.ask}`}</p>
            {r.points === 1 ? <p>✅</p> : <p> ⛔ </p>}
        </div>
    )
}

const QuizCardAdmin = ({ q, index }) => {
    const { quiz, responses } = q

    return (
        <div className="mx-auto w-full max-w-[60rem]">
            <details className="px-5  py-2 border-[1px] border-slate-700">
                <summary>{`${index})  ${quiz}`}</summary>
                <div className="flex flex-col gap-2 mt-2">
                    {responses.map(r => <ResposeRadio r={r} key={r.uid} />)}
                </div>
            </details>
        </div >
    )
}

export default QuizCardAdmin