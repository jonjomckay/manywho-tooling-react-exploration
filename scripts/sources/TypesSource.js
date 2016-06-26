import LoginStore from '../stores/LoginStore';

export default class TypesSource {
    static find(id) {
        return fetch('https://flow.manywho.com/api/draw/1/element/type/' + id, {
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

    static findAll() {
        return fetch('https://flow.manywho.com/api/draw/1/element/type', {
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