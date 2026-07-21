export interface BoardRequest {
    name?: string
    desc?: string
    closed?: boolean
}

export interface BoardResponse {
    id: string
    name: string
    desc?: string
    closed?: boolean
    url?: string
    // Trello returns `message` on JSON error bodies; some errors are plain strings.
    message?: string
    [key: string]: unknown
}
