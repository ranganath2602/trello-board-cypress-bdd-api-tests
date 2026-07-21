import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { createBoard, createBoardWithQuery, getBoard, updateBoard, deleteBoard } from "../../support/boards_payloads/boards.service"
import { BoardResponse } from "../../support/boards_payloads/boards.payload"
import { authorize, useKeyOnly, useTokenOnly, getKey, getToken } from "../../support/variables/auth.var"
import { getCurrentBoard, setCurrentBoard, setDeletedBoardId, getDeletedBoardId } from "../../support/variables/board.var"

const REQUEST_RESULT = "@requestResultEntity"

// --- Given ------------------------------------------------------------------

Given("the consumer is an authorized user", () => {
    authorize(Cypress.env("TRELLO_KEY"), Cypress.env("TRELLO_TOKEN"))
})

Given("the consumer provides the key only", () => {
    authorize(Cypress.env("TRELLO_KEY"), Cypress.env("TRELLO_TOKEN"))
    useKeyOnly()
})

Given("the consumer provides the token only", () => {
    authorize(Cypress.env("TRELLO_KEY"), Cypress.env("TRELLO_TOKEN"))
    useTokenOnly()
})

Given("an existing board", () => {
    createBoard(`Test Board ${Date.now()}`).then((response) => {
        expect(response.status, "create board status").to.be.oneOf([200, 201])
        setCurrentBoard({ id: response.body.id, name: response.body.name })
    })
})

// --- When -------------------------------------------------------------------

When("the consumer creates a board named {string}", (name: string) => {
    createBoard(name).then((response) => {
        if (response.body?.id) {
            setCurrentBoard({ id: response.body.id, name: response.body.name })
        }
    })
})

When("the consumer retrieves the board", () => {
    getBoard(getCurrentBoard()!.id)
})

When("the consumer updates the board name to {string}", (name: string) => {
    updateBoard(getCurrentBoard()!.id, { name }).then((response) => {
        if (response.body?.id) {
            setCurrentBoard({ id: response.body.id, name: response.body.name })
        }
    })
})

When("the consumer deletes the board", () => {
    const board = getCurrentBoard()!
    setDeletedBoardId(board.id)
    deleteBoard(board.id)
})

When("the consumer creates a board without a name", () => {
    createBoardWithQuery({ key: getKey(), token: getToken() })
})

When("the consumer creates a board without a token", () => {
    createBoardWithQuery({ key: getKey(), name: "BDD Test Board" })
})

When("the consumer creates a board without a key", () => {
    createBoardWithQuery({ token: getToken(), name: "BDD Test Board" })
})

// --- Then -------------------------------------------------------------------

Then("the boards service should succeed with the status code {statusCodeSuccessTranslate}", (statusCode: number) => {
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).its("status").should("equal", statusCode)
})

Then("the boards service should fail with the status code {statusCodeFailedTranslate}", (statusCode: number) => {
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).its("status").should("equal", statusCode)
})

Then("the board response should contain the id and the name {string}", (name: string) => {
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).should((response) => {
        expect(response.body).to.have.property("id")
        expect(response.body).to.have.property("name", name)
    })
})

Then("the board response should contain the name {string}", (name: string) => {
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).its("body").should("have.property", "name", name)
})

Then("the board response should match the stored board", () => {
    const stored = getCurrentBoard()!
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).should((response) => {
        expect(response.body).to.have.property("id", stored.id)
        expect(response.body).to.have.property("name", stored.name)
    })
})

Then("the board should no longer exist", () => {
    getBoard(getDeletedBoardId()!).its("status").should("equal", 404)
})

Then("the error response contains the message: {string}", (message: string) => {
    cy.get<Cypress.Response<BoardResponse>>(REQUEST_RESULT).should((response) => {
        const body = response.body
        if (body && typeof body === "object" && "message" in body) {
            expect(body.message).to.contain(message)
        } else {
            expect(String(body)).to.contain(message)
        }
    })
})
