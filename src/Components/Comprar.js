import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Nav";
import Footer from "./Footer";

 const Comprar = ({})=>{
    let urlBasic = "https://codealo-commerce-cms.onrender.com";
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [large, setLarge] = useState(null)
    
    useEffect(()=>{
        if(!window.localStorage.getItem("USER_AUTH")) {
            navigate("/login");
        }

        const compras = async()=>{
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
                setLarge(res.products_in_cart.length);
                
                setLoading(true);
            })
            
        }
       if(!loading)compras()
    }, []);

    const createOrden= async()=>{
        let userAcc = window.localStorage.getItem("USER_AUTH");
        let idCart = window.localStorage.getItem("id-cart");
        let res = await fetch(`${urlBasic}/orders`, 
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
        let json = await res.json()
        console.log(json)
    }
    
    return(
        <div>
            <NavBar/>
            <div className="flex categories-test85 comprar-test1">
            <button className="button-fix" onClick={async()=>
                {
                    await createOrden()
                    await window.localStorage.removeItem("id-cart")
                    await setTimeout(()=>
                    {
                        navigate("/ordenes")
                    }, 3000)
                }
            }>Procesar compra</button>{
            products.length  !== large ? 
            (<div>{!window.localStorage.getItem("id-cart")? "No hay compras pendientes": "Cargando..."}</div>): 
            (products.map(el=>(
                <div className='flex conteiner__box__product'> 
                <div className='products' key={el.id} slug={el.slug}>
                    <img src={el.img}></img>
                    <figcaption>{el.name}</figcaption>
                    <h2>{Number.parseFloat(el.price * el.cant).toFixed(2)}</h2>
                    <p>{el.cant}</p>
                </div>
            </div>
            )))
            }</div>
            <Footer/>
        </div>
    );
};

export default Comprar