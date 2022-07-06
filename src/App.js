import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartComp from "./Components/Start"
import './Styles/style.css'
import Products from './Components/Products'

const App = ()=>
  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartComp/>}/>
        <Route path="*" element={"Error 404 No se ah encontrado la pagina"}/>
        <Route path="/productos/:name" element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  );


export default App;
