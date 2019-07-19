/**
 * Class to wrap error messages and HTTP error codes
 */
class ApiError extends Error {
    constructor(code, m) {
        super(m);
        this.code = code;
    }
}

class Apis {
    /**
     * Classic catch of errors from fetch(). fetch() doesn't trigger a catch on code != 200.
     * @param response
     * @returns {{ok}|Object}
     */
    static handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    };

    static getPlayer(name,country) {
        return fetch(`https://api.riftkit.net/api/${country}/summoner/by-name/${name}`)
            .then(this.handleErrors)
            .then(r => r.json())
            .then(data => {
                if (data.error_code === 404) {
                    throw new ApiError(data.error_code, 'Player not found');
                } else if (data.error_code > 0) {
                    throw new ApiError(data.error_code, 'Error finding player');
                }
                return data;
            })
    }

    static getGame(playerId,country) {
        return fetch(`https://api.riftkit.net/api/${country}/current_game/${playerId}`)
            .then(this.handleErrors)
            .then(r => r.json())
            .then(data => {
                if (data.error_code === 404) {
                    throw new ApiError(data.error_code, 'Player not in game');
                } else if (data.error_code > 0) {
                    throw new ApiError(data.error_code, 'Error retrieving game');
                }
                return data;
            })
    }

    static getChampions(country) {
        return fetch(`https://api.riftkit.net/api/${country}/champions/small`)
            .then(this.handleErrors)
            .then(r => r.json())
    }

    static getVersions(country) {
        return fetch(`https://api.riftkit.net/api/${country}/versions`)
            .then(this.handleErrors)
            .then(r => r.json())
    }
}


export {Apis, ApiError};
