import { computeRoi } from '../src/components/b2b/ROICalculator.tsx'

let passed = 0, failed = 0
function assert(cond, msg) {
  if (cond) { passed++; console.log('PASS:', msg) }
  else { failed++; console.error('FAIL:', msg) }
}

// edge cases
assert(computeRoi(0, 25).monthlySavings === 0, '0 hours -> 0 savings')
assert(computeRoi(15, 0).monthlySavings === 0, '0 cost -> 0 savings')
assert(computeRoi(-5, 25).monthlySavings === 0, 'negative hours -> 0')
assert(computeRoi(15, -10).monthlySavings === 0, 'negative cost -> 0')
assert(computeRoi(NaN, 25).monthlySavings === 0, 'NaN hours -> 0')

// normal
const r = computeRoi(15, 25)
assert(Math.round(r.monthlyHours) === 65, '15h/week * 4.33 = 65 monthly hours')
assert(Math.round(r.monthlySavings) === 1624, 'monthly savings 1624')
assert(Math.round(r.annualSavings) === 19485, 'annual savings 19485')

// 40h week
const r2 = computeRoi(40, 50)
assert(Math.round(r2.monthlySavings) === 8660, '40h/week @50 = 8660/month')

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
