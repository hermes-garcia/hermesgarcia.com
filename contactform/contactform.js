jQuery(document).ready(function($) {
    "use strict";

    $('form.contactForm').submit(function() {
        let form = $(this).find('.form-group'),
            formError = false,
            emailExpression = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i,
            sendStr = '',
            action = '',
            thisForm = $(this);

        form.children('input').each(function() {
            let limit,
                i = $(this),
                rule = i.attr('data-rule');
            if (rule !== undefined) {
                let infoError = false,
                    pos = rule.indexOf(':', 0),
                    lengthError = false;
                if (pos >= 0) {
                    limit = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }
                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            formError = infoError = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(limit)) {
                            formError = infoError = true;
                        }
                        break;

                    case 'email':
                        if (!emailExpression.test(i.val())) {
                            formError = infoError = true;
                        }
                        break;

                    case 'checked':
                        if (! i.is(':checked')) {
                            formError = infoError = true;
                        }
                        break;

                    case 'regexp':
                        limit = new RegExp(limit);
                        if (!limit.test(i.val())) {
                            formError = infoError = true;
                        }
                        break;
                }
                if (i.val().length > 50) {
                    formError = lengthError = true;
                }
                if(lengthError){
                    i.next('.validation').html((lengthError ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error') : '')).show('blind');
                }else if(infoError){
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).show('blind');
                }else{
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });

        form.children('textarea').each(function() {
            let i = $(this),
                rule = i.attr('data-rule');

            if (rule !== undefined) {
                let infoError = false,
                    lengthError = false;
                if (i.val() === '') {
                    formError = infoError = true;
                }else if (i.val().length > 256) {
                    formError = lengthError = true;
                }
                if(lengthError){
                    i.next('.validation').html((lengthError ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error') : '')).show('blind');
                }else if(infoError){
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).show('blind');
                }else{
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });
        thisForm.find('#sendmessage').slideUp();
        thisForm.find('#errormessage').slideUp();
        thisForm.find('.loading').slideUp();
        if (formError) return false;
        else sendStr = $(this).serialize();
        action = $(this).attr('action');
        if( ! action ) {
            action = 'contactform/contactform.php';
        }
        thisForm = $(this);
        if( ! action ) {
            thisForm.find('#errormessage').slideDown().html('Error!');
            return false;
        }
        thisForm.find('.button-send').hide();
        thisForm.find('.loading').slideDown();
        $.ajax({
            type: "POST",
            url: action,
            data: sendStr,
            success: function(msg) {
                if (msg === 'OK') {
                    thisForm.find('.loading').slideUp();
                    thisForm.find('#sendmessage').slideDown();
                    thisForm.find("input:not(input[type=submit]), textarea").val('');
                } else {
                    thisForm.find('.loading').slideUp();
                    thisForm.find('#errormessage').slideDown().html(msg);
                }
                thisForm.find('.button-send').slideDown();
            }
        });
        return false;
    });
});
