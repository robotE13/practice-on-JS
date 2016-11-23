function getJSON(url) {
    return new Promise(function (success,error){
        var ajax = new XMLHttpRequest();
        ajax.open('GET',url,true);
        ajax.responseType = 'json';
        ajax.addEventListener('load',function () {
            success(ajax);
        });
        ajax.send();
    });
}

/**
 *
 * @param {String} textContent
 * @param {Element} container
 * @returns {undefined}
 */
function addData(textContent,container)
{
    let li = document.createElement('li');
    li.textContent = textContent;
    container.appendChild(li);
}

/**
 *
 * @param {Array} array array of objects
 * @returns {Array}
 */
function sort(array)
{
    let sequence = getSequence(array.length);
    for (let index = 0; index < sequence.length; index++)//на проход по последовательности шагов
    {
        console.group(`step ${index}`);
        for (var step = sequence[index], i=step; i < array.length; i++)
        {
            var temp = array[i], j;
            for (j = i-step; (j >= 0) && (array[j].name > temp.name); j-=step)
            {
                array[j+step] = array[j];
            }
            array[j+step] = temp;
        }
        console.groupEnd();
    }
    return array;
}

function getSequence(length) {
    let sequence = [1750,701,301,132,57,23,10,4,1],
        index = sequence.length - 1,
        middle = Math.ceil(length/2);
    while (sequence[index] < middle) {
        index--;
    }
    return sequence.slice(index);
}

document.addEventListener('DOMContentLoaded',function (){
    getJSON('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(function (result) {
            let container = document.getElementById('out');
            for (let city of sort(result.response)) {
                addData(city.name,container);
            }
        });
});