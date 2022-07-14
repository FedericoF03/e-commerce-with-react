import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./Nav";
import Footer from "./Footer";

 const Comprar = ({})=>{
    let refTextCart = useRef()
    let buttonCart = useRef()
    let urlBasic = "https://codealo-commerce-cms.onrender.com";
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        if(!window.localStorage.getItem("USER_AUTH")) {
            navigate("/login");
        }

        const compras = async()=>{
            if(window.localStorage.getItem("id-cart")){
            let idCart = window.localStorage.getItem("id-cart");
            let json = await fetch(`${urlBasic}/carts/${idCart}`);
            let res = await json.json();
            res.products_in_cart.forEach(el=>{
                let app = {
                    id: el.product.id,
                    link: el.product.slug,
                    img: urlBasic + el.product.image.url,
                    price: el.product.price,
                    name: el.product.title,
                    cant: el.quantity
                };
                setProducts(products=>[...products, app]);
                
                setLoading(true);
            })
        }   
        }
       if(!loading)compras()
    }, []);

    const createOrden= async()=>{
        let userAcc = window.localStorage.getItem("USER_AUTH");
        let idCart = window.localStorage.getItem("id-cart");
        await fetch(`${urlBasic}/orders`, 
        {
            method: "POST",
            headers: {
                        "Authorization": `Bearer ${userAcc}`,
                        "Content-Type": "application/json"
                    },
            body:   JSON.stringify({
                        "cart": idCart
                    })
        })
        buttonCart.current.removeAttribute("disabled")
    }
    
    return(
        <div>
            <NavBar/>
            <div className="container__cart">{
                !window.localStorage.getItem("id-cart")
                ?<div className="container__compras--void">
                    <p>No hay compras pendientes</p>
                </div>
                :<div className="box__compras__contents">
                    <p className="box__compras__contents--text" ref={refTextCart}>Usted tiene esto en el carro:</p>
                    <div className="flex box__compras__contents--cards">{
                        products.map(el=>(
                        <div key={el.id + "35"}>
                            <NavLink to={`/productos/${el.link}`}>
                            <img  
                            className="compras--img"
                            src={el.img}
                            alt={el.name + " img"}
                            ></img>
                            </NavLink>
                            <figcaption>{el.name}</figcaption>
                            <h2>{"$" + Number.parseFloat(el.price * el.cant).toFixed(2)}</h2>
                            <p className='compras--text'>{`${el.cant} unidades en el carro`}</p>
                        </div>
                        ))
                        
                    }</div>
                    <button className="box__compras__contents--button" ref={buttonCart} onClick={()=>{
                        refTextCart.current.innerHTML = "Procesando compra.."
                        buttonCart.current.setAttribute("disabled", true)
                        createOrden()
                        window.localStorage.removeItem("id-cart")
                        setTimeout(()=>navigate("/ordenes"), 2000)
                    }}>Hacer compra</button>
                </div>
            }</div>
            <Footer/>
        </div>
    );
};

export default Comprar