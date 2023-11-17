const Student = ({ student }) => {

    return (

        <div className='grid grid-cols-3 w-[100%] text-center border-b-[1px] border-b-slate-800 first-of-type:border-t-[1px] first-of-type:border-t-slate-800 items-center odd:bg-slate-500 cursor-pointer hover:bg-sky-700' >
            <div className='border-r-[1px] border-r-slate-700 border-l-[1px] border-l-slate-800 py-2 '>
                <p>{student.name} <span className='font-bold'>{student.lastname}</span></p>
            </div>
            <div className='border-r-[1px] border-r-slate-700 py-2'>
                <p>{student.trys} Intentos</p>
            </div>
            <div className='border-r-[1px] border-r-slate-700 py-2' >
                <p>{student.calification}<span>% Calificación</span></p>
            </div>
        </div>

    )
}

export default Student