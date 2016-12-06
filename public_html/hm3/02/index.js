"use strict";

/**
 *
 * @param {Object} variable1
 * @param {Object} variable2
 * @returns {Boolean}
 */
function deepEqual(variable1, variable2)
{
    /**
     * @type Array
     */
    var iterator;

    if(!objectsBoth(variable1,variable2))
    {
        return variable1 === variable2;
    }

    if(variable1.constructor().toString() !== variable2.constructor().toString())
    {
        return false;
    }

    if(variable1 instanceof Date && variable2 instanceof Date)
    {
        return variable1.valueOf() === variable2.valueOf();
    }

    iterator = Object.keys(variable1);
    if(iterator.length !== Object.keys(variable2).length)
    {
        return false;
    }

    for (let index of iterator)
    {
        if(!deepEqual(variable1[index],variable2[index]))
        {
            console.log(index);
            return false;
        }
    }
    return true;
}

/**
 *
 * @param {type} obj1
 * @param {type} obj2
 * @returns {Boolean}
 */
function objectsBoth(obj1, obj2)
{
    return (obj1 && typeof obj1 === 'object') && (obj2 && typeof obj2 === 'object');
}

var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10),
    prop7: null
};

var objA1 = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10),
    prop7: null
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop7: null,
    prop1: 'value1',
    prop2: 'value2',
    prop6: [],
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};

var objC = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};

var objD = {
    prop5: 1000,
    prop3: 'value3',
    prop7: null,
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/08/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};
var arrA = [1,2,3,4,5,6];
var arrB = [1,2,3,4,5,6,7];
var arrC = [1,3,2,4,5,6];

console.log(deepEqual(objA,objA1));   //true
console.log(deepEqual(objA,objB));   //prop6 false
console.log(deepEqual(objA,objC));   //false
console.log(deepEqual(objA,objD));   // prop6 false
console.log(deepEqual(new Date(2016,2,10),new Date('2016/3/10'))); //true
console.log(deepEqual(arrA,arrB));   //false
console.log(deepEqual(arrA,arrC));   // 1 false
console.log(deepEqual(arrA,'12'));   //false
console.log(deepEqual('12','12'));   //true
console.log(deepEqual(arrA,null));   //false
console.log(deepEqual(null,arrA));   //false
console.log(deepEqual(null,null));   //true
console.log(deepEqual(false,undefined));   //false