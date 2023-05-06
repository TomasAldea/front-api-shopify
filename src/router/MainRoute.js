import React from 'react'
import { Routes, Route, BrowserRouter, HashRouter, Navigate } from "react-router-dom"
import { Products } from '../components/Products'
import { CardDetail } from '../components/CardDetail'
import { Footer } from '../components/Footer'

export const MainRoute = () => {
  return (
    <HashRouter>
        {/* header y navegacion <Header/>*/}
        

        {/* contenido central */}
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/detail/:productId' element={<CardDetail/>}/>

            <Route path='*'element={<h1>Parece que te has perdido!</h1>}/>
        </Routes>

        {/* footer */}
        <Footer/>
    </HashRouter>
  )
}
