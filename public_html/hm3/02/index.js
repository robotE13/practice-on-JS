"use strict";

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Boolean}
 */
function objectsEqual(obj1, obj2)
{
    /**
     * @type Array
     */
    var iterator;

    if(!objectsBoth(obj1,obj2))
    {
        return false;
    }else {
        iterator = Object.keys(obj1);
        if(iterator.length !== Object.keys(obj2).length)
        {
            return false;
        }

        if(iterator.length === 0)
        {
            return obj1.valueOf() === obj2.valueOf();
        }

        for (let index of iterator)
        {
            if(objectsBoth(obj1[index], obj2[index]))
            {
                if(!objectsEqual(obj1[index],obj2[index]))
                {
                    console.log(index);
                    return false;
                }
            }else if(obj1[index] !== obj2[index]){
                console.log(index);
                return false;
            }
        }
        return true;
    }
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

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop7: null,
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

console.log(objectsEqual(objA,objB));   //true
console.log(objectsEqual(objA,objC));   //false
console.log(objectsEqual(objA,objD));   // prop6 false
console.log(objectsEqual(new Date(2016,2,10),new Date('2016/3/10'))); //true
console.log(objectsEqual(arrA,arrB));   //false
console.log(objectsEqual(arrA,arrC));   // 1 false
console.log(objectsEqual(arrA,'12'));   //false
console.log(objectsEqual(arrA,null));   //false