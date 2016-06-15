export default class ServicesSource {
    static findAll() {
        return fetch('https://flow.manywho.com/api/draw/1/element/service', {
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