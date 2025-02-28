const tokenName = 'EventCal_token'

export function setToken(token) {
    localStorage.setItem(tokenName, token)
}

export function getToken() {
    return localStorage.getItem(tokenName)
}

export function removeToken() {
    return localStorage.removeItem(tokenName)
}

export function getUserFromToken() {
    const token = getToken()

    if (!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]))

    if (payload.exp < Date.now() / 1000) {
        removeToken()
        return null
    }

    return payload.user
}