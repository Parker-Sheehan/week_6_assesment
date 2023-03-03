const {shuffleArray} = require('./utils')

let arr = ['a', 'b', 'c', 'd', 'e', 'f']


describe('shuffleArray should', () => {
    test('return an array of the same length', () => {
        expect(shuffleArray(arr).length).toEqual(arr.length)
    })

})

describe('shuffleArray should', () => {
    test('return an array of the same length', () => {
        expect(shuffleArray(arr)).not.toEqual(!arr)
    })

})



// describe('Test convertLength function', () => {
//     test('function returns array length 2', () => {
//       expect(convertLength(testData.length)).toHaveLength(2)
//     })
//     test('Function converts min to array', () => {
//       expect(convertLength(200)).toEqual([3,20])
//     })
//     test('Function can handle less than 60 min', () => {
//       expect(convertLength(45)).toEqual([0,45])
//     })
//   })