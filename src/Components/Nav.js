import {NavLink, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import logo from '../Assets/png-transparent-computer-icons-source-code-program-optimization-icon-design-symbol-miscellaneous-angle-text-removebg-preview.png';
import cartLogo from '../Assets/png-clipart-shopping-cart-icon-shopping-cart-black-design-removebg-preview.png'

export default function NavBar(){
    let urlBasic = "https://codealo-commerce-cms.onrender.com";
    const [quantityCart, setQuantityCart] = useState( window.localStorage.getItem("quantity-cart"))
    useEffect(()=>{
        
        const compras = async()=>{
            if(!window.localStorage.getItem("USER_AUTH")){
                setQuantityCart(0)
            } else {
                if(window.localStorage.getItem("id-cart")){
                    let idCart = window.localStorage.getItem("id-cart");
                    let json = await fetch(`${urlBasic}/carts/${idCart}`);
                    let res = await json.json();
                    
                    window.localStorage.setItem("quantity-cart", `${res.products_in_cart.length}`)
                    setQuantityCart(res.products_in_cart.length)
                } else {
                    window.localStorage.setItem("quantity-cart", 0)
                    setQuantityCart(0)
                }   
            }     
        }
        compras()
    }, [])

    
    
    
    let navigate = useNavigate();
    return(
        <div className='container__nav'>
            <div>
                <NavLink to="/">
                    <img className='logo'
                    src={logo}
                    alt="Logo-E-commerce"
                    ></img>
                </NavLink>
            </div>
            <ul className='nav__box__enlaces'>
                <li>
                    <NavLink className='nav--enlaces' to='/'>Inicio</NavLink>
                </li>
                <li>
                    <NavLink className='nav--enlaces' to='/productos'>Productos</NavLink>
                </li>
                <li>
                    <NavLink to='/comprar'>
                        <div className='box__nav__compra'>
                            <p className='quantity__cart'>{quantityCart}</p>
                            <img className='img__cart' src={cartLogo}></img> 
                        </div>
                    </NavLink>
                </li>
                {
                    window.localStorage.getItem("USER_AUTH")? 
                    "":
                    <li>
                    <NavLink className='nav--enlaces' to='/login'>Login</NavLink>
                    </li>
                }
                <li>
                    <NavLink className='nav--enlaces' to='/registrar'>Registrar</NavLink>
                </li>
                <li>
                    <NavLink className='nav--enlaces' to='/ordenes'>Ordenes</NavLink>
                </li>
                <li>
                    {
                    !window.localStorage.getItem("USER_AUTH")
                    ? ""
                    :<button className='session__close' onClick={()=> {
                            window.localStorage.removeItem("USER_AUTH");
                            navigate("/");
                    }}>Cerrar sesion</button>
                    }</li>
            </ul>
        </div>
    )
}