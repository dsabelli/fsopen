describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Dan Sabelli",
      username: "dsabelli",
      password: "deeznuts",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeeznuts");
    cy.get("#login-button").click();
    cy.get(".error").contains("wrong credentials");

    cy.get("html").should("not.contain", "Dan Sabelli");
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();
    cy.contains("Dan Sabelli logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "dsabelli", password: "deeznuts" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
