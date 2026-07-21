let key = ""
let token = ""

export function authorize(apiKey: string, apiToken: string) {
    key = apiKey
    token = apiToken
}

export function useKeyOnly() {
    token = ""
}

export function useTokenOnly() {
    key = ""
}

export function getKey(): string {
    return key
}

export function getToken(): string {
    return token
}

// Build the Trello auth query, omitting any credential that is currently unset.
export function authQuery(extra: Record<string, string> = {}): Record<string, string> {
    const query: Record<string, string> = { ...extra }
    if (key) query.key = key
    if (token) query.token = token
    return query
}

export function resetCredentials() {
    key = ""
    token = ""
}
