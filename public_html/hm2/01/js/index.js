/**
 *
 * @param {Array} arrSource
 * @param {Function} fnFilter
 * @returns {Boolean}
 */
function isAllTypeOf(arrSource,fnFilter)
{
    var result = true;
    try{
        if (arrSource.length === 0)
        {
            throw new Error('Array cannot be empty');
        }
        arrSource.forEach(function(item){
            if(!fnFilter(item))
            {
                return result = false;
            }
        });
    }catch(exc){
        console.log(exc.message);
    }
    return result;
}

/**
 * @syntax Checks that value typeof String
 * @param {mixed} value
 * @returns {Boolean}
 */
function isString(value)
{
    return typeof value === 'string';
}

/**
 * @syntax Checks that value typeof number
 * @param {mixed} value
 * @returns {Boolean}
 */
function isNumber(value)
{
    return typeof value === 'number';
}

var stringsAll = ['test','test','test'], numbersAll = [1,2,3,5,6,7,7], mixedValues = [1,'test','test',2];

console.log(isAllTypeOf(stringsAll,isString));//true

console.log(isAllTypeOf(12,isString));//exception

console.log(isAllTypeOf([],isString));//exception

console.log(isAllTypeOf(numbersAll,isString));//false

console.log(isAllTypeOf(mixedValues,isString));//false

console.log(isAllTypeOf(numbersAll,isNumber));//true


