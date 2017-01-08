import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Webservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Webservice {

  constructor(public http: Http) {
    console.log('Hello Webservice Provider');
  }

  get(url) { //prend url en parametre comme ca on peut utiliser la fonction 
                    //pour récupérer les données de plusieurs pages.

    //loads headers and stored token
    let headers = new Headers();
    //headers.append('format', 'json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .get(url, { headers: headers }) //get-request sended with the headers which contain the authentication token
      .map(res => res.json());
  }


  post(url, data, typeData: string) {

    //loads headers and stored token
    let headers = new Headers();
    //headers.append('format', 'json');//ajoute le format aux headers
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //création d'un nouvel objet URLSearchParams, pour que ce qu'on envoie au serveur soit du bon format
    let form = new URLSearchParams();

    form.set("addname", data[0]);
    form.set("addsurname", data[1]);
    form.set("addemail", data[2]);

    let body = form.toString();

    console.log("Voici data:"+ data);
    console.log("Voici le form:"+ form);
    console.log("Voici le body:"+ body);

    return this.http
      .post(url, body, {headers : headers})
      .map(res => {
        return res;
      });
  }

  remove(url) {
    //loads headers and stored token
    let headers = new Headers();
    //headers.append('format', 'json');//ajoute le format aux headers
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .delete(url, {headers: headers})
      .map(res => {
        return res;
      });
  }

  //fonction qui modifie les données d'une voiture dans la DB grâce à http.put
  put(url, data, typeData:string) {

    //loads headers and stored token
    let headers = new Headers();
    //headers.append('format', 'json');//ajoute le format aux headers
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let form = new URLSearchParams();
    form.set("addname", data[0]);
    form.set("addsurname", data[1]);
    form.set("addemail", data[2]);
  
    let body = form.toString();
    
    return this.http
      .put(url, body, {headers: headers}) //put-request sended with the headers which contain the authentication token
      .map(res => {
        return res;
      });
  }

}
