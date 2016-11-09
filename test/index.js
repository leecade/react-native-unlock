import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import { Platform } from 'react-native'
// import sinon from 'sinon'
import Unlock from '../src/'
export const wait = (time = 0) => new Promise((resolve, reject) => setTimeout(resolve, 1000 * time))

const unlock = new Unlock({})

test('Check default props', async t => {
  const wrapper = mount(<Unlock />)
  t.deepEqual(wrapper.props(), {
    mode: 'gesture',
    interactive: 'READY',
    strokeWidth: 1,
    maxLength: 10,
    font: '20px arial'
  })
})

test('Check isTouchOver', async t => {
  const trueFixtures = [[{
    x: 1,
    y: 1
  }, {
    x: 1,
    y: 1,
    radius: 1
  }], [{
    x: 1,
    y: 10
  }, {
    x: 5,
    y: 1,
    radius: 10
  }]]
  const falseFixtures = [[{
    x: 1,
    y: 1
  }, {
    x: 1,
    y: 1,
    radius: 0
  }], [{
    x: 1,
    y: 5
  }, {
    x: 1,
    y: 1,
    radius: 4
  }]]
  trueFixtures.map(fixture => {
    t.truthy(unlock.isTouchOver(...fixture))
  })

  falseFixtures.map(fixture => {
    t.truthy(!unlock.isTouchOver(...fixture))
  })
})

test('Auto layout by width', async t => {
  const fixture = [
    { radius: 40, x: 3.5, y: 3.5 },
    { radius: 40, x: 48, y: 3.5 },
    { radius: 40, x: 92.5, y: 3.5 },
    { radius: 40, x: 3.5, y: 48 },
    { radius: 40, x: 48, y: 48 },
    { radius: 40, x: 92.5, y: 48 },
    { radius: 40, x: 3.5, y: 92.5 },
    { radius: 40, x: 48, y: 92.5 },
    { radius: 40, x: 92.5, y: 92.5 }
  ]
  const wrapper = mount(<Unlock width={100} />)
  wrapper.node.componentDidMount()
  wrapper.node.autoLayout()
  t.deepEqual(wrapper.state().list, fixture)
})

test('Auto layout by width + gapSize', async t => {
  const fixture = [
    { radius: 9.5, x: 19.5, y: 19.5 },
    { radius: 9.5, x: 49.5, y: 19.5 },
    { radius: 9.5, x: 79.5, y: 19.5 },
    { radius: 9.5, x: 19.5, y: 49.5 },
    { radius: 9.5, x: 49.5, y: 49.5 },
    { radius: 9.5, x: 79.5, y: 49.5 },
    { radius: 9.5, x: 19.5, y: 79.5 },
    { radius: 9.5, x: 49.5, y: 79.5 },
    { radius: 9.5, x: 79.5, y: 79.5 }
  ]
  const wrapper = mount(<Unlock width={100} gapSize={10} />)
  wrapper.node.autoLayout()
  t.deepEqual(wrapper.state().list, fixture)
})

test('Auto layout by width + gapSize + strokeWidth', async t => {
  const fixture = [
    { radius: 5, x: 15, y: 15 },
    { radius: 5, x: 45, y: 15 },
    { radius: 5, x: 75, y: 15 },
    { radius: 5, x: 15, y: 45 },
    { radius: 5, x: 45, y: 45 },
    { radius: 5, x: 75, y: 45 },
    { radius: 5, x: 15, y: 75 },
    { radius: 5, x: 45, y: 75 },
    { radius: 5, x: 75, y: 75 }
  ]
  const wrapper = mount(<Unlock width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.autoLayout()
  t.deepEqual(wrapper.state().list, fixture)
})

test('Update & reset stock ', async t => {
  const wrapper = mount(<Unlock width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.autoLayout()
  wrapper.node.updateStock(15, 15)
  t.is(wrapper.state().stock.length, 1)
  await wrapper.node.resetStock()
  t.is(wrapper.state().stock.length, 0)
})

test('Check interactive style', async t => {
  const fixture = { fill: '#00AF63' }
  const wrapper = mount(<Unlock interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.autoLayout()
  wrapper.node.updateStock(15, 15)
  t.deepEqual(wrapper.node.interactiveStyle('inner', 0), fixture)
})

test('Simulated moving and update stock', async t => {
  const fixture = {
    nativeEvent: {
      changedTouches: [{
        locationX: 15,
        locationY: 15
      }]
    }
  }
  const wrapper = mount(<Unlock interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.autoLayout()
  wrapper.node.onPanResponderMove(fixture)
  t.is(wrapper.state().stock.length, 1)

  const wrapper2 = mount(<Unlock mode='touch' interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper2.node.autoLayout()
  wrapper2.node.onPanResponderMove(fixture)
  t.is(wrapper2.state().stock.length, 0)

  const wrapper3 = mount(<Unlock interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper3.node.autoLayout()
  // android hack
  Platform.__setOS('android')
  wrapper.node.onPanResponderMove(fixture)
  t.is(wrapper.state().stock.length, 1)
})

test('Simulated touch and update stock', async t => {
  const fixture = {
    nativeEvent: {
      changedTouches: [{
        locationX: 15,
        locationY: 15
      }]
    }
  }
  const wrapper = mount(<Unlock interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.autoLayout()
  await wrapper.node.onPanResponderGrant(fixture)
  t.is(wrapper.state().stock.length, 1)
})

test('Check others branches', async t => {
  const wrapper = mount(<Unlock autoResetTimeout={1} interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  t.true(wrapper.node.componentWillUpdate({}, {
    list: []
  }))

  wrapper.node.resetTimer = setTimeout(() => {})
  wrapper.node.componentWillUnmount()
  t.is(wrapper.node.resetTimer[0], null)
  wrapper.node.onPanResponderRelease()
  t.is(wrapper.node.resetTimer[0], undefined)
  wrapper.node.componentWillMount()

  const mockEvent = {
    nativeEvent: {
      changedTouches: [{
        locationX: 15,
        locationY: 15
      }],
      touches: [{
        locationX: 15,
        locationY: 15
      }]
    },
    touchHistory: {
      numberActiveTouches: [{
        locationX: 15,
        locationY: 15
      }],
      touchBank: [{
        locationX: 15,
        locationY: 15
      }]
    }
  }
  const panHandlers = wrapper.node.panResponder.panHandlers
  t.true(panHandlers.onStartShouldSetResponder(mockEvent))
  t.true(panHandlers.onStartShouldSetResponderCapture(mockEvent))
  t.true(panHandlers.onMoveShouldSetResponder(mockEvent))

  const wrapper2 = mount(<Unlock interactive='SUCCESS' width={100} gapSize={10} outerProps={{
    strokeWidth: 10
  }} />)
  wrapper.node.onPanResponderRelease()
  t.is(wrapper2.node.resetTimer, undefined)
})
