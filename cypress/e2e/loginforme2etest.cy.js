describe('Login tests', () => {
  //Arrange
  it('should add some text to the name input', () => {
      cy.visit('http://localhost:5173/')

      //Act
      cy.get('[data-cy="email-input"]').type("erdem.guntay@wit.com.tr")
      cy.get('[data-cy="password-input"]').type("9fxIH0GXesEwH_I")
      cy.get('[data-cy="terms-input"]').click()
      cy.get('[data-cy="submit-button"]').click()
      
      

      //Assert
      




    })




}) 