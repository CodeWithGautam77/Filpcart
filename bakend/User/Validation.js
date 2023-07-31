const Validation = (data,type) => {
    let err = []

    if(type === "register"){
        if(!(data.firstName)){
            err.push({key:"firstName",message:"Required field Firstname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))){
            err.push({key:"firstName",message:"Invalid Firstname"})
        }

        if(!(data.lastName)){
            err.push({key:"lastName",message:"Required field Lastname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.lastName))){
            err.push({key:"lastName",message:"Invalid Lastname"})
        }

        if(!(data.email)){
            err.push({key:"email",message:"Required field Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Invalid Email"})
        }

        if(!(data.password)){
            err.push({key:"password",message:"Required field Password is empty"})
        }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))){
            err.push({key:"password",message:"Password is to week please enter strong password"})
        }
    }else if(type === "admin-register"){
        
        if (!(data.fullName)) {
            err.push({ key: "fullName", message: "Please Enter fullName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(data.fullName))) {
            err.push({ key: "fullName", message: "Invalid fullName" })
        }

        if (!(data.email)) {
            err.push({ key: "email", message: "Please Enter email" })
        }
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        if (!(data.password)) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        // if (!(data.roll)) {
        //     err.push({ key: "roll", message: "Please Enter Roll" })
        // }
        // else if(!(data.roll.length <= 2 && (/^([^0-9]*)$/.test(data.roll)))){
        //     err.push({ key: "roll", message: "Invalid Roll" })
        // }
    }else{
        if(!(data.email)){
            err.push({key:"email",message:"Required field Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Invalid Email"})
        }
        
        if(!(data.password)){
            err.push({key:"password",message:"Required field Password is empty"})
        }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.password))){
            err.push({key:"password",message:"Password is to week please enter strong password"})
        }
    }
    return err
}

export default Validation