document.cookie = `cookie1=value1;path=/;expires=${new Date(2018,0,1).toGMTString()}`;
document.cookie = "cookie2=value2;path=/";
document.cookie = "cookie3=value3;path=/";
document.cookie = "cookie4=value4;path=/";
document.cookie = `cookie4=value4;path=/;expires=${new Date(2015,0,1).toGMTString()}`;

function createElement(tag,textContent = null) {
    let element = document.createElement(tag);
    element.textContent=textContent;
    return element;
};

var container = document.getElementById('out'),

    formView = {
        element:null,
        update:function (model) {
            for (var attribute in model) {
                let input = this.element.elements[attribute],
                    formGroup = input.parentElement,
                    helpBlock = formGroup.querySelector('.help-block');

                input.value = model[attribute];
                if(model.errors[attribute])
                {
                    formGroup.classList.add('error');
                    helpBlock.textContent = model.errors[attribute];
                }else{
                    formGroup.classList.remove('error');
                    helpBlock.textContent = '';
                }
            }
        }
    },

    tableView = {
        element:null,
        init:function () {
            this.element = document.createElement('table');
            return this;
        },

        saveRow: function (cellTag,rowKey,...cellContent)
        {
            let tr = createElement('tr'),
                oldTr = document.getElementById(rowKey);
            tr.id = rowKey;
            cellContent.forEach(content=>tr.appendChild(createElement(cellTag,content)));
            if(oldTr)
            {
                this.element.replaceChild(tr,oldTr);
            }else{
                this.element.appendChild(tr);
            }
        }
    },

    cookieModel = {
        name:null,
        value:null,
        expired_in:null,
        errors:{},
        load:function (formElements) {
            for (var property of Object.keys(this))
            {
                this[property] = formElements[property].value;
            }
        },
        /**
         * @returns {Boolean}
         */
        hasErrors:function() {
            return Object.keys(this.errors).length !== 0;
        },
        reset:function(){
            this.errors={};
            this.name = this.value = this.expired_in = null;
        },
        /**
         * Validate and save cookie.
         * @returns {Boolean}
         */
        save:function()
        {
            this.errors = {};
            for (var item in this)
            {
                if(!this[item])
                    this.errors[item]="Поле должно быть заполнено";
            }
            if(!this.hasErrors())
            {
                let expired = new Date();
                expired.setDate(expired.getDate() + parseInt(this.expired_in,10));
                document.cookie=`${this.name}=${this.value};path=/;expires=${expired.toGMTString()}`;
            }
            return !this.hasErrors();
        }
    };

    Object.defineProperties(cookieModel,{
        errors:{enumerable:false},
        load:{enumerable:false},
        hasErrors:{enumerable:false},
        save:{enumerable:false},
        reset:{enumerable:false}
    });

    tableView.init();
    tableView.saveRow('th','row-key-header','Cookie name','Cookie value');

    for (let cookie  of document.cookie.split('; '))
    {
        cookie = cookie.split('=');
        tableView.saveRow('td',`row-key-${cookie[0]}`,cookie[0],cookie[1]);
    }
    container.appendChild(tableView.element);

document.querySelector('body').addEventListener('click',function (event){
    if(event.target.tagName === 'BUTTON')
    {
        event.preventDefault();
        do{
            formView.element = event.target.parentElement;
        }while (formView.element && formView.element.tagName !== "FORM");

        cookieModel.load(formView.element.elements);
        if(cookieModel.save())
        {
            tableView.saveRow('td',`row-key-${cookieModel.name}`,cookieModel.name,cookieModel.value);
            cookieModel.reset();
        }
        formView.update(cookieModel);
    }
});