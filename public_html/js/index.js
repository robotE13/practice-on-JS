(function (){
    var index = 0;
    function consoleRec(elements)
    {
        console.log(elements[index++]);
        if(index < elements.length)
        {
            consoleRec(elements);
        }else{
            console.log('In reverse order:');
            index--;
        }
        console.log(elements[index--]);
    }

    consoleRec(['I', 'know', 'how', 'to', 'write', 'recursive', 'functions']);
})();