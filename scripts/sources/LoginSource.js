export default class LoginSource {
    static login(username, password) {
        return fetch('https://flow.manywho.com/api/draw/1/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ManyWhoTenant': 'd90d572e-8464-429c-91bc-a3163a5bc728'
            },
            body: JSON.stringify({
                loginUrl: "https://flow.manywho.com/plugins/manywho/api/draw/1/authentication",
                username: username,
                password: password
            })
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            throw response.statusText;
        });
    }
}
