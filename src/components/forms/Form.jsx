import 'react-toastify/dist/ReactToastify.css'


const Form = ({ children, name, buttonName = "Ingresar", onSubmit }) => {



    return (
        <>


            <form className="p-5 bg-slate-900/75 rounded border-[0.5px] border-slate-600 min-w-[25rem] flex flex-col gap-5" onSubmit={onSubmit}>
                <h2 className='font-bold text-3xl text-white mb-5'>{name}</h2>
                {children}
                <input type="submit" value={`${buttonName}`} className="mt-10 p-2 rounded border-[1px] border-slate-800 bg-slate-950 text-xl hover:bg-slate-950/75 cursor-pointer transition-all" />
            </form>

        </>
    )
}

export default Form