import {BrowserRouter, NavLink} from 'react-router-dom'
import logo from '../Assets/Syntwave-logo.png'

export default function NavBar(){
    return(
        <div className='nav flex'>
            <img className='logo' src={logo}></img>
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
                    <NavLink to='/compras'>Compras</NavLink>
                </li>
            </ul>
        </div>
    )
}