import { NavLink } from "react-router-dom";

const ThreeCards = ({img, name, description, price, slug})=>
    (
        <div className="three__cards__box">
            <NavLink to={"/productos/" + slug}>
                <img
                className="three__cards--img" 
                src={img} 
                alt={"Product-img"}></img>
                <figcaption>{name}</figcaption>
                <h2 className="three__cards--price">{price}</h2>
                <p className="three__cards__text--description">{description}</p>
            </NavLink>
        </div>
    );

export default ThreeCards