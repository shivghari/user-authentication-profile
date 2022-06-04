import AuthData from './AuthData'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
      
  if(AuthData.returnIsAuth()){
      console.log(AuthData.returnIsAuth())
      return <div>{children}</div>
  }
  else{
      return <Navigate to='/'></Navigate>
    }
}