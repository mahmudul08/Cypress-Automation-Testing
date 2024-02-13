describe("Registration Page Test Cases",() =>{
    beforeEach("Visit url and Check Logo", () => {
        cy.visit("https://tutorialsninja.com/demo/");
        cy.get("h1 > a").should("be.visible");
        cy.get(".fa.fa-user").click();
        cy.get(".dropdown-menu > :nth-child(1) > a").click();
        cy.title().should("eq", "Register Account")
    });

    it("Verify Registration account by providing all field", () => {
    //Random Email Generate
        function generateRandomEmail() {
            const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
            let email = "";

            for (let i = 0; i < 10; i++) {
                email += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
            }
            email += "@gmail.com";

            return email;
        }
        const randomEmail = generateRandomEmail();

        //Random Phone Number Generate
        function generateRandomPhoneNumber() {
            let phoneNumber = '+1';
            for (let i = 0; i < 10; i++) {
                phoneNumber += Math.floor(Math.random() * 10);
            }

            return phoneNumber;
        }
        const randomPhoneNumber = generateRandomPhoneNumber();

        //Registration Field Input
        cy.get("#input-firstname").type("Noob");
        cy.get("#input-lastname").type("Tester");
        cy.get("#input-email").type(randomEmail);
        cy.get("#input-telephone").type(randomPhoneNumber);
        cy.get("#input-password").type("Hello");
        cy.get("#input-confirm").type("Hello");

        //Newsletter
        cy.get("input[value='0']").should("be.visible");
        cy.get("input[value='0']").check().should("be.checked");

        //Privacy Policy
        cy.get("input[value='1'][name='agree']").click();
        cy.get("input[value='1'][name='agree']").check().should("be.checked");

        //Continue Button
        cy.get("input[value='Continue']").should("be.visible");
        cy.get("input[value='Continue']").click();

        //After Registration
        cy.get("div[id='content'] h1").should("have.text", "Your Account Has Been Created!");

    });

    it("Verify Registering an account when YES option is selected for Newsletter field", () => {
        //Random Email Generate
            function generateRandomEmail() {
                const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
                let email = "";

                for (let i = 0; i < 10; i++) {
                    email += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
                }
                email += "@gmail.com";

                return email;
            }
            const randomEmail = generateRandomEmail();

            //Random Phone Number Generate
            function generateRandomPhoneNumber() {
                let phoneNumber = '+1';
                for (let i = 0; i < 10; i++) {
                    phoneNumber += Math.floor(Math.random() * 10);
                }

                return phoneNumber;
            }
            const randomPhoneNumber = generateRandomPhoneNumber();

            //Registration Field Input
            cy.get("#input-firstname").type("Noob");
            cy.get("#input-lastname").type("Tester");
            cy.get("#input-email").type(randomEmail);
            cy.get("#input-telephone").type(randomPhoneNumber);
            cy.get("#input-password").type("Hello");
            cy.get("#input-confirm").type("Hello");

            //Newsletter
            cy.get("input[value='1'][name='newsletter']").should("be.visible");
            cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

            //Privacy Policy
            cy.get("input[value='1'][name='agree']").click();
            cy.get("input[value='1'][name='agree']").check().should("be.checked");

            //Continue Button
            cy.get("input[value='Continue']").should("be.visible");
            cy.get("input[value='Continue']").click();

            //After Registration
            cy.get("div[id='content'] h1").should("have.text", "Your Account Has Been Created!");
        });
        it('Test that the system prevents registration with an email address that is already registered in the system', () => {
            //Registration Field Input
            cy.get("#input-firstname").type("Noob");
            cy.get("#input-lastname").type("Tester");
            cy.get("#input-email").type("test@gmail.com");
            cy.get("#input-telephone").type("1234567890");
            cy.get("#input-password").type("Hello");
            cy.get("#input-confirm").type("Hello");

            //Newsletter
            cy.get("input[value='1'][name='newsletter']").should("be.visible");
            cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

            //Privacy Policy
            cy.get("input[value='1'][name='agree']").click();
            cy.get("input[value='1'][name='agree']").check().should("be.checked");

            //Continue Button
            cy.get("input[value='Continue']").should("be.visible");
            cy.get("input[value='Continue']").click();

            //Error Message
            cy.get(".alert.alert-danger.alert-dismissible")
            .should("have.text", "Warning: E-Mail Address is already registered!");
        });
        it(' Registration process without agreeing to the  Privacy Policy', () => {
             //Registration Field Input
             cy.get("#input-firstname").type("Noob");
             cy.get("#input-lastname").type("Tester");
             cy.get("#input-email").type("testtttttt@gmail.com");
             cy.get("#input-telephone").type("12345678");
             cy.get("#input-password").type("Hello");
             cy.get("#input-confirm").type("Hello");

             //Newsletter
             cy.get("input[value='1'][name='newsletter']").should("be.visible");
             cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

             //Privacy Policy
             cy.get("input[value='1'][name='agree']").should("not.be.checked");

             //Continue Button
             cy.get("input[value='Continue']").should("be.visible");
             cy.get("input[value='Continue']").click();

             //Error Message
             cy.get(".alert.alert-danger.alert-dismissible")
             .should("have.text", "Warning: You must agree to the Privacy Policy!");
        });
        it('Verify Registering an account by Without input Any Field', () => {
            cy.get("input[value='Continue']").should("be.visible");
            cy.get("input[value='Continue']").click();
            cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > form:nth-child(3) > fieldset:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)")
            .should("have.text", "First Name must be between 1 and 32 characters!");

            cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > form:nth-child(3) > fieldset:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)")
            .should("have.text", "Last Name must be between 1 and 32 characters!");

            cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > form:nth-child(3) > fieldset:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)")
            .should("have.text", "E-Mail Address does not appear to be valid!");

            cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > form:nth-child(3) > fieldset:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2)")
            .should("have.text", "Telephone must be between 3 and 32 characters!");

            cy.get("body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > form:nth-child(3) > fieldset:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)")
            .should("have.text", "Password must be between 4 and 20 characters!");

            cy.get(".alert.alert-danger.alert-dismissible")
            .should("have.text", "Warning: You must agree to the Privacy Policy!");
        });
        it('Verify all the have proper placeholder', () => {
            cy.get("#input-firstname").should("have.attr", "placeholder", "First Name");
            cy.get("#input-lastname").should("have.attr", "placeholder", "Last Name");
            cy.get("#input-email").should("have.attr", "placeholder", "E-Mail");
            cy.get("#input-telephone").should("have.attr", "placeholder", "Telephone");
            cy.get("#input-password").should("have.attr", "placeholder", "Password");
            cy.get("#input-confirm").should("have.attr", "placeholder", "Password Confirm");
        });

        it('Should verify that required fields are marked as mandatory', () => {
            cy.get('#input-firstname').then(($input) => {
            expect($input.closest('.form-group')).to.have.class('required');
            });

        });
        it('Verify Register an account with invalid email formate into email field', () => {
            //Registration Field Input
            cy.get("#input-firstname").type("Noob");
            cy.get("#input-lastname").type("Tester");
            cy.get("#input-email").type("Hello@gmail");
            cy.get("#input-telephone").type("11111");
            cy.get("#input-password").type("Hello");
            cy.get("#input-confirm").type("Hello");

            //Newsletter
            cy.get("input[value='1'][name='newsletter']").should("be.visible");
            cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

            //Privacy Policy
            cy.get("input[value='1'][name='agree']").click();
            cy.get("input[value='1'][name='agree']").check().should("be.checked");

            //Continue Button
            cy.get("input[value='Continue']").should("be.visible");
            cy.get("input[value='Continue']").click();

            //Error Message
            cy.get(".text-danger")
            .should("have.text", "E-Mail Address does not appear to be valid!")

        });
        it('Verify that the system rejects weak passwords and accepts strong ones', () => {

            //Random Email Generate
            function generateRandomEmail() {
                const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
                let email = "";

                for (let i = 0; i < 10; i++) {
                    email += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
                }
                email += "@gmail.com";

                return email;
            }
            const randomEmail = generateRandomEmail();

            //Random Phone Number Generate
            function generateRandomPhoneNumber() {
                let phoneNumber = '+1';
                for (let i = 0; i < 10; i++) {
                    phoneNumber += Math.floor(Math.random() * 10);
                }

                return phoneNumber;
            }
            const randomPhoneNumber = generateRandomPhoneNumber();

        //Registration Field Input
        cy.get("#input-firstname").type("Noob");
        cy.get("#input-lastname").type("Tester");
        cy.get("#input-email").type(randomEmail);
        cy.get("#input-telephone").type(randomPhoneNumber);
        cy.get("#input-password").type("Hello");
        cy.get("#input-confirm").type("Hello");

        //Newsletter
        cy.get("input[value='0']").should("be.visible");
        cy.get("input[value='0']").check().should("be.checked");

        //Privacy Policy
        cy.get("input[value='1'][name='agree']").click();
        cy.get("input[value='1'][name='agree']").check().should("be.checked");

        //Continue Button
        cy.get("input[value='Continue']").should("be.visible");
        cy.get("input[value='Continue']").click();

        });
        it('Verify Registering an account by entering different password  and confirm password', () => {
             //Registration Field Input
             cy.get("#input-firstname").type("Noob");
             cy.get("#input-lastname").type("Tester");
             cy.get("#input-email").type("testtttttt@gmail.com");
             cy.get("#input-telephone").type("12345678");
             cy.get("#input-password").type("Hello");
             cy.get("#input-confirm").type("Hellooo");  //Different confirm Password field

             //Newsletter
             cy.get("input[value='1'][name='newsletter']").should("be.visible");
             cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

             //Privacy Policy
             cy.get("input[value='1'][name='agree']").should("not.be.checked");

             //Continue Button
             cy.get("input[value='Continue']").should("be.visible");
             cy.get("input[value='Continue']").click();

            //Error Message
            cy.get(".text-danger")
            .should("have.text", "Password confirmation does not match password!");
        });
        it('Verify Register account with Invalid Phone number format', () => {
                    //Random Email Generate
            function generateRandomEmail() {
                const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
                let email = "";

                for (let i = 0; i < 10; i++) {
                    email += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
                }
                email += "@gmail.com";

                return email;
            }
            const randomEmail = generateRandomEmail();

            //Random Phone Number Generate
            function generateRandomPhoneNumber() {
                let phoneNumber = 'dfghj';
                for (let i = 0; i < 10; i++) {
                    phoneNumber += Math.floor(Math.random() * 10);
                }

                return phoneNumber;
            }
            const randomPhoneNumber = generateRandomPhoneNumber();
             //Registration Field Input
             cy.get("#input-firstname").type("Noob");
             cy.get("#input-lastname").type("Tester");
             cy.get("#input-email").type(randomEmail);
             cy.get("#input-telephone").type(randomPhoneNumber);  //Invalid Phone number
             cy.get("#input-password").type("Hello");
             cy.get("#input-confirm").type("Hello");

             //Newsletter
             cy.get("input[value='1'][name='newsletter']").should("be.visible");
             cy.get("input[value='1'][name='newsletter']").check().should("be.checked");

             //Privacy Policy
             cy.get("input[value='1'][name='agree']").should("not.be.checked");

             //Continue Button
             cy.get("input[value='Continue']").should("be.visible");
             cy.get("input[value='Continue']").click();
        });

})
