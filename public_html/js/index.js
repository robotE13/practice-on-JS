function consoleRec(index,elements)
{
    if(index < elements.length)
    {
        console.log(elements[index]);
        consoleRec(index + 1,elements);
        console.log(elements[index]);
    }else{
        console.log('In reverse order:');
    }
}

consoleRec.bind(null,0)(['I', 'know', 'how', 'to', 'write', 'recursive', 'functions']);