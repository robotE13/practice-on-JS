function consoleRec(index,elements)
{
    if(index < elements.length)
    {
        console.log(elements[index]);
        consoleRec(index + 1,elements);
    }
}

consoleRec.bind(null,0)(['I', 'know', 'how', 'to', 'write', 'recursive', 'functions']);