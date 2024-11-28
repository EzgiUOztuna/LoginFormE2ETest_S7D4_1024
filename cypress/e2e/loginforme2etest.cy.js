describe('Login tests', () => {
  
  
    it('Başarılı giriş yapıldığında success sayfasına yönlendirir', () => {
      //Arrange
      cy.visit('http://localhost:5173/');

      //Act
      cy.get('[data-cy="email-input"]').type("erdem.guntay@wit.com.tr")
      cy.get('[data-cy="password-input"]').type("9fxIH0GXesEwH_I")
      cy.get('[data-cy="terms-input"]').click()
      cy.get('[data-cy="submit-button"]').click()
        
      //Assert
      cy.url().should('include', '/success');
    });

    it('Hatalı email girdisi ekranda doğru hata mesajı gösterir ve buton disabled kalır', () => {

      //Arrange
      cy.visit('http://localhost:5173/');
  
      //Act
      cy.get('[data-cy="email-input"]').type("yanlisemail.com");
      cy.get('[data-cy="password-input"]').type("ValidPassword123");
      cy.get('[data-cy="terms-input"]').click();

      //Assert
      cy.get('[data-cy="email-input"]').siblings('.invalid-feedback').should('contain', 'Please enter a valid email address');
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });

    it('Email ve password hatalı olduğunda ekranda 2 hata mesajı görünür', () => {

      //Arrange
      cy.visit('http://localhost:5173/');
  
      //Act
      cy.get('[data-cy="email-input"]').type("yanlisemail.com");
      cy.get('[data-cy="password-input"]').type("123");
      cy.get('[data-cy="terms-input"]').click();

      //Assert
      cy.get('.invalid-feedback').should('have.length', 2);
      cy.get('[data-cy="password-input"]').siblings('.invalid-feedback').should('contain', 'Password must be at least 4 characters long');
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });
  
    it('Kurallar kabul edilmediğinde buton disabled kalır', () => {
  

      //Arrange
      cy.visit('http://localhost:5173/');

      //Act
      cy.get('[data-cy="email-input"]').type("erdem.guntay@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("9fxIH0GXesEwH_I");

      //Assert
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });
});