/**
 *
 * @param {Number} min
 * @param {Number} max
 */
function rand(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

/**
 * @param {document} $d
 * @returns {undefined}
 */
(function ($d){
    $d.addEventListener('DOMContentLoaded',function(){
        /**
         * @type Element
         */
        var container = $d.getElementById('out');
        /**
         * @property {Array} coordinates description
         * @type Object
         */
        var clientCoords = {x:0,y:0};

        Object.defineProperty(clientCoords,'coordinates',{
            enumerable: true,
            configurable: true,
            set:function (coords) {
                this.x = coords[0];
                this.y = coords[1];
            }
        });

        /**
         * @returns {Element}
         */
        function createDraggable()
        {
            /**
             * @type Element
             */
            var result = $d.createElement('div'),
                bgColor = `rgb(${rand(0,255)},${rand(0,255)},${rand(0,255)})`,
                height = rand(50,300),
                width = rand(50,300);
            result.classList.add('draggable');
            result.setAttribute('style',`background-color:${bgColor};width:${width}px;height:${height}px;left:${rand(0,container.clientWidth - width)}px;top:${rand(0,container.clientHeight-height)}px`);
            return result;
        }

        /**
         *
         * @param {MouseEvent} event
         * @returns {undefined}
         */
        function dragging(event)
        {
            let element = $d.querySelector('.picked.draggable');
            let top=parseInt(element.style.top,10) + (event.clientY-clientCoords.y);
            let left=parseInt(element.style.left,10) + (event.clientX-clientCoords.x);
            element.style.top = `${top}px`;
            element.style.left = `${left}px`;
            clientCoords.coordinates=[event.clientX, event.clientY];
        }

        $d.getElementById('clever-button').addEventListener('click',function(){
            var draggable = createDraggable();
            container.appendChild(draggable);
        });

        $d.addEventListener('mousedown',function (event){
            if(event.target.classList.contains('draggable'))
            {
                clientCoords.coordinates=[event.clientX, event.clientY];
                event.target.classList.add('picked');
                $d.addEventListener('mousemove',dragging);
            }
        });

        $d.addEventListener('mouseup',function (event){
            if(event.target.classList.contains('draggable'))
            {
                event.target.classList.remove('picked');
                $d.removeEventListener('mousemove',dragging);
            }
        });
    });
})(document);