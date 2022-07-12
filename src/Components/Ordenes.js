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
            console.log(res)
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
            <NavBar/>{ordenes.map(el=>(
                <div>
                    <div key={el.id}>
                        <h2>{el.numeroDeCompra}</h2>
                        <p>{el.total$}</p>
                        {el.products.map(elSub=>(
                            <div key={elSub.product.id} slug={elSub.product.slug}>
                            <p>{elSub.product.title}</p>
                            <p>{Number.parseFloat(elSub.product.price * elSub.quantity).toFixed(2)}</p>
                            <img src={urlBasic + elSub.product.image.url}></img>
                            <p>{elSub.quantity}</p> 
                           </div>
                        ))}
                    </div>
                </div>)) 
                }<Footer/>
        </div>
    )
}

export default Ordenes