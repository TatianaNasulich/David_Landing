(function () {

    var form = document.querySelector('.form');
    var validateBtn = document.getElementById('submit');
    var fields = document.querySelectorAll('.form_input');



    var isNumber = function(number){
        var num = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
        return num.test(number);
    };


    var isEmail = function(email){
        var reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/;
        return reg.test(email);
    };

    var isName = function(name){
         var text =/^[a-zA-Zа-яА-Я]+$/ui;
        return text.test(name);
    };

    var generateError = function (text) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error
    };

    var removeValidation = function () {
        var errors = form.querySelectorAll('.error');

        for (var i = 0; i < errors.length; i++) {
            errors[i].remove()
        }
    };

    var checkValidationFilds = function(){

        for (var i = 0; i < fields.length; i++) {

            if (!fields[i].value) {
                var error = generateError('Cant be blank');
                form[i].parentElement.insertBefore(error, fields[i])
            }

            else if (fields[i].hasAttribute("data-name")){
                if(!isName(fields[i].value)) {
                    var error = generateError('Wrong enter letters');
                    form[i].parentElement.insertBefore(error, fields[i])
                }
            }

            else if(fields[i].hasAttribute("data-email")){
                if(!isEmail(fields[i].value)){
                    var error = generateError('Wrong email');
                    form[i].parentElement.insertBefore(error, fields[i])
                }
            }

            else if(fields[i].hasAttribute("data-number")){
                if(!isNumber(fields[i].value)){
                    var error = generateError(' Wrong phone number');
                    form[i].parentElement.insertBefore(error, fields[i])
                }

            }


        }

    }

    form.addEventListener('submit', function () {
        event.preventDefault();

        removeValidation();

        checkValidationFilds();

    })

}());