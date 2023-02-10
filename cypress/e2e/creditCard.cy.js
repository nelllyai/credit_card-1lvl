describe('Тест проверки карты', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234');
  });

  it ('Ввод корректной информации о карте', () => {
    cy.get('.input__holder').type('My Name');
    cy.get('.input__number').type('1234123412341234');
    cy.get('.input__date').type('0425');
    cy.get('.input__cvv').type('389');
    cy.get('form').get('button').click();
    cy.get('.secure-wrapper').should('contain.text', 'Данные корректны');
  });

  it ('Ввод некорректного имени', () => {
    cy.get('.input__holder').type('имя');
    cy.get('.input__number').type('1234123412341234');
    cy.get('.input__date').type('0425');
    cy.get('.input__cvv').type('389');
    cy.get('form').get('button').click();
    cy.get('.secure-wrapper').should('contain.text', 'Данные не валидны!');
  });

  it ('Ввод некорректного номера карты', () => {
    cy.get('.input__holder').type('My Name');
    cy.get('.input__number').type('12345');
    cy.get('.input__date').type('0425');
    cy.get('.input__cvv').type('389');
    cy.get('form').get('button').click();
    cy.get('.secure-wrapper').should('contain.text', 'Данные не валидны!');
  });

  it ('Ввод некорректного кода безопасности', () => {
    cy.get('.input__holder').type('My Name');
    cy.get('.input__number').type('1234123412341234');
    cy.get('.input__date').type('0425');
    cy.get('.input__cvv').type('11');
    cy.get('form').get('button').click();
    cy.get('.secure-wrapper').should('contain.text', 'Данные не валидны!');
  });
});
