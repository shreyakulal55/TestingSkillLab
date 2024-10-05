describe("ReqResAPI", () => {
    const baseURL = "https://reqres.in/";
    let id;
  
    it("POST - Create User", () => {
      cy.request({
        method: "POST",
        url: baseURL + "api/users",
        body: {
          name: "Shreya",
          job: "Testing Engineer",
        },
      }).then((response) => {
        const res = response.body;
        id = res.id;
        expect(response.status).to.eql(201);
        expect(res).to.have.property("name", "Shreya");
        expect(res).to.have.property("job", "Testing Engineer");
        expect(res).to.have.property("id");
        expect(res).to.have.property("createdAt");
        cy.log(id);
        cy.log(res);
      });
    });
  
    it("GET - List Users", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/users",
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("data");
        expect(res.data).to.be.an("array");
        res.data.forEach((user) => {
          expect(user).to.have.property("id");
          expect(user).to.have.property("email");
          expect(user).to.have.property("first_name");
          expect(user).to.have.property("last_name");
        });
        cy.log(res);
      });
    });
  
    it("GET", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/users/" + 2,
      }).then((response) => {
        const res = JSON.parse(JSON.stringify(response.body));
        cy.log(res);
      });
    });
  
    it("GET - Single User Not Found", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/users/99999",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eql(404);
      });
    });
  
    it("GET - List Resources", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/unknown",
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("data");
        expect(res.data).to.be.an("array");
        res.data.forEach((resource) => {
          expect(resource).to.have.property("name");
          expect(resource).to.have.property("year");
        });
        cy.log(res);
      });
    });
  
    it("GET - Single Resource", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/unknown/2",
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res.data).to.have.property("name");
        expect(res.data).to.have.property("year");
        cy.log(res);
      });
    });
  
    it("GET - Single Resource Not Found", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/unknown/99999",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eql(404);
      });
    });
  
    it("PUT - Update User", () => {
      cy.request({
        method: "PUT",
        url: baseURL + "api/users/" + id,
        body: {
          name: "Shreya Kulal",
          job: "Senior Testing Engineer",
        },
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("name", "Shreya Kulal");
        expect(res).to.have.property("job", "Senior Testing Engineer");
        cy.log(res);
      });
    });
  
    it("PATCH - Update User", () => {
      cy.request({
        method: "PATCH",
        url: baseURL + "api/users/" + id,
        body: {
          job: "Lead Testing Engineer",
        },
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("job", "Lead Testing Engineer");
        cy.log(res);
      });
    });
  
    it("DELETE - Delete User", () => {
      cy.request({
        method: "DELETE",
        url: baseURL + "api/users/" + id,
      }).then((response) => {
        expect(response.status).to.eql(204);
      });
    });
  
    it("POST - Register Successful", () => {
      cy.request({
        method: "POST",
        url: baseURL + "api/register",
        body: {
          email: "eve.holt@reqres.in",
          password: "pistol",
        },
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("token");
        cy.log(res);
      });
    });
  
    it("POST - Register Unsuccessful", () => {
      cy.request({
        method: "POST",
        url: baseURL + "api/register",
        body: {
          email: "eve.holt@reqres.in",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eql(400);
        expect(response.body.error).to.eql("Missing password");
      });
    });
  
    it("POST - Login Successful", () => {
      cy.request({
        method: "POST",
        url: baseURL + "api/login",
        body: {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        },
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("token");
        cy.log(res);
      });
    });
  
    it("POST - Login Unsuccessful", () => {
      cy.request({
        method: "POST",
        url: baseURL + "api/login",
        body: {
          email: "eve.holt@reqres.in",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eql(400);
        expect(response.body.error).to.eql("Missing password");
      });
    });
  
    it("GET - Delayed Response", () => {
      cy.request({
        method: "GET",
        url: baseURL + "api/users?delay=3",
      }).then((response) => {
        const res = response.body;
        expect(response.status).to.eql(200);
        expect(res).to.have.property("data");
        expect(res.data).to.be.an("array");
        cy.log(res);
      });
    });
  });