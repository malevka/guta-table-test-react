/**
 * Loads data from giving url
 * @param {string} url Url for fetch data
 * @return {Promise} 
 */

const getData = (url) => {
    return fetch(url)
    .then(response => response.json())
    .catch(error => error);
};
export default getData