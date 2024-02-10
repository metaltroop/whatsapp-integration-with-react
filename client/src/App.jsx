import {Routes, Route, } from 'react-router-dom'
import Form from './form/Form' 
import Form2 from './ping-form/Form'
import './App.css'

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/ping-form" element={<Form2/>} />
      </Routes>
    </>
  )
}

export default App
