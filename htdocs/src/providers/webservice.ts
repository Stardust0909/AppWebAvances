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

  //requête GET
  get(url) { //prend url en parametre comme ca on peut utiliser la fonction 
                    //pour récupérer les données de plusieurs pages.

    //loads headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .get(url, { headers: headers }) //get-request sended with the headers
      .map(res => res.json()); //résultat renvoyé vers la page d’où on appelle cette fonction, ici sous format json, auquel il faut subscribe
  }


  //requête POST
  post(url, data, typeData: string) {

    //loads headers
    let headers = new Headers();
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
        return res; //résultat renvoyé vers la page d’où on appelle cette fonction auquel il faut subscribe
      });
  }

  //requête DELETE
  remove(url) {
    //loads headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .delete(url, {headers: headers})
      .map(res => {
        return res; //résultat renvoyé vers la page d’où on appelle cette fonction auquel il faut subscribe
      });
  }

  //requête PUT
  put(url, data, typeData:string) {

    //loads headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let form = new URLSearchParams();
    //boucle qui parcourt l'objet data et ajoute un champ dans form pour chaque clé de l'objet data
    for (var key in data) {
      form.set(typeData+key, data[key]);
    }
  
    let body = form.toString();
    
    return this.http
      .put(url, body, {headers: headers}) //put-request sent with the headers
      .map(res => {
        return res; //résultat renvoyé vers la page d’où on appelle cette fonction auquel il faut subscribe
      });
  }

}
