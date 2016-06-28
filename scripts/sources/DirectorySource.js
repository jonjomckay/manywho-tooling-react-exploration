import LoginStore from '../stores/LoginStore';

export default class DirectorySource {
    static findUser(id, username) {
        return fetch('https://flow.manywho.com/api/admin/1/directory/@/user/' + id + '?username=' + username, {
            headers: {
                'Authorization': LoginStore.getToken()
            }
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            return {};
        });
    }

    static getUsers() {
        return fetch('https://flow.manywho.com/api/admin/1/directory/@/user', {
            headers: {
                'Authorization': LoginStore.getToken()
            }
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            return [];
        });
    }
}