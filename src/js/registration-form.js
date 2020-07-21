'use strict';

module.exports = {
    tabLinkClick: function(event)
    {
        var target = event.target;
        var tabList = target.parentElement.parentElement;
        var tabs = tabList.querySelectorAll('.tab');
        tabs.forEach(function(tab) {
            var tabLink = tab.querySelector('.tab__link');
            var page = document.getElementById(
                tabLink.href.split('#')[1]
            );
            if (tabLink==target)
            {
                tab.classList.add('tab--active');
                page.classList.add('page--active');
            }
            else
            {
                tab.classList.remove('tab--active');
                page.classList.remove('page--active');
            }
        });
        return false;
    },
    checkboxClick: function(event)
    {
        var target = event.target;
        if (target.classList.contains('checkbox'))
        {
            var checkbox = target.getElementsByTagName('INPUT')[0];
            checkbox.checked = !checkbox.checked;
        }
    },
    radioGroupItemClick: function(event)
    {
        var target = event.target;
        if (target.classList.contains('radio-group__item'))
        {
            var radioInput = target.getElementsByTagName('INPUT')[0];
            radioInput.checked = true;
        }
    },
    checkError: function(event, validate, fieldName)
    {
        var target = event.target;
        var value = target.value;
        var fieldError = target.parentNode.querySelector('.field__error');
        if (!validate.call(this, value))
        {
            fieldError.innerHTML = fieldName + ' not valid';
            fieldError.classList.add('field__error--active');
            target.classList.add('text-input--error');
        }
        else
        {
            fieldError.classList.remove('field__error--active');
            target.classList.remove('text-input--error');
        }
    },
    checkEmail: function(event)
    {
        this.checkError(event, this.validateEmail, 'Email');
    },
    checkMobile: function(event)
    {
        this.checkError(event, this.validateMobile, 'Mobile');
    },
    validateMobile: function(mobile)
    {
        return /(^\(\+([0-9]{1,3}|[0-9] [0-9]{3})\)|^\+([0-9]{1,3}|[0-9] [0-9]{3}))\s*[0-9]{1,3}\s*[0-9]{3,4}\s*[0-9]{3,6}/.test(mobile);
    },
    validateEmail: function(email)
    {
        return email.indexOf('@')!=-1
            && email.split('@').map(function(part) { return part.length; })
                .indexOf(0)==-1;
    },
    submitButtonClick: function(event)
    {
        var form = event.target.parentNode;
        var loading = form.querySelector('.loading');
        var registrationError = form.querySelector('.registration-error');

        var inputMobile = form.querySelector('#mobile');
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputMobile.dispatchEvent(event);
        var inputEmail = form.querySelector('#email');
        event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputEmail.dispatchEvent(event);

        if (form.querySelectorAll('.radio-group input:checked').length==0
            || form.querySelectorAll('#terms:checked').length==0
            || form.querySelectorAll('.page--active .field__error--active').length>0)
        {
            registrationError.classList.add('registration-error--active');
            registrationError.innerHTML = 'You must first fill out the form';
            return false;
        }

        registrationError.classList.remove('registration-error--active');
        loading.classList.add('loading--active');

        setTimeout(function() {
            loading.classList.remove('loading--active');
            if (Math.round(Math.random()*100)<25)
            {
                registrationError.classList.add('registration-error--active');
                registrationError.innerHTML = 'There was an error during registration.';
            }
            else
            {
                var registrationSuccess = form.querySelector('.registration-success');
                registrationError.innerHTML = '';
                registrationSuccess.classList.add('registration-success--active');
            }
        }, 2000+Math.round(Math.random()*3000));
        return false;
    },
    loginButtonClick: function()
    {
        window.location.href = '/login';
    },
};

