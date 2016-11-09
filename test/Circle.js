import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import Circle from '../src/Circle'

test('Should render the default props', async t => {
  const wrapper = shallow(<Circle />)
  t.is(wrapper.name(), 'Group')
  // t.deepEqual(wrapper.props(), {
  //   d: undefined,
  //   stroke: '#000',
  //   strokeWidth: 1
  // })
})
