import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import {connect} from 'react-redux'
import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

import NavFooter from '../../componnets/nav-footer/nav-footer'

class Main extends Component {

  navList = [
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  componentDidMount () {
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      this.props.getUser()
    }
  }


  render () {
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to='/login'/>
    }
    const {user} = this.props
    if(!user._id) {
      return <div>LOADING...</div>
    }
    const path = this.props.location.pathname
    if(path==='/') {
      return <Redirect to={getRedirectPath(user.type, user.header)}/>
    }

    const navList = this.navList

    const currentNav = navList.find(nav => path===nav.path)

    const {type} = this.props.user
    if(type==='laoban') {
      navList[1].hide = true
    } else {
      navList[0].hide = true
    }

    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}

        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>

          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
        </Switch>

        {currentNav ? <NavFooter navList={this.navList}/> : null}

      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)

