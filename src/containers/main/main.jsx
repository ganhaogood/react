import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'


export default class Main extends Component {

  render () {
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
        </Switch>
      </div>
    )
  }
}