/**
 * TODO надо бы добавить валидатор isAllTypeOf из предыдущего задания
 * @param {number} firstNumber
 * @returns {calculator.calc}
 */
function calculator(firstNumber)
{
    var start = firstNumber,
    /**
     * Я знаю о forEach(), но пришлось писать его самому, раз уж нелья методы работы с массивами использовать.
     * @param {Array} args
     * @param {Function} callbackFn
     * @returns {Number}
     */
    iterator = function(args,callbackFn){
        var result = start,
            index;
        try {
            for (index = 0; index < args.length;index++)
            {
                result = callbackFn(result,args[index]);
            }
        } catch (exc){
            result = exc.message;
        }
        return result;
    },
    /**
     *
     * @type type
     */
    calc = {
        /**
         * @syntax obj.sum(operand1[,operand2[,...operandN]])
         * @returns {Number|String} result of addition or error message
         */
        sum : function(){
            return iterator(arguments,function(start,val){
                return  start + val;
            });
        },
        /**
         * @syntax obj.div(operand1[,operand2[,...operandN]])
         * @returns {Number|String} result of the division or error message
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
         * @returns {Number|String} result of the multiplication or error message
         */
        mul : function(){
            return iterator(arguments,function(start,val){
                return  start * val;
            });
        },
        /**
         * @syntax obj.sub(operand1[,operand2[,...operandN]])
         * @returns {Number|String} result of the subtraction or error message
         */
        sub : function(){
            return iterator(arguments,function(start,val){
                return  start - val;
            });
        }
    };

    return calc;
}

var calculatorOne = calculator(100);

console.log(calculatorOne.sum(0,12,1));//   113
console.log(calculatorOne.sum(12,12));//    124
console.log(calculatorOne.div(2,2,2));//    12.5
console.log(calculatorOne.div(2,0,2));//    Division by zero
console.log(calculatorOne.mul(2,2,0.5));//  200
console.log(calculatorOne.sub(2,2,2,0));//  94