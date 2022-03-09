// inputMask
let selector = document.querySelectorAll('input[type=tel]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);


// validate forms
let validateForms = function (selector, rules) {

  new window.JustValidate(selector, {
    rules: rules,
    submitHandler: function (form, values, ajax) {
      var formData = new FormData(form);

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Отправлено!')
          } else {

          }
        }
      }

      // Add any event handlers here...
      xhr.open('POST', "mail.php", true);
      xhr.send(formData);

      form.reset();
    },
  });
}

validateForms('.subscribe-form', {
  email: {
    required: true,
    email: true
  },
  tel: {
    required: true
  }
});
validateForms('.form-footer', {
  email: {
    required: true,
    email: true
  }
});
