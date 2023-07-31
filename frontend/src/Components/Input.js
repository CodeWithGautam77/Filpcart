export default function Input(props){
    const {type,placeholder,onChange,id,value,isError,helperText,style,className} = props
    return (

        <div className="w-100">
            <input type={type} placeholder={placeholder || ""}  style={style || {}} className={className || ""}
            id={id || ""} onChange={onChange} value={value || ""}/><br/>
            {
                isError ? <span className="text-danger">{helperText}</span> : ""
            }
        </div>

    );
} 