import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartComp from "./Components/Start"

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/se" element={<StartComp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
