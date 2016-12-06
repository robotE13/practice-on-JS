function closePanel(accordeon)
{
    var activeHeading = accordeon.querySelector('.tabpanel-heading.expanded');

    if(activeHeading !== null)
    {
        var button = activeHeading.querySelector('[role="button"]');

        activeHeading.classList.remove('expanded');
        button.setAttribute('data-expanded','false');
        document.getElementById(button.getAttribute('href').substr(1)).setAttribute('data-expanded','false');
    }
}

document.addEventListener('DOMContentLoaded',function(){
    var accordeon = document.getElementById('accordeon-0');

    accordeon.addEventListener('click',function(event){
        /**
         * @type {Element}
         */
        var heading,panel;

        if (event.target.getAttribute('role') === 'button')
        {
            if(event.target.getAttribute('data-expanded')==='false')
            {
                closePanel(this);
                heading = event.target.parentNode.parentNode;
                heading.classList.add('expanded');
                panel = document.getElementById(event.target.getAttribute('href').substr(1));
                panel.setAttribute('data-expanded','true');
                event.target.setAttribute('data-expanded','true');
            }else{
                closePanel(this);
            }
        }
    });
});

