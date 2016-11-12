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
        if(index in this && filter(this[index],index,this))
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
            result[result.length]=callback(this[index],index,this);
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
        if(this[index] !== undefined)
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
    var result;

    if(initialValue){
        result = initialValue;
    }else{
        arrayValidator(this);
        result = 0;
    }

    for (var index = 0; index < this.length; index++) {
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
    var start = getRealPosition(start,this.length,0),
        result = this.slice2(start, start + deleteCount),
        left = this.slice2(start + result.length);

    this.length = start;

    for(let index = 2; index < arguments.length; index++)
    {
        this[this.length]=arguments[index];
    }
    for(let item of left)
    {
        if(item !== undefined)
        {
            this[this.length] = item;
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
        throw new Error('Array cannot be empty');
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

let arr = [1,,2,3,,4,5,6];

arr.forEach2(element=>console.log(element));    // 1 2 3 4 5 6

let greaterThan2 = arr.filter2(element => greaterThan(2,element));

let mul2 = arr.map2(element=>element*2);

console.log(greaterThan2, mul2);    // [ 3, 4, 5, 6] [ 2, 4, 6, 8, 10, 12 ]

console.log(mul2.slice2());         // [ 2, 4, 6, 8, 10, 12 ]
console.log(mul2.slice2(3));        // [ 8, 10, 12 ]
console.log(mul2.slice2(2,-1));     // [ 6, 8, 10]
console.log(mul2.slice2(5,6));      // [12]
console.log(arr.slice2(-111,56));   // [ 1, , 2, 3, , 4, 5, 6 ]
console.log(mul2.slice2(-3,-1));    // [ 8, 10]
console.log(mul2.slice2(-4));       // [ 6, 8, 10, 12]

console.log(arr.reduce2( (prev,next) => prev + next ));     //21
console.log(arr.reduce2( (prev,next) => prev - next ,101)); //80
console.log([].reduce2( (prev,next) => prev - next ,101));  //101
try{
    console.log([].reduce2( (prev,next) => prev + next));   //Array cannot be empty
}catch (exc){
    console.log(exc.message);
}
var spl = mul2.slice2();
console.log(arr.splice2(-3,2,101,102,103), arr);// [ 4, 5 ] [ 1, , 2, 3, , 101, 102, 103, 6 ]
console.log(mul2.splice2(-113,2,103), mul2);   // [ 2, 4 ] [ 103, 6, 8, 10, 12 ]
console.log(spl.splice2(3,2,103), spl);   // [ 8, 10 ] [ 2, 4, 6, 103, 12 ]