import React, {useState, useRef} from "react";
import NavBar from "./Nav";
import Footer from "./Footer";

const Register = ()=>{
    const [forms, setForms] = useState("");
    
    const handleChange = e => {
        setForms({
            ...forms,
            [e.target.name]:e.target.value,
        });
    };

    let resp = useRef(null);
    let respVoid = useRef(null);
    
    const check = (e)=>{
        e.preventDefault();
        let validation = true;
        let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!reg.test(forms.email)) {
            validation = false;
            resp.current.innerHTML = "Email Incorrecto o inexistente";
        }
        if(!forms.email || !forms.username || !forms.password) {
            validation = false;
            respVoid.current.innerHTML = "Alguno de los campos esta vacio, verificar";
        }
        try {
            if(forms.password.length < 6 ) {
                resp.current.innerHTML = "El largo de la contraseña es menor a 6";
                validation = false;
            }
        } catch (e) {

        }
        
        if(validation) {
            resp.current.innerHTML = "";
            respVoid.current.innerHTML = "";
            registration(forms.username,forms.email,forms.password);
        }
    }   

    const registration = async(user, email, password)=>{
        let res = await fetch("https://codealo-commerce-cms.onrender.com/auth/local/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"username": user,
                                    "email": email,
                                    "password": password
                                })
                
        });
        if(res.ok) resp.current.innerHTML = "Se registro correctamente!";
         else resp.current.innerHTML = "Cuenta ya registrada o en uso.";
    }
      
    return(
        <div>
            <NavBar/>
            <div className="container__register">
                <form className="box__register">
                    <p>Registrate!</p>
                    <input
                    type="text"
                    placeholder="Usuario"
                    name="username"
                    onChange={handleChange}
                    />
                    <br/>
                    <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    />
                    <br/>
                    <input
                    maxLength={16}
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleChange}
                    />
                    <br/>
                    <input className="register__button" type="submit" onClick={check}/>
                    <p ref={resp} ></p>
                    <p ref={respVoid} ></p>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Register