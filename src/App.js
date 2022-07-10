import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartComp from "./Components/Start"
import './Styles/style.css'
import Product from './Components/Product'
import Products from './Components/Products'
import Categories from './Components/Categories'
import Register from './Components/Register'
import Login from './Components/Login'
import Comprar from './Components/Comprar'
import Ordenes from './Components/Ordenes'

const App = ()=>
  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartComp/>}/>
        <Route path="*" element={"Error 404 No se ah encontrado la pagina"}/>
        <Route path="/productos/categories/:name" element={<Categories/>}/>
        <Route path="/productos/:name" element={<Product/>}/>
        <Route path="/productos" element={<Products/>}/>
        <Route path="/registrar" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/comprar" element={<Comprar/>}/>
        <Route path="/ordenes" element={<Ordenes/>}/>
      </Routes>
    </BrowserRouter>
  );


export default App;
