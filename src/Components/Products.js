import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "./Nav";
import Footer from "./Footer";

const Products = ()=>{
    let navigate = useNavigate()
    let urlBasic = "https://codealo-commerce-cms.onrender.com";
    const [products, setProducts] = useState([]);
     const [products2, setProducts2] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const apiProducts = async ()=>{
            
            let res = await fetch(`${urlBasic}/products`);
            
            if (res.ok) { 
                let json = await res.json();

                json.forEach(el => {
                    const app = {
                        id: el.id,
                        name: el.title,
                        link: el.slug,
                        price: el.price,
                        img: el.image.url,
                        description: el.description,
                        categories: [...el.categories]  
                    };
                    setProducts(products=>[...products, app]);
                    setLoading(true);
                });
            } 
        }

        const categories = async()=>{
            let ddos = await fetch("https://codealo-commerce-cms.onrender.com/categories")
            let res = await ddos.json()
            res.forEach(el=>{
                let app = 
                {
                    name: el.name,
                    slug: el.slug,
                }
                
                setProducts2(products2=>[...products2, app])
            })
            
        }
        if(!loading)categories()
        if(!loading)apiProducts();
        
    }, []);
    
    return(
        <div>
            <NavBar/>
            <div className='flex categories'>{
            products2.map(el=>(
                <button onClick={()=>{navigate(`categories/${el.slug}`)}}>{el.name}</button>
            ))}</div>
            <div className="flex products__conteiner">{
            products.map(el=>(
                <div 
                key={el.id.toString() + "34"} 
                className="card__products" >
                    <NavLink to={"/productos/" + el.link}>
                        <img src={urlBasic + el.img}></img>
                        <figcaption>{el.name}</figcaption>
                        <h2>{el.price}</h2>
                        <p>{el.description}</p>
                    </NavLink>
                </div>
                ))
            }</div>
            <Footer/>
        </div>
    );
};

export default Products