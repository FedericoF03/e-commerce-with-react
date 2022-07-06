import react, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import NavBar from './Nav'
import Footer from './Footer'

const Products = ()=>{
    const urlName = useParams()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const ApiProduct = async()=>{
            let urlBasic = `https://codealo-commerce-cms.onrender.com`
            let json = await fetch(`https://codealo-commerce-cms.onrender.com/products/${urlName.name}`);
            let res = await json.json();
                    
                let app = {
                    id: res.id,
                    name: res.slug,
                    img: urlBasic + res.image.url,
                    price: res.price,
                    description: res.description,
                }
                setProduct(product=>[...product,app])
                setLoading(false)
        }
        if(loading)ApiProduct() 
    }, [])
    
    return(
        <div>
            <NavBar/>
            {
            product.map(el=>
                <div className='flex conteiner__box__product'>
                    <div className='products' key={el.key}>
                        <img  src={el.img}></img>
                        <figcaption>{el.name}</figcaption>
                        <h2>{el.price}</h2>
                        <p>{el.description}</p>
                    </div>
                    <button>-</button>
                    <text className='count'>1</text>
                    <button>+</button>
                    <p>Disponible: *cantidad*</p>
                </div>)    
            }
            <Footer/>
        </div> 
    )   
}

export default Products