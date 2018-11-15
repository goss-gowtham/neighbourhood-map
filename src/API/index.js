/*
 Used Foursquare API Developer docs and app for integrating 3rd Party API.
 Link: https://developer.foursquare.com/docs/api/
*/
class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2/"; //used this for reducing code, as it'll be used again and again for getting Map Values
  }
  static auth() {
    const keys = {
      client_id: "1JW4MAO5VCNGX25V3EIVF0FJOJZQZMURATK1BBP33XDXSOOM",
      client_secret: "FJQBITO2ACH4XODVEU2WPWMYZ10AJBED1BQ3Z3PPINKMD02W",
      v:"20181115"
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&"); //v as of developing date
  }
  static urlBuilder(params) {
    if(!params) {
      return ""
    }
    return Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, params) {
    let request = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(params)}`,request).then(response => response.json());
  }
}

export default class fourSquare {
  static search(params) {
    return Helper.simpleFetch("venues/search", "GET", params);
  }
  static getVenue(VENUE_ID) {
    return Helper.simpleFetch(`venues/${VENUE_ID}`,"GET");
  }
  static getPhotos(VENUE_ID) {
    return Helper.simpleFetch(`venues/${VENUE_ID}/photos`,"GET");
  }
}
