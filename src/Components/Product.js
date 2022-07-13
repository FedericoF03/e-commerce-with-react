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

        if(!window.localStorage.getItem("USER_AUTH")) {
            navigate("/login");
        }
        
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
            if(window.localStorage.getItem("id-cart")) {
            const urlBasic = `https://codealo-commerce-cms.onrender.com`;
            let keyCart = window.localStorage.getItem("id-cart");
            let jsonGet = await fetch(`${urlBasic}/carts/${keyCart}`);
            let resGet = await jsonGet.json();
            let array = [...resGet.products_in_cart];
            
            array.map(async el=>{
                try {
                    if(el.product.id === product[0].id) {
                        setRepeat(true) 
                    } else {
                        
                    }
                } catch (e) {

                }
                
            })
        }
        }
        if(!repeat)verificar()
    })

    const comprar = async ()=>{
        const urlBasic = `https://codealo-commerce-cms.onrender.com`;
        const header = {"Content-Type" : "application/json"};
        let keyCart = window.localStorage.getItem("id-cart");

        if(window.localStorage.getItem("id-cart")) {
 
            let jsonGet = await fetch(`${urlBasic}/carts/${keyCart}`);
            let resGet = await jsonGet.json();
            let array = [...resGet.products_in_cart];

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
            <NavBar/>
            <div className='container__product'>{
                product.map(el=>
                    <div className='box__product'>
                        <div key={el.id + "35"}>
                            <img  
                            src={el.img}
                            alt={el.name + " img"}
                            ></img>
                            <figcaption>{el.name}</figcaption>
                            <h2>{Number.parseFloat(el.price * count).toFixed(2)}</h2>
                            <p>{el.description}</p>
                        </div>
                        <div className='box_product__box__buttons'>
                            <button className='box_product__box__buttons--left box_product__box__buttons--both' onClick={()=>{
                                setCount(count<1? count = 0:count-1);
                            }}>-</button>
                            <p className='margin-0' readOnly>{count}</p>
                            <button className='box_product__box__buttons--right box_product__box__buttons--both' onClick={()=>{
                                setCount(count+1);
                            }}>+</button>
                        </div>
                        <div className='box_product__box__buttons_shop'>
                            <button onClick={()=>{
                                comprar();
                            }}>Comprar</button>
                            <button onClick={()=>{navigate("/comprar")}}>Ir a las compras</button>
                        </div>
                </div>)    
            }</div>
            <Footer/>
        </div> 
    );  
}

export default Product