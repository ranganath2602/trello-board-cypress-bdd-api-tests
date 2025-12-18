import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { Board } from '../../../src/types/trello';

let boardId: string;
let boardData: Board | any;

When('I retrieve the Trello board', () => {
  expect(boardId, 'boardId').to.exist;
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  return cy.request({ method: 'GET', url: `https://api.trello.com/1/boards/${boardId}`, qs: { key, token }, failOnStatusCode: false }).then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.body).to.have.property('id', boardId);
    expect(resp.body).to.have.property('name', boardData.name);
    return cy.wrap(resp).as('requestResult');
  });
});

When('I update the Trello board', () => {
  expect(boardId, 'boardId').to.exist;
  const updatedData = { name: 'Updated Test Board', desc: 'This is an updated test board' };
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  return cy.request({ method: 'PUT', url: `https://api.trello.com/1/boards/${boardId}`, qs: { key, token }, body: updatedData, failOnStatusCode: false }).then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.body).to.have.property('name', updatedData.name);
    boardData = resp.body;
    return cy.wrap(resp).as('requestResult');
  });
});

Then('I delete the Trello board', () => {
  expect(boardId, 'boardId').to.exist;
  const key = Cypress.env('TRELLO_KEY');
  const token = Cypress.env('TRELLO_TOKEN');
  return cy
    .request({ method: 'DELETE', url: `https://api.trello.com/1/boards/${boardId}`, qs: { key, token }, failOnStatusCode: false })
    .then(() => {
      // verify deletion
      return cy.request({ method: 'GET', url: `https://api.trello.com/1/boards/${boardId}`, qs: { key, token }, failOnStatusCode: false }).then((getResp) => {
        expect(getResp.status).to.equal(404);
      });
    });
});