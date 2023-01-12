import { el, setChildren } from "../node_modules/redom/dist/redom.es.js";
import IMask from "../node_modules/imask/dist/imask.js";

const renderCard = () => {
  const creditCard = el('div', { className: 'credit-card' });

  const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
  const cardName = el('span.card__name', 'John Doe');
  const cardDate = el('span.card__date', '04/24');

  setChildren(creditCard, [cardNumber,
    el('div', {className: 'card__personal'}, [cardName, cardDate])]);

  const form = el('form', { action: '#', className: 'form', id: 'form' });

  const inputHolder = el('input.input.input__holder', {type: 'text', maxlength: '20'});
  const wrapperHolder = el('div.form__input-wrap.form__input-wrap_holder',
    [el('label.form__label.form__holder-label', 'Card Holder'),
    inputHolder]);

  const inputNumber = el('input.input.input__number#cardNumber', {placeholder: 'xxxx xxxx xxxx xxxx'});
  const wrapperNumber = el('div.form__input-wrap.form__input-wrap_number',
    [el('label.form__label.form__number-label', 'Card Number'),
    inputNumber]);
  const numberMask = new IMask(inputNumber, {mask: '0000 0000 0000 0000'});

  const inputDate = el('input.input.input__date', {type: 'text', maxlength: '5'});
  const wrapperDate = el('div.form__input-wrap.form__input-wrap_date',
    [el('label.form__label.form__date-label', 'Card Expiry'),
    inputDate]);
  const dateMask = new IMask(inputDate, {mask: '00{/}00', autofix: true});

  const inputCvv = el('input.input.input__cvv', {type: 'text'});
  const wrapperCvv = el('div.form__input-wrap.form__input-wrap_cvv',
    [el('label.form__label.form__cvv-label', 'CVV'),
    inputCvv]);
  const cvvMask = new IMask(inputCvv, {mask: '000', lazy: false});

  const btn = el('button.form__button', 'CHECK OUT');

  setChildren(form, wrapperHolder, wrapperNumber, wrapperDate, wrapperCvv, btn);

  form.addEventListener('input', ({target}) => {
    const value = target.value;

    if (target === inputHolder) {
      target.value = target.value.replace(/[^a-z\s]/i, '');
      cardName.textContent = target.value || 'John Doe';
    }
    else if (target === inputNumber) {
      cardNumber.textContent = value || 'xxxx xxxx xxxx xxxx';
    }
    else if (target === inputDate) {
      cardDate.textContent = value || '04/24';
    };
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!inputHolder.value || !numberMask.masked.isComplete ||
      !dateMask.masked.isComplete || !cvvMask.masked.isComplete) {
      alert('Заполните все данные!');
    }
  });

  return el('div', { className: 'card' }, [el('p', { className: 'secure' }, 'Secure Checkout'), creditCard, form]);
};

setChildren(document.querySelector('.wrapper'), renderCard());
