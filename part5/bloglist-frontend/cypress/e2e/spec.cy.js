describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Dan Sabelli",
      username: "dsabelli",
      password: "deeznuts",
    };
    const user2 = {
      name: "Van Sabelli",
      username: "vsabelli",
      password: "deeznuts",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login to Application");
  });

  it("Login with wrong password fails", function () {
    cy.contains("login").click();
    cy.get("input:first").type("sabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("invalid username or password");
  });

  it("Login with correct credentials", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("dsabelli has successfully logged in!");
  });

  it("User is able to post a new blog", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("new blog").click();
    cy.get("#Title").type("Cypress Title");
    cy.get("#Author").type("Cypress Author");
    cy.get("#Url").type("Cypress Url");
    cy.contains("create").click();

    cy.get("#Title").should("not.contain.text");
    cy.contains("Cypress Title");
  });

  it("User can delete blog", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("new blog").click();
    cy.get("#Title").type("Cypress Title");
    cy.get("#Author").type("Cypress Author");
    cy.get("#Url").type("Cypress Url");
    cy.contains("create").click();

    cy.contains("view").click();
    cy.contains("remove").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Remove Cypress Title by Cypress Author?");
    });
    cy.on("window:confirm", () => true);
  });
  it("user's cannot delete other's blogs", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("new blog").click();
    cy.get("#Title").type("Cypress Title");
    cy.get("#Author").type("Cypress Author");
    cy.get("#Url").type("Cypress Url");
    cy.contains("create").click();
    cy.contains("Log Out").click();

    cy.contains("login").click();
    cy.get("input:first").type("vsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("view").click();
    cy.contains("remove").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Remove Cypress Title by Cypress Author?");
    });
    cy.on("window:confirm", () => true);
    cy.contains("Cypress Title");
  });

  it.only("Blogs assort by most likes", function () {
    cy.contains("login").click();
    cy.get("input:first").type("dsabelli");
    cy.get("input:last").type("deeznuts");
    cy.get("#login-button").click();

    cy.contains("new blog").click();
    cy.get("#Title").type("Cypress Title 1");
    cy.get("#Author").type("Cypress Author 1");
    cy.get("#Url").type("Cypress Url 1");
    cy.contains("create").click();
    cy.contains("view").click();

    cy.get("#Title").type("Cypress Title 2");
    cy.get("#Author").type("Cypress Author 2");
    cy.get("#Url").type("Cypress Url 2");
    cy.contains("create").click();
    cy.get("[data-cy='view 1']").click();
    cy.get("[data-cy='likes 1']").click();

    cy.get(".blogs>blog0>div").eq(0).should("contain", "Cypress Title 2");
  });
});
