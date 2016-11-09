// import 'react-native-mock/mock'
import mockery from 'mockery'
import jsdom from 'jsdom'

// inject __DEV__ as it is not available when running through the tests
global.__DEV__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence the warnings when *real* modules load... this is a change from
// the norm.  We want to opt-in instead of opt-out because not everything
// will be mocked.
mockery.warnOnUnregistered(false)

// Let's register some mocks for the images that are brought into our project.
// You'll have to do the same because the React Native packager and babel
// are locked into a horrible custody battle.
// mockery.registerMock('../Images/ir.png', 0)

// mockery.registerMock('react-native-router-flux', {
//   Actions: {
//     login: () => {},
//     video: () => {}
//   }
// })

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
