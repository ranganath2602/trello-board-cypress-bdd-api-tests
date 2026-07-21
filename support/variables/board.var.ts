export interface StoredBoard {
    id: string
    name: string
}

let currentBoard: StoredBoard | undefined
let deletedBoardId: string | undefined
const createdBoardIds: string[] = []

export function setCurrentBoard(board: StoredBoard) {
    currentBoard = board
    trackBoard(board.id)
}

export function getCurrentBoard(): StoredBoard | undefined {
    return currentBoard
}

// Remember every board we create so the @boards After hook can clean them up.
export function trackBoard(id: string) {
    if (id && createdBoardIds.indexOf(id) === -1) {
        createdBoardIds.push(id)
    }
}

export function getCreatedBoardIds(): string[] {
    return createdBoardIds
}

export function setDeletedBoardId(id: string) {
    deletedBoardId = id
}

export function getDeletedBoardId(): string | undefined {
    return deletedBoardId
}

export function resetBoards() {
    currentBoard = undefined
    deletedBoardId = undefined
    createdBoardIds.length = 0
}
