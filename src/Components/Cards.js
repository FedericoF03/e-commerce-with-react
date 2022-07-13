import React, {useState, useEffect} from "react";
import ThreeCards from "./ThreeCards";
import { NavLink } from "react-router-dom";

const Cards=()=>{
    const urlBasic = "https://codealo-commerce-cms.onrender.com";
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
     
        useEffect(()=>{
        const ApiProduct = async(param)=>{
            const url = param;
            let count = 1;
            const beforeN = [];     
            while (count <= 3 && !loading) {
                count++;
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
                    };

                    setUrls(urls=>[...urls, app]);

                } else count--;
            }
            if(count >= 2) setLoading(true);
        }
        ApiProduct(`${urlBasic}/products`);
    }, []);
    
    return(
        <>{
            urls.length !== 3
            ?<div className="container__charge">
                <p className="charge">Cargando</p>
            </div>
            :<div className="flex container__cards">
                <div className="flex cards__box">
                    {    
                    urls.map((el)=>(
                    <ThreeCards 
                    key={el.id} 
                    description={el.description} 
                    slug={el.slug} name={el.name} 
                    img={el.img} 
                    price={"$" + el.price}/>
                    ))
                    }         
                </div>
                <div className="container__cards--link">
                    <NavLink className="cards--link" to="productos">Productos</NavLink>
                </div>
            </div>   
        }</>            
    );
};
    
export default Cards