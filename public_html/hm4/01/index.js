"use strict";

/**
 * prepend inserts the second element at the beginning of the container.
 * @syntax prepend(container,element);
 * @param {Node} container
 * @param {Node} element
 * @returns {Node}
 */
function prepend(container,element)
{
    return container.insertBefore(element,container.firstElementChild);
}

document.addEventListener("DOMContentLoaded",function(){
    var clever = document.getElementById("clever-btn"),
        mainContainer = document.getElementById("main-container");

    clever.addEventListener("click",function(){
        prepend(mainContainer,mainContainer.lastElementChild);
    });
});