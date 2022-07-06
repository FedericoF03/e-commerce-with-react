import { NavLink } from "react-router-dom"

const ProductCards = ({img, name, description, price, slug})=>
    (
        <div className="card">
            <NavLink to={"/productos/" + slug}>
                <img  src={img}></img>
                <figcaption>{name}</figcaption>
                <h2>{price}</h2>
                <p>{description}</p>
            </NavLink>
        </div>
    )


export default ProductCards