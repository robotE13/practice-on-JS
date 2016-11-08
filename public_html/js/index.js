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
    var summa = a;

    sumFn.valueOf=function(){
        return summa;
    };
    sumFn.toString=function(){
        return summa;
    };

    function sumFn(a1){
        summa = summa + a1;
        return sumFn;
    };

    return sumFn;
};
console.log(sum(1)(2)(3)(4));
//alert(sum(1)(2)(3)(4));