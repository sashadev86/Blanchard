new JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      }
    }
  },

  colorWrong: '#D11616',

  messages: {
    name: "Как вас зовут?",
    tel: {
      required: "Укажите ваш телефон",
      function: "Не достаточно количество символов"
    }
  }
});
