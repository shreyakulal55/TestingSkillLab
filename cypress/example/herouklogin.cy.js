// describe('heroku app', () => {
//     it('login', () => {
//        cy.visit("https://the-internet.herokuapp.com/login");
//     //    cy.get('#username').type('tomsmith')

//        cy.xpath('//input[@name="username"]').type('tomsmith');

//        cy.get('#password').type('SuperSecretPassword!')
//        cy.get('.radius').click()
//        cy.contains('Logout').click()
//     });
// });


describe('heroku app', () => {
   it('login', () => {
      cy.visit("https://the-internet.herokuapp.com/login");
   //    cy.get('#username').type('tomsmith')

      cy.xpath('//input[@name="username"]').type('tomsmith');

      cy.xpath('//input[@id="password"]').type('SuperSecretPassword!')
      cy.get('.radius').click()
      cy.contains('Logout').click()
// cy.get("")

   });
});