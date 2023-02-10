import isValid from "./validation.js";

describe('Проверка валидации для имени', () => {
  const others = {
    number: '8888888888888888',
    code: '111'
  };

  it('Валидатор работает правильно с корректным именем', () => {
    expect(isValid({name: 'john boss', ...others})).toBe(true);
    expect(isValid({name: 'John Boss', ...others})).toBe(true);
  })

  it('Валидатор работает правильно с некорректным именем', () => {
    expect(isValid({name: 'word', ...others})).toBe(false);
    expect(isValid({name: 'два слова', ...others})).toBe(false);
    expect(isValid({name: 'слово ц232фра', ...others})).toBe(false);
  })
});

describe('Проверка валидации для номера', () => {
  const others = {
    name: 'some human',
    code: '111'
  };

  it('Валидатор работает правильно с корректным номером', () => {
    expect(isValid({number: '8888342384569385', ...others})).toBe(true);
  })

  it('Валидатор работает правильно с некорректным номером', () => {
    expect(isValid({number: '888834238456938б', ...others})).toBe(false);
    expect(isValid({number: '888834238456938z', ...others})).toBe(false);
    expect(isValid({number: '888834.238456938', ...others})).toBe(false);
    expect(isValid({number: '888834', ...others})).toBe(false);
    expect(isValid({number: '123412341234123412', ...others})).toBe(false);
  })
});

describe('Проверка валидации для CVV/CVC', () => {
  const others = {
    name: 'some human',
    number: '8888342384569385'
  };

  it('Валидатор работает правильно с корректным кодом безопасности', () => {
    expect(isValid({code: '123', ...others})).toBe(true);
    expect(isValid({code: '1234', ...others})).toBe(true);
  })

  it('Валидатор работает правильно с некорректным кодом безопасности', () => {
    expect(isValid({code: '12', ...others})).toBe(false);
    expect(isValid({code: '12345', ...others})).toBe(false);
    expect(isValid({code: '123z', ...others})).toBe(false);
    expect(isValid({code: '123б', ...others})).toBe(false);
    expect(isValid({code: '1.23', ...others})).toBe(false);
  })
});
