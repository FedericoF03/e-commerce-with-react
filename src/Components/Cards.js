import React, {useState, useEffect} from "react";
import ProductsCards from "./ProductsCards";
import { BrowserRouter, NavLink } from "react-router-dom";

const Cards=()=>{
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(false)
     
        useEffect(()=>{
        const ApiProduct = async(param)=>{
            const url = param
            const urlBasic = "https://codealo-commerce-cms.onrender.com"
            let count = 1;
            const beforeN = [];     
            while (count <= 3 && !loading) {
                count++ 
                let json = await fetch(url);
                let res = await json.json();
                
                let numberR = Math.random() * res.length;
                    numberR = Math.floor(numberR);

                if (!beforeN.includes(numberR)) {
                    
                    beforeN.push(numberR);
                    
                    let app = {
                        id: res[numberR].id,
                        slug:res[numberR].slug,
                        name: res[numberR].title,
                        img: urlBasic + res[numberR].image.url,
                        price: res[numberR].price,
                        description: res[numberR].description,
                    }
    
                    
                    setUrls(urls=>[...urls, app]);
                } else count--
            }
            if(count >= 2) setLoading(true)
        }
        ApiProduct('https://codealo-commerce-cms.onrender.com/products')
    }, [])
    
    return(
        <div className="conteiner__card__box">
            <div className="cards__box">     
                {urls.length != 3 ? 
                (<h3>Cargando..</h3>):
                (urls.map((el)=>(
                <ProductsCards key={el.id} description={el.description} slug={el.slug} name={el.name} img={el.img} price={el.price}/>
                    ))
                )}            
            </div>
            {
            urls.length != 3 ? 
            (""):
            (<NavLink className="button__start" to="productos">Productos</NavLink>)
            }
        </div>               
    )
};
    
export default Cards