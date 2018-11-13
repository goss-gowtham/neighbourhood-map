{/*
 Used Foursquare API Developer docs and app for integrating 3rd Party API.
 Link: https://developer.foursquare.com/docs/api/
*/}
class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2/"; //used this for reducing code, as it'll be used again and again for getting Map Values
  }
  static auth() {
    const keys = {
      client_id: "MED0F2L2DD0UYQHHP4J3Z2XGTIEF4QGROT00HLKB0OMACX1E",
      client_secret: "3RO5FBNW32T25L15ELJQQSEWHSGMDLY2DOTDFC2WRUACUVXT",
      v:"20181113"
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
