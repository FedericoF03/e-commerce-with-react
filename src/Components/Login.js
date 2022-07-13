import React, {useState, useRef} from "react";
import NavBar from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    let [forms, setForms] = useState("");
    let navigate = useNavigate();

    const handleChange = e => {
            setForms({
                ...forms,
                [e.target.name]:e.target.value,
            })
        };

    let resp = useRef(null);
    let respVoid = useRef(null);
    let ButtonVis = useRef(null);
    
    const check = (e)=>{
        e.preventDefault();
       ButtonVis.current.setAttribute("disabled", true);
        let validation = true;
        if(!forms.username || !forms.password) {
            validation = false;
            respVoid.current.innerHTML = "Alguno de los campos esta vacio, verificar";
            ButtonVis.current.removeAttribute("disabled");
        }
        if(forms.password.length < 6) {
            resp.current.innerHTML = "El largo de la contraseña es menor a 6";
            validation = false;
            ButtonVis.current.removeAttribute("disabled");
        }
        if(validation) {
            resp.current.innerHTML = "";
            respVoid.current.innerHTML = "";
            registration(forms.username,forms.password);
        }
    }   

    const registration = async(user, password)=>{
        
        let res = await fetch("https://codealo-commerce-cms.onrender.com/auth/local", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"identifier": user,
                                    "password": password
                                })
                
        });
        if(res.ok){
            resp.current.innerHTML = "Se Logueo correctamente devolviendo al inicio!";
            let aut = await res.json();
            window.localStorage.setItem("USER_AUTH", aut.jwt);
            setTimeout(()=>{
                navigate("/");
            }, 2000);
        } else {
            resp.current.innerHTML = "No se Logueo correctamente";
            ButtonVis.current.removeAttribute("disabled");
        }
    };
      
    return(
        <div>
            <NavBar/>
            <div className="container__register">
                <form className="box__register">
                    <p>Iniciar Sesion!</p>
                    <input
                    type="text"
                    placeholder="Usuario"
                    name="username"
                    onChange={handleChange}/>
                    <br/>
                    <input
                    maxLength={16}
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleChange}/>
                    <br/>
                    <input className="login__button" ref={ButtonVis} type="submit" onClick={check}/>
                    <p ref={resp} ></p>
                    <p ref={respVoid} ></p>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Login