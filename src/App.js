import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route}
from "react-router-dom"
import Checkout from './Checkout';
import Login from './Login'
import { auth }  from './firebase'
import { useStateValue } from './StateProvider';

function App() {
  
  const [{}, dispatch] = useStateValue();
  useEffect(()=> {

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>'  , authUser);

      if(authUser){
        //user just logged in / the user was logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  //will only run when the app component loads
  },[])
  return (
    // BEM 
    <Router>
    <div className="App">
    
    <Routes>
    <Route path='/login' 
      element={<>
      <Login/></>}/>
      <Route path='/checkout' 
      element={<>
      <Header/><Checkout/></>}/>
      <Route path='/'
      element={<>
      <Header/><Home/></>}/>
    </Routes>          
    </div>
    </Router>
  );
}

export default App;
