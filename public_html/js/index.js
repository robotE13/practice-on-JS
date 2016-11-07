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