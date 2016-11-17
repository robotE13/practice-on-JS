"use strict";

/**
 *
 * @returns {scanDOM.result}
 */
function scanDOM()
{
    /**
     *
     * @type result
     */
    var result={
        tags:{},
        classes:{},
        textNodes:0,
        /**
         *
         * @param {String} kind
         * @param {String} name
         * @returns {undefined}
         */
        addInfo(kind, name)
        {
            if(name in this[kind])
            {
                this[kind][name]++;
            }else{
                this[kind][name]=1;
            }
        },
        /**
         *
         * @param {DOMTokenList} classList
         * @returns {undefined}
         */
        addClassList(classList)
        {
            for(let className of classList)
            {
                this.addInfo('classes',className);
            }
        }
    };
    /**
     *
     * @param {Node} node
     * @returns {undefined}
     */
    function scanRecursive(node)
    {
        for (let child of node.childNodes)
        {
            if(child.nodeType == Node.ELEMENT_NODE)
            {
                result.addInfo('tags',child.tagName);
                result.addClassList(child.classList);
                scanRecursive(child);
            }
            if(child.nodeType == Node.TEXT_NODE)
            {
                result.textNodes++;
            }
        }
    }
    scanRecursive(document.querySelector('html'));
    return result;
}

document.addEventListener('DOMContentLoaded',function(){
    var result = scanDOM();
    var list = document.createElement('ul');

    document.querySelector('body').appendChild(list);

    for(let key of Object.keys(result.tags))
    {
        let li = document.createElement('li');
        li.innerHTML = `Тегов ${key}: ${result.tags[key]}`;
        list.appendChild(li);
    }
    for(let key of Object.keys(result.classes))
    {
        let li = document.createElement('li');
        li.innerHTML = `Элементов с классом ${key}: ${result.classes[key]}`;
        list.appendChild(li);
    }
    let li = document.createElement('li');
    li.innerHTML = `Текстовых блоков: ${result.textNodes}`;
    list.appendChild(li);
});