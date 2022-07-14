import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import NavBar from "./Nav"
import Footer from "./Footer"

 const Ordenes = ()=>{
    let navigate = useNavigate()
    let urlBasic = "https://codealo-commerce-cms.onrender.com"
    const [loading, setLoading] = useState(false)
    const [ordenes, setOrdenes] = useState([])

   

    useEffect(()=>{
        if(!window.localStorage.getItem("USER_AUTH")) {
            navigate("/login")
        }   

        const getOrdenes = async ()=>{
            let userAcc = window.localStorage.getItem("USER_AUTH")
            let json = await fetch(`${urlBasic}/orders`,
            {
                headers: {"authorization": `Bearer ${userAcc}`}
            })
            let res = await json.json()
            setLoading(true)
            res.forEach(el=>{
                let app = 
                {
                    numeroDeCompra: el.id,
                    total$: el.total,
                    products: [...el.products]
                }
                setOrdenes(ordenes=>[...ordenes, app])
            })
            
        }
        if(!loading) getOrdenes()
    })

  
    return(
        <div>
            <NavBar/>
            <div className="container__ordenes">{
                ordenes.map(el=>(
                <div className="box__ordenes">
                    <div className="box_list" key={el.id}>
                        <div className="box_orden_list">
                            <h2>
                                N°Orden: {el.numeroDeCompra}
                            </h2>
                            <p className="price">{"$" + el.total$}</p>
                        </div>
                        <div className="flex container__cards__ordenes">
                            {el.products.map(elSub=>(
                            <div className="card__orden"  key={elSub.product.id} slug={elSub.product.slug}>
                                <p>{elSub.product.title}</p>
                                <p>{"$" + Number.parseFloat(elSub.product.price * elSub.quantity).toFixed(2)}</p>
                                <img className="orden__img" src={urlBasic + elSub.product.image.url}></img>
                                <p>{elSub.quantity + " Unidades"}</p> 
                            </div>
                            ))}
                        </div>
                    </div>
                </div>)) 
            }</div>
            <Footer/>
        </div>
    )
}

export default Ordenes