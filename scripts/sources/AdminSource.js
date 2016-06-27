import LoginStore from '../stores/LoginStore';

export default class AdminSource {
    static fetchTenant() {
        return fetch('https://flow.manywho.com/api/admin/1/tenant?includeSubtenants=true', {
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
}