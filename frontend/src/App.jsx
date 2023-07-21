import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import UserLogin from './components/UserLogin.jsx'
import Dashboard from './components/Dashboard'



function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path ="/" element={<UserLogin/>}/>
        <Route exact path = "/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
