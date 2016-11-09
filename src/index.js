/**
 * react-native-unlock
 * @author leecade<leecade@163.com>
 */
import React, { PureComponent, PropTypes } from 'react'
import {
  View,
  ART,
  Text as TEXT,
  PanResponder,
  Platform,
  Dimensions
} from 'react-native'
import { measure } from './utils'
import Circle from './Circle'
import Line from './Line'
const { width } = Dimensions.get('window')
const {
  Path,
  Text,
  Surface,
  Group
} = ART

const defaultStyles = {
  bg: {
    flex: 1
  },
  wrap: {
    flex: 1
  },
  surface: {
    // backgroundColor: '#eee'
  },
  textWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255,255,0,.5)'
  },
  text: {
    flex: 1,
    width: 70,
    height: 70,
    lineHeight: 70,
    margin: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(25,255,0,.5)'
  },

  // default outer props
  outerProps: {
    radius: 40,
    fill: '#fff',
    stroke: '#A0A2A4',
    strokeWidth: 1
  },
  outerOverProps: {
    stroke: '#999'
  },
  outerErrorProps: {
    stroke: '#D0021B'
  },
  outerSuccessProps: {
    stroke: '#00AF63'
  },

  // default inner props
  innerProps: {
    fill: '#fff',
    radius: 10
  },
  innerOverProps: {
    fill: '#A0A2A4'
  },
  innerErrorProps: {
    fill: '#D0021B'
  },
  innerSuccessProps: {
    fill: '#00AF63'
  },

  // default line props
  lineProps: {
    stroke: '#A0A2A4',
    strokeWidth: 1
  },
  lineSuccessProps: {
    stroke: '#00AF63'
  },
  lineErrorProps: {
    stroke: '#D0021B'
  },

  // default text props
  textProps: {
    font: '20px arial',
    fill: '#A0A2A4'
  },
  textOverProps: {
    fill: '#A0A2A4'
  },
  textErrorProps: {
    fill: '#D0021B'
  },
  textSuccessProps: {
    fill: '#00AF63'
  }
}
export default class extends PureComponent {
  static propTypes = {

    /**
     * fixed width / height or autoLayout base on outer size
     * @type {[type]}
     */
    width: PropTypes.number,
    height: PropTypes.number,

    /**
     * gap size between outer circle
     * @type {[type]}
     */
    gapSize: PropTypes.number,

    // circleRadius: PropTypes.number,
    // strokeWidth: PropTypes.number,
    stroke: PropTypes.string,
    font: PropTypes.string,

    /**
     * [style description]
     * @type {[type]}
     */
    style: PropTypes.object,

    /**
     * [autoResetTimeout description]
     * @type {[type]}
     */
    autoResetTimeout: PropTypes.number,

    /**
     * clear current state
     * @type {[type]}
     */
    clear: PropTypes.bool,

    /**
     * Spec the outer component
     * @type {[type]}
     */
    outer: PropTypes.element,

    /**
     * outer style
     * @type {Object}
     * {
     *  stroke: '',
     *  strokeWidth: 1,
     *  x: 0,
     *  y: 0,
     *  children: <Circle />
     * }
     */
    outerProps: PropTypes.object,
    outerOverProps: PropTypes.object,
    outerErrorProps: PropTypes.object,
    outerSuccessProps: PropTypes.object,

    /**
     * Spec the outer component
     * @type {[type]}
     */
    inner: PropTypes.element,
    /**
     * outer style
     * @type {Object}
     * {
     *  stroke: '',
     *  strokeWidth: 1,
     *  x: 0,
     *  y: 0,
     *  children: <Circle />
     * }
     */
    innerProps: PropTypes.object,
    innerOverProps: PropTypes.object,
    innerErrorProps: PropTypes.object,
    innerSuccessProps: PropTypes.object,

    /**
     * onPanResponderRelease handle
     * @type {[type]}
     */
    onRelease: PropTypes.func,

    /**
     * onPanResponderGrant handle
     * @type {[type]}
     */
    onGrant: PropTypes.func,

    /**
     * line style
     * @type {[type]}
     */
    line: PropTypes.object,
    lineSuccess: PropTypes.object,
    lineError: PropTypes.object,

    interactive: PropTypes.oneOf(['', 'READY', 'SUCCESS', 'ERROR']),

    /**
     * whether show tail line
     * @type {Bool}
     */
    showTail: PropTypes.bool,

    /**
     * whether show inner text
     * @type {Bool}
     */
    showText: PropTypes.bool,

    // TODO:
    maxLength: PropTypes.number,
    // TODO:
    mode: PropTypes.oneOf(['gesture', 'touch', 'fingerprint'])
  }
  static defaultProps = {
    // width: 50,
    // height: 50,
    // circleRadius: 50,
    mode: 'gesture',
    interactive: 'READY',
    strokeWidth: 1,
    // stroke: '#000',
    // gapSize: 30,
    maxLength: 10,
    font: '20px arial'
  }
  constructor (props, context) {
    super(props)
    let state = {
      styles: Object.assign({}, defaultStyles),
      layout: {},
      textSize: {},
      size: 0,
      list: [],
      stock: [],
      locationX: 0,
      locationY: 0,
      isTouchStart: false
    }

    // merge custom styles
    Object.keys(props)
      .filter(prop => /.+Props$/.test(prop))
      .map(prop => Object.assign(state.styles[prop], props[prop]))
    this.state = state
    this.locationX = 0
    this.locationY = 0
  }
  // layoutHandle = ({ nativeEvent }) => {
    // this.setState({layoutBug: nativeEvent.layout})
  // }
  // throttle = (fn, delay = 50) => {
  //   let timer = null
  //   return () => {
  //     const context = this
  //     const args = arguments
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       fn.apply(context, args)
  //     }, delay)
  //   }
  // }
  onPanResponderGrant = async (e, gestureState) => {
    const { onGrant } = this.props
    const { locationX, locationY } = e.nativeEvent.changedTouches[0]
    await this.resetStock()
    this.updateStock(locationX, locationY)
    onGrant && onGrant(this, e, gestureState)
  }
  onPanResponderMove = (e, gestureState) => {
    const { mode, showTail } = this.props
    if (mode === 'touch') return
    let { locationX, locationY } = e.nativeEvent.changedTouches[0]
    // Note:
    // [Android] onResponderMove nativeEvent locationX does not change
    // remove the patch when this [issue](https://github.com/facebook/react-native/issues/7221) closed
    if (Platform.OS === 'android') {
      locationX = e.nativeEvent.changedTouches[0].pageX - this.state.layout.pageX
      locationY = e.nativeEvent.changedTouches[0].pageY - this.state.layout.pageY
    }
    // setState heavy cost
    showTail && this.setState({ locationX, locationY })
    this.locationX = locationX
    this.locationY = locationY
    this.updateStock(locationX, locationY)
  }
  onPanResponderRelease = (e, gestureState) => {
    const { onRelease, autoResetTimeout } = this.props
    onRelease && onRelease(this.state.stock, this, e, gestureState)
    if (!autoResetTimeout) return
    this.resetTimer && clearTimeout(this.resetTimer)
    this.resetTimer = setTimeout(this.resetStock, autoResetTimeout * 1000)
  }
  componentWillUpdate (nextProps, nextState) {
    if (!nextState.list.length) return true
  }
  componentWillUnmount () {
    this.resetTimer && clearTimeout(this.resetTimer)
  }
  componentWillMount () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    })
  }
  componentDidMount () {
    setTimeout(async () => this.setState({
      layout: await measure(this.refs.wrap),
      textSize: await measure(this.refs.needle)
    }, this.autoLayout))
  }
  autoLayout () {
    const { styles, layout } = this.state
    const { radius, strokeWidth } = styles.outerProps
    const { gapSize, mode } = this.props
    const wrapWidth = this.props.width || layout.width || width
    const size = ((wrapWidth - gapSize * 4) / 3 - strokeWidth) / 2 || radius
    const gap = gapSize || (wrapWidth - ((size + strokeWidth) * 2 * 3)) / 4
    let list = []
    for (let i = 0; i < 9; i++) {
      let n = i
      let y = gap
      if (i >= 3 && i < 6) {
        n = i - 3
        y = (gap + size) * 2 + strokeWidth
      } else if (i > 3) {
        n = i - 6
        y = gap * 3 + size * 4 + strokeWidth * 2
      }
      let x = n * size * 2 + (n + 1) * gap + strokeWidth * n
      list.push({radius: size, x: x + size, y: y + size})
    }
    mode === 'touch' && list.push({radius: size, x: (size + gap) * 2 + strokeWidth * 1 + size, y: gap * 5 + size * 6 + strokeWidth * 3})
    this.setState({ list, size })
  }
  updateStock = (x, y) => {
    const { list } = this.state
    const { strokeWidth, maxLength } = this.props
    list.some((item, i) => {
      if (this.isTouchOver({x, y}, {
        x: item.x,
        y: item.y,
        radius: item.radius + strokeWidth
      })) {
        let stock = this.state.stock.slice()

        // 0 -> 5, 0 -> 7 is legal?
        if (stock.length < maxLength && !stock.includes(i)) {
          stock.push(i)
          this.setState({ stock })
        }
        return true
      }
    })
  }
  resetStock = () => new Promise(resolve => {
    this.setState({stock: []}, resolve)
    this.props.onReset && this.props.onReset(this)
  })

  /*
  point: { x, y }
  circle: { x, y, radius }
  */
  isTouchOver = (point, circle) => Math.sqrt(Math.pow(point.x - circle.x, 2) + Math.pow(point.y - circle.y, 2)) < circle.radius

  interactiveStyle = (type, i) => {
    const { stock, styles } = this.state
    if (this.props.clear || i !== undefined && !stock.includes(i)) return {}
    const stylesMap = {
      'READY': 'Over',
      'SUCCESS': 'Success',
      'ERROR': 'Error'
    }
    return styles[`${type}${stylesMap[this.props.interactive]}Props`] || {}
  }

  render () {
    const { styles, layout, list, stock, textSize, locationX, locationY } = this.state
    const props = this.props
    const linePath = new Path()
    if (props.mode === 'gesture') {
      stock.map((n, i) => {
        const { x, y } = list[n]
        i === 0
          ? linePath.moveTo(x, y)
          : linePath.lineTo(x, y)
      })
      props.showTail && stock.length && linePath.lineTo(locationX, locationY)
    }

    // Note:
    // 1. [Android] measure not returning values, add `collapsable={false}` for fix the bug (ref: https://github.com/leecade/rn-notes/issues/30)
    // 2. There is no `lineHeight` prop for Art.Text, so ref.needle used to resolve the problem
    // 3. TODO: Still not smooth on Android if render too much elements
    return (<View style={styles.bg} {...this.panResponder.panHandlers}>
      <TEXT collapsable={false} ref='needle' style={{fontSize: 20, position: 'absolute', opacity: 0}}>0</TEXT>
      <View ref='wrap' collapsable={false} style={[styles.wrap, props.style]}>
        {
          !!(props.width || layout.width) && <Surface style={styles.surface} width={props.width || layout.width} height={props.height || layout.height}>
            {props.mode === 'gesture' && !props.clear && <Line d={linePath} {...styles.lineProps} {...(this.interactiveStyle('line'))} />}
            {
              list.map(({...item}, i) => <Circle
                key={i}
                {...styles.outerProps}
                {...(this.interactiveStyle('outer', i))}
                {...item} >
                <Circle {...styles.innerProps} {...(this.interactiveStyle('inner', i))} />
                {
                  props.showText && <Text y={textSize.height ? -1 * textSize.height / 2 : 0} alignment='center' {...styles.textProps} {...(this.interactiveStyle('text', i))}>{i + (props.mode === 'gesture' ? 1 : 0) + ''}</Text>
                }
              </Circle>)
            }
          </Surface>
        }
      </View>
    </View>)
  }
}

export { Circle, Line, Text, Group }
