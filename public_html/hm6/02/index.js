/**
 *
 * @param {String} url
 * @returns {Promise}
 */
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

/**
 * Function returns the sequence of increments for sorting.
 * @param {Number} length of the array to be sorted
 * @returns {Array}
 */
function getSequence(length) {
    let sequence = [1750,701,301,132,57,23,10,4,1],
        index = sequence.length,
        middle = Math.floor(length/2);
    do{
        index--;
    }
    while (index !== -1 && sequence[index] < middle)
    return sequence.slice(index + 1);
}

document.addEventListener('DOMContentLoaded',function (){
    var filter = {
        /**
         * @type Element
         */
        filterInput:null,
        /**
         * @type Array
         */
        allData:[],
        /**
         *
         * @param {Element} filterInput
         * @param {Array} data
         * @returns {undefined}
         */
        init:function (filterInput,data)
        {
            var filter = this;
            this.filterInput = filterInput;
            this.allData = data;
            listManager.displayData(this.allData);

            this.filterInput.addEventListener('input',function () {
                filter.trigger().then(function () {
                    listManager.displayData(filter.apply());
                });
            });
        },

        /**
         *
         * @returns {Array}
         */
        apply:function ()
        {
            let filterValue = this.filterInput.value;
            return this.allData.filter(item => item.indexOf(filterValue) !== -1);
        },
        /**
         *
         * @returns {Promise}
         */
        trigger:function ()
        {
            var filter = this;
            return new Promise(function (resolve,reject){
                setTimeout(function () {
                    if(filter.filterInput.value.length > 2 || filter.filterInput.value.length === 0)
                    {
                        resolve();
                    }else{
                        reject();
                    }
                },2500);
                filter.filterInput.addEventListener('input',function () {
                    reject();
                });
            });
        }
    },
    listManager = {
        /**
         * @type Element
         */
        container:document.getElementById('out'),
        /**
         *
         * @param {Array} data
         * @returns {undefined}
         */
        displayData : function(data)
        {
            let before;

            this.removeOld(data);
            before = this.container.firstElementChild;

            for (let index = 0; index < data.length; index++)
            {
                if(before && data[index] === before.textContent)
                {
                    before = before.nextElementSibling;
                }else{
                    this.addListElement(data[index],before);
                }
            }
        },
        removeOld : function(data)
        {
            for(let index = 0; index < this.container.children.length;index++){
                let element = this.container.children[index];
                if(data.indexOf(element.textContent) === -1)
                {
                    this.container.removeChild(element);
                    index--;
                }
            }
        },

        /**
         *
         * @param {String} textContent
         * @param {Element} before description
         * @returns {undefined}
         */
        addListElement:function (textContent,before = null)
        {
            let li = document.createElement('li');
            li.textContent = textContent;
            this.container.insertBefore(li,before);
        }
    };

    getJSON('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(function (result) {
            filter.init(document.getElementById('filter'),sort(result.response).map(item=>item.name));
        });
});