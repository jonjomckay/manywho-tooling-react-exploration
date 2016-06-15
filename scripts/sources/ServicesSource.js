import LoginStore from '../stores/LoginStore';

export default class ServicesSource {
    static findAll() {
        return fetch('https://flow.manywho.com/api/draw/1/element/service', {
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