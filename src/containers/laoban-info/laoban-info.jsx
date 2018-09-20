import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem, Button, WingBlank, List, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import  HeaderSelector from '../../componnets/header-selector/header-selector'
import {updateUser} from '../../redux/actions'


class LaobanInfo extends Component {

  state = {
    header: '',
    info: '',
    post: '',
    salary: '',
    company: ''
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }


  render () {

    const {header} = this.props.user
    if(header) {
      return <Redirect to='/laoban'/>
    }

    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem placeholder='招聘职位' onChange={value => this.handleChange('post', value)}>招聘职位:</InputItem>
            <InputItem placeholder='公司名称' onChange={value => this.handleChange('company', value)}>公司名称:</InputItem>
            <InputItem placeholder='职位薪资' onChange={value => this.handleChange('salary', value)}>职位薪资:</InputItem>
            <TextareaItem
              title="招聘职位:"
              placeholder='招聘职位'
              rows={3}
              onChange={value => this.handleChange('info', value)}
            />
            <Button type='primary' onClick={this.save}>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(LaobanInfo)