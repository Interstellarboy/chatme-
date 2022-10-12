import Authenticate from './Authenticate';
import './App.css';
import Room from './Room';
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authenticate />} />
        {/* <Route index element={<App />} /> */}
        <Route path='/Room' element={<Room />} />
        <Route path='Authenticate' element={<Authenticate />} />
      </Routes>

    </BrowserRouter>



  );
}

export default App;
