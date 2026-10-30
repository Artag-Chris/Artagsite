import { loadViewMode, saveViewMode, isValidViewMode } from '../src/lib/viewMode.ts'

let passed = 0
let failed = 0
function assert(cond, msg) {
  if (cond) { passed++; console.log('PASS:', msg) }
  else { failed++; console.error('FAIL:', msg) }
}

// Mock storage
function makeStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
    setItem: (k, v) => { data[k] = v },
    _data: data,
  }
}

// isValidViewMode
assert(isValidViewMode('b2b') === true, 'isValidViewMode b2b')
assert(isValidViewMode('dev') === true, 'isValidViewMode dev')
assert(isValidViewMode('personal') === true, 'isValidViewMode personal')
assert(isValidViewMode('foo') === false, 'isValidViewMode foo false')
assert(isValidViewMode(null) === false, 'isValidViewMode null false')
assert(isValidViewMode(42) === false, 'isValidViewMode number false')

// loadViewMode
assert(loadViewMode(null) === 'dev', 'loadViewMode null -> default dev')
const s1 = makeStorage({})
assert(loadViewMode(s1) === 'dev', 'loadViewMode empty -> default dev')
const s2 = makeStorage({ 'artag:viewMode': 'b2b' })
assert(loadViewMode(s2) === 'b2b', 'loadViewMode b2b')
const s3 = makeStorage({ 'artag:viewMode': 'garbage' })
assert(loadViewMode(s3) === 'dev', 'loadViewMode garbage -> default')

// saveViewMode
const s4 = makeStorage({})
saveViewMode(s4, 'personal')
assert(s4._data['artag:viewMode'] === 'personal', 'saveViewMode personal')
saveViewMode(null, 'dev') // no throw
assert(true, 'saveViewMode null no throw')

// round-trip
const s5 = makeStorage({})
saveViewMode(s5, 'b2b')
assert(loadViewMode(s5) === 'b2b', 'round-trip b2b')

// throwing storage
const throwing = {
  getItem: () => { throw new Error('boom') },
  setItem: () => { throw new Error('boom') },
}
assert(loadViewMode(throwing) === 'dev', 'loadViewMode throwing -> default')
saveViewMode(throwing, 'dev') // no throw
assert(true, 'saveViewMode throwing no throw')

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
