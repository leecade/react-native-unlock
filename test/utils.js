import test from 'ava'
import { measure } from '../src/utils'

test('Should transform to promise', async t => {
  const response = measure()
  t.truthy(response)
  t.is(typeof response.then, 'function')
  t.is(typeof response.catch, 'function')
})
