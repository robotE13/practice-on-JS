"use strict";

/**
 *
 * @param {Element} element
 * @returns {undefined}
 */
function deleteTextNodes(element)
{
    for(let child of element.childNodes)
    {
        if(child.nodeType === 3)
        {
            child.remove();
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

        console.info(container.textContent);

        deleteTextNodes(container);
        console.info(container.textContent);

        deleteTextNodes($.getElementById('sub-container'));
        console.info(container.textContent);
    });
})(document);