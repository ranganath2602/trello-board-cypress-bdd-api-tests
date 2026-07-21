import { BoardRequest, BoardResponse } from "./boards.payload"
import { authQuery } from "../variables/auth.var"

const baseUrl: string = Cypress.env("baseUrlBoards")

type Query = Record<string, string>

function send(method: string, path: string, query: Query, body?: BoardRequest): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return cy.request<BoardResponse>({
        method,
        url: `${baseUrl}${path}`,
        qs: query,
        body,
        failOnStatusCode: false
    }).then((response) => cy.wrap(response).as("requestResultEntity"))
}

export function createBoard(name: string): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return send("POST", "/boards", authQuery({ name }))
}

// Used by negative scenarios that need to omit a specific credential or field.
export function createBoardWithQuery(query: Query): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return send("POST", "/boards", query)
}

export function getBoard(id: string): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return send("GET", `/boards/${id}`, authQuery())
}

export function updateBoard(id: string, body: BoardRequest): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return send("PUT", `/boards/${id}`, authQuery(), body)
}

export function deleteBoard(id: string): Cypress.Chainable<Cypress.Response<BoardResponse>> {
    return send("DELETE", `/boards/${id}`, authQuery())
}
