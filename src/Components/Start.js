import React from 'react';
import NavBar from '../Components/Nav';
import Footer from './Footer';
import Cards from './Cards';

export default function StartComp(){
    return(
        <>
            <NavBar/>{
            <div className='container__cards-Route'>
                <Cards/>  
            </div> 
            }<Footer/>
        </>
    );
};

