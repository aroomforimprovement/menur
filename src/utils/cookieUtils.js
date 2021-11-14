
const setCookie = (name, value, days) => {
    var expires = "";
    if(days){
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    ca.forEach((c) => {
        while(c.charAt(0) === ' '){
            c = c.substring(1, c.length);
        }
        if(c.indexOf(nameEQ === 0)){
            return c.substring(nameEQ.length, c.length);
        }
    });
    return null;
}

const eraseCookie = (name) => {
    document.cookie = name += '=; Path=/; Expires=Thu, 01'
}