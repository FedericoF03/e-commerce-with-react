import {NavLink, useNavigate} from 'react-router-dom';
import logo from '../Assets/Syntwave-logo.png';

export default function NavBar(){
    
    let navigate = useNavigate();
    return(
        <div className='nav flex'>
            <img className='logo' 
            src={logo}
            alt="Logo-E-commerce"
            ></img>
            <ul className="flex flex--end list">
                <li className='links flex flex--end'>
                    <NavLink to='/'>Inicio</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <NavLink to='/productos'>Productos</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <NavLink to='/comprar'>Comprar</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <NavLink to='/registrar'>Registrar</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <NavLink to='/ordenes'>Ordenes</NavLink>
                </li>
                <li className='links flex flex--end'>
                    <button onClick={()=>
                    {
                        window.localStorage.removeItem("USER_AUTH");
                        navigate("/");
                    }}>Cerrar sesion</button>
                </li>
            </ul>
        </div>
    )
}