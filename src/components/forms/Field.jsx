const Field = ({ name, type, value = null, placeholder, onChange, className = "", min, max }) => {

    return (

        <div className={`flex flex-col gap-2 w-full ${className}`}>
            <label className="text-white font-bold">{`${name}`}</label>
            <input
                className="p-2 border-[1px] border-slate-500 bg-slate-600 text-white rounded"
                type={`${type}`}
                value={value}
                placeholder={`${placeholder}`}
                onChange={onChange}
                min={min}
                max={max}
            />
        </div>

    )
}

export default Field