import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Welcome from './component/Welcome';
import Signin from './component/Signin';
import Login from './component/Login';
import Home from './component/Home';
import ProtectedRoute from './component/ProtectedRoute';
import DisplayData from './component/DisplayData';
import Galary from './component/Galary';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={
              <>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </>
            }></Route>
            <Route path='/display' element={
              <>
                <ProtectedRoute>
                  <DisplayData />
                </ProtectedRoute>
              </>
            }></Route>
            <Route path='/galary' element={
              <>
                <ProtectedRoute>
                  <Galary />
                </ProtectedRoute>
              </>
            }></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
