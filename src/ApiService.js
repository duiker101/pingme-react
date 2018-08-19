class ApiService {
    static handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    };

    static getPlayer(name) {
        return fetch(`https://api.riftkit.net/api/euw1/summoner/by-name/${name}`)
            .then(this.handleErrors)
            .then(r => r.json())
            .then(data => {
                if (data.error_code === 404) {
                    throw Error('Player not found');
                } else if (data.error_code > 0) {
                    throw Error('Error finding player');
                }
                return data;
            })
    }

    static getGame(playerId) {
        return fetch(`https://api.riftkit.net/api/euw1/current_game/${playerId}`)
            .then(this.handleErrors)
            .then(r => r.json())
            .then(data => {
                if (data.error_code === 404) {
                    throw Error('Player not in game');
                } else if (data.error_code > 0) {
                    throw Error('Error retrieving game');
                }
                return data;
            })
    }

    static getChampions() {
        return fetch(`https://api.riftkit.net/api/euw1/champions`)
            .then(this.handleErrors)
            .then(r => r.json())
    }

    static getVersions() {
        return fetch(`https://api.riftkit.net/api/euw1/versions`)
            .then(this.handleErrors)
            .then(r => r.json())
    }
}


export default ApiService;