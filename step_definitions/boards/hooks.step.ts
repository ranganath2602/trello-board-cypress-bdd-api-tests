import { After, Before } from "@badeball/cypress-cucumber-preprocessor"
import { getCreatedBoardIds, resetBoards } from "../../support/variables/board.var"
import { resetCredentials } from "../../support/variables/auth.var"
import { deleteBoard } from "../../support/boards_payloads/boards.service"

Before({ tags: "@boards" }, () => {
    resetBoards()
    resetCredentials()
})

// Remove every board created during the scenario so the account's workspaces do
// not fill up across runs.
After({ tags: "@boards" }, () => {
    getCreatedBoardIds().forEach((id) => {
        deleteBoard(id)
    })
})
