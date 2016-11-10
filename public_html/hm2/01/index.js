/**
 *
 * @param {Array} arrSource
 * @param {Function} fnFilter
 * @returns {Boolean} The result of applying a filter.
 */
function isAllTypeOf(arrSource,fnFilter)
{
    var index = 0;

    arrayValidator(arrSource);
    for(index = 0; index < arrSource.length; index++)
    {
        if(!fnFilter(arrSource[index]))
        {
            return false;
        }
    }
    return true;
}

/**
 * Checks that value typeof string.
 * @param {mixed} value
 * @returns {Boolean}
 */
function isString(value)
{
    return typeof value === 'string';
}

/**
 * Checks that value typeof number.
 * @param {mixed} value
 * @returns {Boolean}
 */
function isNumber(value)
{
    return typeof value === 'number';
}

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
    }else if (source.length === 0)
    {
        throw new Error('Array cannot be empty');
    }
}

/**
 *
 * @param {Function} fn
 * @returns {undefined}
 */
function safeCall(fn)
{
    try{
        console.log(fn());
    }catch(exc){
        console.log(exc.message);
    };
}

var stringsAll = ['test','test','test'], numbersAll = [1,2,3,5,6,7,7], mixedValues = [1,'test','test',2];

safeCall(function(){return isAllTypeOf(stringsAll,isString);});                     //true

safeCall(function(){return isAllTypeOf(12,isNumber);});                             //The argument is not an array

safeCall(function(){return isAllTypeOf(function(){var i=12;return i;},isNumber);}); //The argument is not an array

safeCall(function(){return isAllTypeOf([],isString);});                             //Array cannot be empty

safeCall(function(){return isAllTypeOf(numbersAll,isString);});                     //false

safeCall(function(){return isAllTypeOf(mixedValues,isString);});                    //false

safeCall(function(){return isAllTypeOf(numbersAll,isNumber);});                     //true