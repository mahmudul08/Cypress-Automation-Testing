describe("Login Page Test Cases", () =>{
    beforeEach("Navigate to Login page", () =>{
        cy.visit("https://tutorialsninja.com/demo/");
        cy.title().should("eq", "Your Store");
        cy.get(".fa.fa-user").click();
        cy.get('.dropdown-menu > :nth-child(2) > a').click();
        cy.title().should("eq", "Account Login");
    });
    it('Verify logging into the application using valid credentials', () => {

        //Input Credentials
        cy.get("#input-email").type("loll@gmail.com");
        cy.get("#input-password").type("123456");

        //Check Login Button should be enabled
        cy.get("input[value='Login']").should("be.enabled")

        //Click Login Button
        cy.get("input[value='Login']").click();

        //Verify title after login
        cy.title().should("eq", "My Account");
    });
    it('Verify logging into the using application Login without providing any Credentials', () => {
        //Input Credentials
        cy.get("#input-email").type(" ");
        cy.get("#input-password").type(" ");

        //Click Login Button
        cy.get("input[value='Login']").click();

        //Error Message
        cy.get(".alert.alert-danger.alert-dismissible")
        .should("have.text", "Warning: No match for E-Mail Address and/or Password.");

    });
    it('Verify logging into the using application Verify Forget Password link is available on the Login page ', () => {
        cy.get("div[class='form-group'] a").should("be.visible");
    });
    it('Verify user is navigated to appropriate page on clicking it', () => {
        cy.get("div[class='form-group'] a").click();
        cy.url()
        .should("eq", "https://tutorialsninja.com/demo/index.php?route=account/forgotten");

        //Forgotten password page title check
        cy.title().should("eq", "Forgot Your Password?");

    });

    it('Verify Login fields have proper placeholder', () => {
        cy.get("#input-email").should("have.attr", "placeholder", "E-Mail Address");
        cy.get("#input-password").should("have.attr", "placeholder", "Password");

    });
    it('Verify logging into the using application Invalid Email and password', () => {
        cy.get("#input-email").type("heeeelo@gmail.com");
        cy.get("#input-password").type("Hello");
        cy.get("input[value='Login']").click();

        //Error Message
        cy.get(".alert.alert-danger.alert-dismissible")
        .should("have.text", "Warning: No match for E-Mail Address and/or Password.")
    });
    it('Verify logging into the using application Login without providing any Credentials', () => {
        cy.get("#input-email").type(" ");
        cy.get("#input-password").type(" ");
        cy.get("input[value='Login']").click();
    //Error Message
    cy.get(".alert.alert-danger.alert-dismissible")
    .should("have.text", "Warning: No match for E-Mail Address and/or Password.")
    });
    it('Verify selecting Browser back button after Login should not Logout', () => {
        //Input Credentials
        cy.get("#input-email").type("loll@gmail.com");
        cy.get("#input-password").type("123456");

        //Click Login Button
        cy.get("input[value='Login']").click();

        //Navigate Back and Reload
        cy.go("back");
        cy.reload();
    });


});
