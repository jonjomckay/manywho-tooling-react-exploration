import LoginStore from "../stores/LoginStore";

export default class ElementSource {
    static find(id, flow, editingToken) {
        return fetch('https://flow.manywho.com/api/draw/1/flow/' + flow + '/' + editingToken + '/element/map/' + id, {
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

    static update(flow, editingToken, element) {
        return fetch('https://flow.manywho.com/api/draw/1/flow/' + flow + '/' + editingToken + '/element/map', {
            method: 'POST',
            headers: {
                'Authorization': LoginStore.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }

            return {};
        });
    }
}