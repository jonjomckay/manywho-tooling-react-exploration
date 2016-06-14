export default class FlowsSource {
    static find(id) {
        return fetch('https://flow.manywho.com/api/draw/1/flow/' + id, {
            headers: {
                'Authorization': localStorage.getItem('manywho.authorization')
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
                'Authorization': localStorage.getItem('manywho.authorization')
            }
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            return [];
        });
    }
}