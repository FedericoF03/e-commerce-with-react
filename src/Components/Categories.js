import {useState, useEffect} from 'react';
import { useParams, useNavigate, NavLink} from 'react-router-dom';
import NavBar from './Nav';
import Footer from './Footer';


const Categories = ()=>{

    const urlName = useParams();
    let navigate = useNavigate()
    let urlBasic = "https://codealo-commerce-cms.onrender.com";
    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

        const categories = async()=>{
            let json = await fetch("https://codealo-commerce-cms.onrender.com/categories")
            let res = await json.json()
            res.forEach(el=>{
                let app = 
                {
                    name: el.name,
                    slug: el.slug,
                }
                setProducts2(products2=>[...products2, app])
                setLoading(true);
            })
            
        }
        if(!loading)categories()

        useEffect(()=>{
            const apiProductChange = async ()=>{
                let json = await fetch(`${urlBasic}/categories/${urlName.name}`);
                let res = await json.json();
        
                    let app = {
                        id: res.id,
                        name: res.name,
                        link: res.slug,
                        products: [...res.products]
                    };
                    setLoading(true); 
                    setProducts([app]);
                               
            }
            apiProductChange()
        }, [loading2])

    return(
        <>
        <NavBar/>
        <div className='container__categories'>
            <div className='categories__buttons'>{
                products2.map(el=>(
                    <button className='categories__buttons--button' onClick={()=>{
                        navigate(`/productos/categories/${el.slug}`)
                        setLoading2(false)
                        setTimeout(()=>setLoading2(true), 0)
                    }}>{el.name}</button>
                ))
            }</div>
            <div className='categories__products'>
                <div className="categories__box__cards">{
                    products.map(el=>(
                        el.products.map(el=>(
                        <div 
                        key={el.id.toString() + "34"} 
                        className="categories__cards" >
                            <NavLink to={"/productos/" + el.slug}>
                                <img className="categories__cards--img" src={urlBasic + el.image.url}></img>
                                <figcaption>{el.title}</figcaption>
                                <h2>{el.price}</h2>
                                <p className='categories__cards--description'>{el.description}</p>
                            </NavLink>
                        </div>
                        ))
                    ))
                }</div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Categories





    