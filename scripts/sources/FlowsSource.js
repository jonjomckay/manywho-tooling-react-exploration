import LoginStore from '../stores/LoginStore';

export default class FlowsSource {
    static find(id) {
        return fetch('https://flow.manywho.com/api/draw/1/flow/' + id, {
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
        return fetch('https://flow.manywho.com/api/draw/1/flow', {
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

    static update(flow) {
        return fetch('https://flow.manywho.com/api/draw/1/flow', {
            method: 'POST',
            headers: {
                'Authorization': LoginStore.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flow)
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            return {};
        });
    }
}