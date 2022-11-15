describe("dashboard spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      fixture: "urlData.json",
    }).as("shortenedUrls");
    cy.visit("http://localhost:3000/");
  });
  it("should have a title", () => {
    cy.get("h1").contains("URL Shortener");
  });
  it("should render all the existing shortened URLs", () => {
    cy.get(":nth-child(1) > h3").contains("Awesome photo");
    cy.get(":nth-child(1) > a")
      .should("have.attr", "href")
      .and("include", "http://localhost:3001/useshorturl/1");
    cy.get(":nth-child(1) > a").contains("http://localhost:3001/useshorturl/1");
    cy.get(":nth-child(1) > p").contains(
      "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    );
    cy.get(":nth-child(2) > h3").contains("Surfing");
    cy.get(":nth-child(2) > a")
      .should("have.attr", "href")
      .and("include", "http://localhost:3001/useshorturl/2");
    cy.get(":nth-child(2) > a").contains("http://localhost:3001/useshorturl/2");
    cy.get(":nth-child(2) > p").contains(
      "https://img.olympicchannel.com/images/image/private/t_16-9_1240-700/f_auto/v1538355600/primary/ojpcg2xlihwx84ipvrcw"
    );
  });
  it("should have a form with a title input, url input, and Shorten Please! button", () => {
    cy.get('input[name="title"]').should("be.empty");
    cy.get('input[name="urlToShorten"]').should("be.empty");
    cy.get("button").contains("Shorten Please!");
  });
  it("should allow a user to fill out the form", () => {
    cy.get('input[name="title"]').type("Balloon Fiesta");
    cy.get('input[name="urlToShorten"]').type(
      "https://www.tlcplumbing.com/wp-content/uploads/2022/05/Balloon-Fiesta-Albuquerque.jpg"
    );
  });
  it("should allow the user to fill out the form and submit it, then render the new URL shortened", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      id: 3,
      long_url:
        "https://www.tlcplumbing.com/wp-content/uploads/2022/05/Balloon-Fiesta-Albuquerque.jpg",
      short_url: "http://localhost:3001/useshorturl/3",
      title: "Balloon Fiesta",
    });
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      urls: [
        {
          id: 1,
          long_url:
            "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          short_url: "http://localhost:3001/useshorturl/1",
          title: "Awesome photo",
        },
        {
          id: 2,
          long_url:
            "https://img.olympicchannel.com/images/image/private/t_16-9_1240-700/f_auto/v1538355600/primary/ojpcg2xlihwx84ipvrcw",
          short_url: "http://localhost:3001/useshorturl/2",
          title: "Surfing",
        },
        {
          id: 3,
          long_url:
            "https://www.tlcplumbing.com/wp-content/uploads/2022/05/Balloon-Fiesta-Albuquerque.jpg",
          short_url: "http://localhost:3001/useshorturl/3",
          title: "Balloon Fiesta",
        },
      ],
    });
    cy.get('input[name="title"]').type("Balloon Fiesta");
    cy.get('input[name="urlToShorten"]').type(
      "https://www.tlcplumbing.com/wp-content/uploads/2022/05/Balloon-Fiesta-Albuquerque.jpg"
    );
    cy.get("button").contains("Shorten Please!").click();
    cy.get(":nth-child(3) > h3").contains("Balloon Fiesta");
    cy.get(":nth-child(3) > a")
      .should("have.attr", "href")
      .and("include", "http://localhost:3001/useshorturl/3");
    cy.get(":nth-child(3) > p").contains(
      "https://www.tlcplumbing.com/wp-content/uploads/2022/05/Balloon-Fiesta-Albuquerque.jpg"
    );
  });
});
