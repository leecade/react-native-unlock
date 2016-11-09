import { NativeModules, findNodeHandle } from 'react-native'
const { UIManager } = NativeModules
let findNode = findNodeHandle || (ref => ref)
export const measure = ref =>
  new Promise(resolve =>
    UIManager.measure(findNode(ref), (x, y, width, height, pageX, pageY) => resolve({x, y, width, height, pageX, pageY}))
  )
