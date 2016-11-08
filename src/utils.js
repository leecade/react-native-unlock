import { NativeModules, findNodeHandle } from 'react-native'
const { UIManager } = NativeModules
export const measure = ref =>
  new Promise(resolve =>
    UIManager.measure(findNodeHandle(ref), (x, y, width, height, pageX, pageY) => resolve({x, y, width, height, pageX, pageY}))
  )
