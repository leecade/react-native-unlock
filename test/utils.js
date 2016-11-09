import test from 'ava'
import { measure, measureCallback } from '../src/utils'

test('Should transform to promise', async t => {
  const response = measure()
  t.truthy(response)
  t.is(typeof response.then, 'function')
  t.is(typeof response.catch, 'function')
  const result = await Promise.race([
    measure(),
    new Promise((resolve, reject) => setTimeout(resolve, 100))
  ])

  t.falsy(result)

  const resolve = (...args) => {
    t.deepEqual(args, [{ x: 1, y: 2, width: 3, height: 4, pageX: 5, pageY: 6 }])
  }
  measureCallback(resolve, 1, 2, 3, 4, 5, 6)
})
