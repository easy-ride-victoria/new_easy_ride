import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MyCalendar from './Calendar/Calendar'
import Home from './Home/Home'



const App = () => {
  return (

    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/calendar" component={MyCalendar}/>
    </Switch>
  )
}
 
export default App;