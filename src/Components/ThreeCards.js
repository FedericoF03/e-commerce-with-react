import { NavLink } from "react-router-dom";

const ThreeCards = ({img, name, description, price, slug})=>
    (
        <div className="card">
            <NavLink to={"/productos/" + slug}>
                <img 
                src={img} 
                alt={"Product-img"}></img>
                <figcaption>{name}</figcaption>
                <h2>{price}</h2>
                <p>{description}</p>
            </NavLink>
        </div>
    );

export default ThreeCards