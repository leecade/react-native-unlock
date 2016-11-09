import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import Unlock from 'react-native-unlock'

var styles = {
  wrap: {
    flex: 1
  },
  unlock: {
    flex: 1,
    marginTop: 10
  }
}

export default class extends Component {
  state = {
    passwd: '',
    unlockState: 'READY',
    clear: false,
    passwdMinLength: 3,
    passwdMaxLength: 9
  }
  render () {
    const { passwd, clear, passwdMinLength } = this.state
    return (
      <View style={styles.wrap}>
        <Text>Hi1</Text>
        <Unlock
          gapSize={10}
          style={styles.unlock}
          clear={clear}
          interactive={this.state.unlockState.split('_')[0]}
          autoResetTimeout={2}
          onGrant={() => this.setState({clear: false, unlockState: 'READY'})}
          onReset={() => this.setState({unlockState: 'READY'})}
          onRelease={stock => {
            if (!stock.length) return
            if (stock.length < passwdMinLength) return this.setState({unlockState: 'ERROR_TOO_SHORT'})
            const result = stock.join('')
            if (!passwd) {
              return this.setState({
                unlockState: 'SUCCESS_AGAIN',
                passwd: result
              })
            }
            if (passwd !== result) {
              return this.setState({
                unlockState: 'ERROR_NOT_MATCH'
              })
            }
            this.setState({
              unlockState: 'SUCCESS'
            // }, Actions.home)
            })
            // this.props.dispatch(updateGesturePass({
            //   gesturePass: passwd,
            //   unlockAt: +new Date()
            // }))
          }} />
      </View>
    )
  }
}
