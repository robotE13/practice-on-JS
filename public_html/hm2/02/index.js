/**
 *
 * @param {Array} arrSource
 * @param {Function} fnFilter
 * @returns {Boolean|String} The result of applying a filter or the text of the error.
 */
function isSomeTypeOf(arrSource,fnFilter)
{
    var result = false;
    var index = 0;
    try{
        arrayValidator(arrSource);
        do{
            if(fnFilter(arrSource[index]))
            {
                result = true;
            }
            index++;
        }while(index < arrSource.length && !result);
    }catch(exc){
        result = exc.message;
    }
    return result;
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
 * @param {array|undefined} source
 * @returns {undefined}
 */
function arrayValidator(source)
{
    if (source.length === 0)
    {
        throw new Error('Array cannot be empty');
    }else if(source.length === undefined)
    {
        throw new Error('The argument is not an array');
    }
}

var stringsAll = ['test','test','test'], numbersAll = [1,2,3,5,6,7,7], mixedValues = [1,'test','test',2];

console.log(isSomeTypeOf(12,isNumber));//exception

console.log(isSomeTypeOf([],isString));//exception

console.log(isSomeTypeOf(stringsAll,isString));//true

console.log(isSomeTypeOf(numbersAll,isString));//false

console.log(isSomeTypeOf(mixedValues,isString));//true

console.log(isSomeTypeOf(mixedValues,isNumber));//true

console.log(isSomeTypeOf(numbersAll,isNumber));//true



