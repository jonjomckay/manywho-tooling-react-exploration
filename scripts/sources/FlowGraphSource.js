import LoginStore from "../stores/LoginStore";

export default class FlowGraphSource {
    static find(id) {
        return fetch('https://flow.manywho.com/api/draw/1/graph/flow/' + id, {
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