import {NavLink, useNavigate} from 'react-router-dom';
import logo from '../Assets/Syntwave-logo.png';

export default function NavBar(){
    
    let navigate = useNavigate();
    return(
        <div className='container__nav'>
            <div>
                <NavLink to="/">
                    <img className='logo'
                    src={logo}
                    alt="Logo-E-commerce"
                    ></img>
                </NavLink>
            </div>
            <ul className='nav__box__enlaces'>
                <li>
                    <NavLink to='/'>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to='/productos'>Productos</NavLink>
                </li>
                <li>
                    <NavLink to='/comprar'>Comprar</NavLink>
                </li>
                {
                    window.localStorage.getItem("USER_AUTH")? 
                    "":
                    <li>
                    <NavLink to='/login'>Login</NavLink>
                    </li>
                }
                <li>
                    <NavLink to='/registrar'>Registrar</NavLink>
                </li>
                <li>
                    <NavLink to='/ordenes'>Ordenes</NavLink>
                </li>
                <li>
                    {
                    !window.localStorage.getItem("USER_AUTH")
                    ? ""
                    :<button onClick={()=> {
                            window.localStorage.removeItem("USER_AUTH");
                            navigate("/");
                    }}>Cerrar sesion</button>
                    }</li>
            </ul>
        </div>
    )
}