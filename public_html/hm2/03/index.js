/**
 * TODO надо бы добавить валидатор isAllTypeOf из предыдущего задания
 * @param {number} firstNumber
 * @returns {calculator.calc}
 */
function calculator(firstNumber)
{
    /**
     * Я знаю о forEach(), но пришлось писать его самому, раз уж нелья методы работы с массивами использовать.
     * @param {Array} args
     * @param {Function} callbackFn
     * @returns {Number}
     */
    iterator = function(args,callbackFn){
        var result = firstNumber, index;
        for (index = 0; index < args.length;index++)
        {
            result = callbackFn(result,args[index]);
        }
        return result;
    },
    /**
     * @type {Object}
     */
    calc = {
        /**
         * @syntax obj.sum(operand1[,operand2[,...operandN]])
         * @returns {Number} result of addition
         */
        sum : function(){
            return iterator(arguments,function(start,val){
                return  start + val;
            });
        },
        /**
         * @syntax obj.div(operand1[,operand2[,...operandN]])
         * @throws {Error} division by zero error
         * @returns {Number} result of the division
         */
        div : function(){
            return iterator(arguments,function(start,val){
                if(val === 0){
                    throw new Error('Division by zero');
                }
                return  start / val;
            });
        },
        /**
         * @syntax obj.mul(operand1[,operand2[,...operandN]])
         * @returns {Number} result of the multiplication
         */
        mul : function(){
            return iterator(arguments,function(start,val){
                return  start * val;
            });
        },
        /**
         * @syntax obj.sub(operand1[,operand2[,...operandN]])
         * @returns {Number} result of the subtraction
         */
        sub : function(){
            return iterator(arguments,function(start,val){
                return  start - val;
            });
        }
    };

    return calc;
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

var calculatorOne = calculator(100);

console.log(calculatorOne.sum(0,12,1));//   113

console.log(calculatorOne.sum(12,12));//    124

safeCall(function(){return calculatorOne.div(2,2,2);});//    12.5

safeCall(function(){return calculatorOne.div(2,0,2);});//    Division by zero

console.log(calculatorOne.mul(2,2,0.5));//  200

console.log(calculatorOne.sub(2,2,2,0));//  94