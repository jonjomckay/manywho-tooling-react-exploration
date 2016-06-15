export default class LoginStore {
    static getToken() {
        return sessionStorage.getItem('token');
    }

    static storeToken(token) {
        sessionStorage.setItem('token', token);
    }
}