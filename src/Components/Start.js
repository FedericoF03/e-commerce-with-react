import React, {useState, useEffect} from 'react'
import NavBar from '../Components/Nav'
import Footer from './Footer'
import Cards from './Cards'

export default function StartComp(){
    return(
        <>
            <NavBar/>
            <div className='start-comp'>
                <Cards/>  
            </div> 
            <Footer/>
        </>
    )
}

