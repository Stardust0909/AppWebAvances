import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Webservice } from '../../providers/webservice';

import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private webservice: Webservice,
              private formBuilder: FormBuilder) {
  }


  ionViewDidLoad() {
    console.log('Hello Home Page');
  }


  //fonction pour ajouter un nouvel auteur
  add(name,surname,email){
    console.log("Bonjour "+surname+" "+name+"!");

    var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/add';

    var tableau = [name, surname, email];

    //appelle de la fonction “post” du webservice en envoyant le tableau en paramètre
    this.webservice.post(url,tableau,'add').subscribe((result => {
      console.log(result);

      //si resultat ok, on est renvoyé à la page d’accueil
      this.navCtrl.setRoot(ListPage);
    }),
    (err => { //sinon...
      console.log("Quelque chose ne va pas...");
    }));

  }

}