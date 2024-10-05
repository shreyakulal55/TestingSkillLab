///<reference types='Cypress'/>

describe('testStore', () => {
    it('contactUs', () => {
        cy.visit(" https://automationteststore.com/");

        cy.xpath('(//*[text()="Contact Us"])[2]').click()


        // cy.get("a[href='https://automationteststore.com/index.php?rt=content/contact']").click()
            cy.get("#ContactUsFrm_first_name").type("shreya").should('have.value','shreya')
            cy.get("#ContactUsFrm_email").type("shreya55@gmail.com")
            cy.get("#ContactUsFrm_enquiry").type("blahblah")
            cy.xpath("//button[@title='Submit']").click()

           cy.xpath("//*[contains(text(),'successfully')]" ).should('have.text','Your enquiry has been successfully sent to the store owner!')


    });
});