import test from 'ava'
import React from 'react'
import {
  View
} from 'react-native'
import { shallow } from 'enzyme'

import Circle from '../src/Circle'

test('Should render within the Group', async t => {
  const wrapper = shallow(<Circle />)
  t.is(wrapper.name(), 'Group')
  t.is(wrapper.children().name(), 'Shape')
})

test('Should render with default props', async t => {
  const wrapper = shallow(<Circle />)
  const props = wrapper.children().props()
  t.deepEqual(props, {
    x: 0,
    y: 0,
    d: props.d,
    stroke: '#000',
    fill: '#000',
    strokeWidth: 0
  })
})

test('Should handle position base on strokeWidth & radius', async t => {
  const wrapper = shallow(<Circle x={5} radius={10} y={10} strokeWidth={10} />)
  const props = wrapper.children().props()
  t.deepEqual(props, {
    x: -5,
    y: 0,
    strokeWidth: 10,
    d: props.d,
    stroke: '#000',
    fill: '#000'
  })
})

test('Should render includes children', async t => {
  const wrapper = shallow(<Circle x={10} y={10} strokeWidth={10}><View /></Circle>)
  const child = wrapper.children().nodes[1]
  t.deepEqual(child.props, {
    x: 15,
    y: 15
  })
})
