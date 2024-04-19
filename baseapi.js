import fetch from 'node-fetch';

class BaseApiRequest {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint) {
        try {
            const url = `${this.baseUrl}/${endpoint}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to make GET request to ${endpoint}: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to make GET request to ${endpoint}: ${error}`);
        }
    }
}

export default BaseApiRequest;
