import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom' 

import { AuthContext } from '../context/AuthContext'

export default function DynamicRoute( props ) {

  const { user,  } = useContext(AuthContext)

  // no authenticated user and trying to access saved sheets
  if (!user && props.savedSheets) {
    
    // redirect to main page
    return <Redirect to="/" exact/>
  } else {
    return <Route component={props.component} {...props}/>
  }
}
