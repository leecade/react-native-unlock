import React, { Component } from 'react'
import test from 'ava'
import { mount } from 'enzyme'
// import { measure } from '../src/utils'
import {
  View
} from 'react-native'

test('xx', async t => {
  class Foo extends Component {
    render () {
      return (<View ref='needle' />)
    }
  }
  mount(<Foo />)
  // console.log(876, wrapper.ref('needle'))
  // console.log(8773, findNodeHandle(wrapper.ref('needle')))
  // console.log(await measure(wrapper.ref('needle')))
})
