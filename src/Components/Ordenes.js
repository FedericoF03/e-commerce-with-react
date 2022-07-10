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
                <div className='flex conteiner__box__product'>
                    <div className='products_ordens' key={el.id}>
                        <h2>{el.numeroDeCompra}</h2>
                        <p>{el.total}</p>
                        <p>{el.total_no_tax}</p>
                        {el.products.map(elSub=>(
                            <div className="items-orden"  key={elSub.product.id} slug={elSub.product.slug}>
                            <p>{elSub.product.title}</p>
                            <p>{elSub.product.price}</p>
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