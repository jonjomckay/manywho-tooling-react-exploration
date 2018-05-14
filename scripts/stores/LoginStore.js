export default class LoginStore {
    static getToken() {
        return window.localStorage.getItem('token');
    }

    static storeToken(token) {
        window.localStorage.setItem('token', token);
    }
}