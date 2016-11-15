"use strict";
/**
 *
 * @param {Number} than
 * @param {Number} value
 * @returns {Boolean} true if value greater {than}
 */
function greaterThan(than,value) {
    return value > than;
};

/**
 * Custom forEach.
 * @param {Function} callback
 * @returns {undefined}
 */
Array.prototype.forEach2 = function(callback){
    var index;

    for(index = 0;index < this.length; index++)
    {
        if(index in this)
        {
            callback(this[index],index,this);
        }
    }
};

/**
 * Custom filter.
 * @param {Function} filter
 * @returns {Array}
 */
Array.prototype.filter2 = function(filter){
    var result=[];

    for(var index = 0;index < this.length; index++)
    {
        if(filter(this[index],index,this))
        {
            result[result.length]=this[index];
        }
    }
    return result;
};

/**
 *
 * @param {Function} callback
 * @returns {Array}
 */
Array.prototype.map2 = function(callback)
{
    var result=[];

    for(var index = 0;index < this.length; index++)
    {
        if(index in this)
        {
            result[index]=callback(this[index],index,this);
        }
    }
    return result;
};

/**
 *
 * @param {Number} begin
 * @param {Number} end
 * @returns {Array}
 */
Array.prototype.slice2 = function(begin, end){
    var result = [];

    begin = getRealPosition(begin,this.length,0);
    end = getRealPosition(end,this.length,this.length);
    for (let index = begin; index < end; index++)
    {
        if(index in this)
        {
            result[result.length]=this[index];
        }else{
            result.length +=1;
        }
    }
    return result;
};

/**
 * Custom reduce
 * @param {Function} callback
 * @param {Number} initialValue
 */
Array.prototype.reduce2 = function (callback,initialValue) {
    var result, index;

    if(!initialValue){
        arrayValidator(this);
        result = this[0];
        index = 1;
    }else{
        result = initialValue;
        index = 0;
    }

    for (index; index < this.length; index++) {
        if(index in this)
        {
            result = callback(result,this[index],index,this);
        }
    }
    return result;
};

/**
 *
 * @param {Number} start
 * @param {Number} deleteCount
 * @returns {Array}
 */
Array.prototype.splice2 = function (start,deleteCount) {
    var result , left;

    start = getRealPosition(start,this.length,0);
    if(!deleteCount && deleteCount !== 0)
    {
        deleteCount = this.length - start;
    }
    result = this.slice2(start, start + deleteCount);
    left = this.slice2(start + result.length);

    this.length = start;
    for(let index = 2; index < arguments.length; index++)
    {
        this[this.length]=arguments[index];
    }
    for(let index = 0; index < left.length;index++)
    {
        if(index in left)
        {
            this[this.length] = left[index];
        }else{
            this.length++;
        }
    }
    return result;
};

/**
 * Array validator.
 * @throws {Error} description
 * @param {mixed} source
 * @returns {undefined}
 */
function arrayValidator(source)
{
    if(!(source instanceof Array))
    {
        throw new Error('The argument is not an array');
    }else if (!source.length)
    {
        throw new Error('Reduce of empty array with no initial value');
    }
}

/**
 *
 * @param {Number} value
 * @param {Number} length description
 * @param {Number} defaultValue will be set if position value undefined
 * @returns {Number}
 */

function getRealPosition(value,length,defaultValue){
    if(value === undefined)
    {
        return defaultValue;
    }else{
        value = value < 0 ? length + value : 0 + value;
        return value < 0 ? 0 : value > length ? length : value;
    }
};

let arr = [1,null,2,3,,4,5,undefined,6];
let arr2 = [1,null,2,3,,4,5,6];

arr.forEach(element=>console.log(element));    // 1 2 3 4 5 undefined 6
arr.forEach2(element=>console.log(element));    // 1 2 3 4 5 undefined 6

let greaterThanN = arr.filter2(element => greaterThan(2,element));
let greaterThan2 = arr.filter2(element => greaterThan(2,element));
console.log(greaterThanN,greaterThan2);             // [ 3, 4, 5, 6]

let mulC = arr.map2(element=>element*2);
let mulN = arr.map(element=>element*2);
console.log(mulC, mulN);                            // [ 2, NaN, 4, 6, , 8, 10, NaN, 12 ]

console.log(arr.slice(3),arr.slice2(3));            // [ 3, , 4, 5, undefined, 6 ]
console.log(mulC.slice(2,-1),mulC.slice2(2,-1));    // [ 4, 6, , 8, 10, NaN ]
console.log(mulC.slice(5,6),mulC.slice2(5,6));      // [8]
console.log(mulC.slice2(),mulC.slice2());           // [ 2, NaN, 4, 6, , 8, 10, NaN, 12 ]
console.log(arr.slice(-111,56),arr.slice2(-111,56));// [ 1, null, 2, 3, , 4, 5, undefined, 6 ]
console.log(mulC.slice(-3,-1),mulC.slice2(-3,-1));  // [ 10, NaN]
console.log(mulC.slice(-4),mulC.slice2(-4));        // [ 8, 10, NaN, 12]*/

console.log(arr2.reduce( (prev,next) => prev + next ), arr2.reduce2( (prev,next) => prev + next ));     //21
console.log(arr2.reduce( (prev,next) => prev - next ,101), arr2.reduce2( (prev,next) => prev - next ,101)); //80
console.log([1].reduce( (prev,next) => prev - next), [1].reduce2( (prev,next) => prev - next));  //1
console.log([1,1].reduce( (prev,next) => prev - next), [1,1].reduce2( (prev,next) => prev - next));  //0
console.log([1].reduce( (prev,next) => prev - next ,101), [1].reduce2( (prev,next) => prev - next ,101));  //100
console.log([1,1].reduce( (prev,next) => prev - next ,101), [1,1].reduce2( (prev,next) => prev - next ,101));  //99
try{
    console.log([].reduce( (prev,next) => prev + next));   //Array cannot be empty
}catch (exc){
    console.log(exc.message);
}
try{
    console.log([].reduce2( (prev,next) => prev + next));   //Array cannot be empty
}catch (exc){
    console.log(exc.message);
}

var arrN = arr.slice2();
var arrC = arr.slice2();

console.log(arrC.splice2(2),arrC);
console.log(arrN.splice(2),arrN);

arrN = arr.slice2();
arrC = arr.slice2();
console.log(arrC.splice2(2,0,101),arrC);
console.log(arrN.splice(2,0,101),arrN);

arrN = arr.slice2();
arrC = arr.slice2();
console.log(arrC.splice2(-2),arrC);
console.log(arrN.splice(-2),arrN);

arrN = arr.slice2();
arrC = arr.slice2();
console.log(arrC.splice2(-32,3),arrC);
console.log(arrN.splice(-32,3),arrN);

arrN = arr.slice2();
arrC = arr.slice2();
console.log(arrC.splice2(1,4,101,102),arrC);
console.log(arrN.splice(1,4,101,102),arrN);
console.log(arrC.splice2(5,1,103),arrC);
console.log(arrN.splice(5,1,103),arrN);