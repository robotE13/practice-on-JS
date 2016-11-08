function consoleOut(elements)
{
    var index = 0;
    function consoleRec()
    {
        console.log(elements[index++]);
        if(index < elements.length)
        {
            consoleRec();
        }else{
            console.log('Reverse :');
            index = index - 1;
        }
        console.log(elements[index--]);
    }
    consoleRec();
}

consoleOut(['I', 'know', 'how', 'to', 'write', 'recursive', 'functions']);

function sum (a) {
    var result = a;

    nextCall.valueOf=function(){
        return result;
    };
    nextCall.toString=function(){
        return result;
    };

    function nextCall(a1){
        result = result + a1;
        return nextCall;
    };

    return nextCall;
};
var res = sum(1)(2)(3)(4)(5).valueOf();
console.log(res);
//alert(sum(1)(2)(3)(4));