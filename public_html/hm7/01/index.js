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

var table = document.createElement('table'),
    tr = table.appendChild(createElement('tr')),
    container = document.getElementById('out');

tr.appendChild(createElement('th','Cookie name'));
tr.appendChild(createElement('th','Cookie value'));
for (let cookie  of document.cookie.split('; '))
{
    let tr = table.appendChild(createElement('tr'));
    cookie = cookie.split('=');
    for (let item of cookie)
    {
        tr.appendChild(createElement('td',item));
    }
    tr.id = `row-key-${cookie[0]}`;
    table.appendChild(tr);
}
container.appendChild(table);