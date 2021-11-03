export const hasAuthCookie = () => {
    return document.cookie.split(';').find(row => row.trim().startsWith('auth0'))
        .split('=')[1];
}