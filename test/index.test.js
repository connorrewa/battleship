import { returnHi } from '../src/index.js'
console.log(returnHi)
console.log('========= index ========');
test('returnHi', () => {
    expect(returnHi()).toBe('hi');
})