import { NativeModules, findNodeHandle } from 'react-native'
const { UIManager } = NativeModules
let findNode = findNodeHandle || (ref => ref)

export const measureCallback = (resolve, x, y, width, height, pageX, pageY) => resolve({x, y, width, height, pageX, pageY})

export const measure = ref => new Promise(resolve => {
  UIManager.measure(findNode(ref), measureCallback.bind(null, resolve))
})
