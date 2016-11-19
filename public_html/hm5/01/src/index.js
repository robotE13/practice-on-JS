function closePanel()
{
    var activeHeading = document.querySelector('.tabpanel-heading.expanded');
    if(activeHeading !== null)
    {
        var button = activeHeading.querySelector('[role="button"]');
                    
        activeHeading.classList.remove('expanded');
        button.setAttribute('data-expanded','false');
        document.getElementById(button.getAttribute('href').substr(1)).setAttribute('data-expanded','false');
    }
}

document.addEventListener('DOMContentLoaded',function(){
    var buttons = document.querySelectorAll('.tabpanel-heading [role="button"]');
    
    for(var idx = 0;idx < buttons.length;idx++)
    {
        var elem = buttons[idx];
        
        elem.addEventListener('click',function(e){
            var id = this.getAttribute('href').substr(1);
            e.preventDefault();
            if(this.dataset.expanded==='false'){
                closePanel();                
                document.getElementById(id).setAttribute('data-expanded','true');
                this.setAttribute('data-expanded','true');
            }else{
                e.stopPropagation();
            }
        });
        
        elem.parentNode.parentNode.addEventListener('click',function(e){
            e.stopPropagation();
            this.classList.add('expanded');
        });
    }
});

