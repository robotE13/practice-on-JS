function documentRec(index,elements){
    if(index < elements.length)
    {
        console.log(elements[index]);
        document.getElementById('out').appendChild(document.createTextNode(elements[index]));
        document.getElementById('out').appendChild(document.createElement('br'));
        documentRec(index + 1,elements);
    }
}

document.addEventListener('DOMContentLoaded',function(){
    documentRec.bind(null,0)(['Я','умею','писать','рекурсивные','функции']);
});