"use strict";

/**
 *
 * @param {Element} element
 * @returns {undefined}
 */
function deleteTextNodes(element)
{
    var index = 0, children = element.childNodes;

    while(index < children.length)
    {
        if(children[index].nodeType === Node.TEXT_NODE)
        {
            element.removeChild(children[index]);
        }else if(children[index].nodeType === Node.ELEMENT_NODE){
            deleteTextNodes(children[index++]);
        }else{
            index++;
        }
    }
}

/**
 *
 * @param {Document} $
 * @returns {undefined}
 */
(function($){
    $.addEventListener("DOMContentLoaded",function(){
        var container = $.getElementById('main-container');

        $.getElementById("clever-btn").addEventListener("click",function(){
            console.info(container.textContent);
            deleteTextNodes(container);
            console.info(container.textContent);
        });
    });
})(document);