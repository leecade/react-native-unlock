import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import Line from '../src/Line'

test('Should render the default props', async t => {
  const wrapper = shallow(<Line />)
  t.is(wrapper.name(), 'Shape')
  t.deepEqual(wrapper.props(), {
    d: undefined,
    stroke: '#000',
    strokeWidth: 1
  })
})
