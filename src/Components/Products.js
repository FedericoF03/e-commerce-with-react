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
        <>   
            <NavBar/>
            <div className="container__products">
                <div className="buttons__products__categories">{ products2.map(el=>(
                        <button className="buttons__products__categories--button" onClick={()=>{navigate(`categories/${el.slug}`)}}>{el.name}</button>
                        ))
                }</div>
                <div className="box__products">{ products.map(el=>(
                    <div className="products" key={el.id.toString() + "34"}>
                        <NavLink to={"/productos/" + el.link}>
                        <img className="products--img" src={urlBasic + el.img}></img>
                        <div className="products__color__text">
                            <figcaption>{el.name}</figcaption>
                            <h2>{el.price}</h2>
                            <p className="products--description">{el.description}</p>
                        </div>
                        </NavLink>
                    </div>
                    ))
                }</div>
            </div>
            <Footer/>
        </>
    );
};

export default Products