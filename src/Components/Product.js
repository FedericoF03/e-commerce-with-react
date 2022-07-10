import {useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import NavBar from './Nav';
import Footer from './Footer';



const Product = ()=>{
    const urlName = useParams();
    let [count, setCount] = useState(0);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [repeat, setRepeat] = useState(false)
    let navigate = useNavigate();
    
    useEffect(()=>{
        
        const apiProduct = async()=>{
            
            let urlBasic = `https://codealo-commerce-cms.onrender.com`;
            let json = await fetch(`${urlBasic}/products/${urlName.name}`);
            let res = await json.json();
                let app = {
                    id: res.id,
                    name: res.slug,
                    img: urlBasic + res.image.url,
                    price: res.price,
                    description: res.description,
                };

                setProduct([app]);
                setLoading(true);            
        }
        
        if(!loading)apiProduct();
        
    }, []);
    
    useEffect(()=>{
        const verificar = async ()=>{
            const urlBasic = `https://codealo-commerce-cms.onrender.com`;
            let keyCart = window.localStorage.getItem("id-cart");
            let jsonGet = await fetch(`${urlBasic}/carts/${keyCart}`);
            let resGet = await jsonGet.json();
            let array = [...resGet.products_in_cart];
            
            array.map(async el=>{
                if(el.product.id === product[0].id) {
                    setRepeat(true) 
                } else {
                    
                }
            })
        }
        if(!repeat)verificar()
    })

    const comprar = async ()=>{
        const urlBasic = `https://codealo-commerce-cms.onrender.com`;
        const header = {"Content-Type" : "application/json"};
        let keyCart = window.localStorage.getItem("id-cart");
        console.log("tocaste")

        if(window.localStorage.getItem("id-cart")) {
 
            let jsonGet = await fetch(`${urlBasic}/carts/${keyCart}`);
            let resGet = await jsonGet.json();
            let array = [...resGet.products_in_cart];

            console.log("existe")
            if(repeat) {
                array.map(async el=>{
                    if(el.product.id === product[0].id) {
                        el.quantity = count
                    } 
                })
                let res = await fetch(`${urlBasic}/carts/${keyCart}`, 
                {
                method: "PUT",
                headers: header,
                body: JSON.stringify(
                    { "products_in_cart": 
                        [
                        ...array
                        ]
                    }   
                )
            });
            console.log("Se repite un dato por eso nomas sumamos", res)
            } else if (!repeat) {
                await fetch(`${urlBasic}/carts/${keyCart}`, 
                {
                method: "PUT",
                headers: header,
                body: JSON.stringify(
                    { "products_in_cart": 
                        [
                        ...resGet.products_in_cart,
                            {
                                "product": { "id": product[0].id},
                                "quantity": count
                            }
                        ]
                    }   
                )
                });
            };  
            } else {
            
                const json = await fetch(`${urlBasic}/carts`, 
                {
                method: "POST",
                headers: header,
                body: JSON.stringify(
                    { "products_in_cart": 
                        [
                            {
                                "product": { "id": product[0].id},
                                "quantity": count
                            }
                        ]
                    })
                });
                let res = await json.json();    
                window.localStorage.setItem("id-cart", res.id);
                }  
    };   
    
    return(
        <div>
            <NavBar/>{
            product.map(el=>
                <div className='flex conteiner__box__product'>
                    <div className='products' key={el.id + "35"}>
                        <img  
                        src={el.img}
                        alt={el.name + " img"}
                        ></img>
                        <figcaption>{el.name}</figcaption>
                        <h2>{Number.parseFloat(el.price * count).toFixed(2)}</h2>
                        <p>{el.description}</p>
                    </div>
                    <button onClick={()=>
                        {
                            setCount(count<1? count = 0:count-1);
                        }}>-</button>
                    <p readOnly className='count'>{count}</p>
                    <button onClick={()=>
                    {
                        setCount(count+1);
                    }}>+</button>
                    <button onClick={()=>
                    {
                        comprar();
                    }
                    }>Comprar</button>
                    <button onClick={()=>{navigate("/comprar")}}>Ir a las compras</button>
                </div>)    
            }<Footer/>
        </div> 
    );  
}

export default Product