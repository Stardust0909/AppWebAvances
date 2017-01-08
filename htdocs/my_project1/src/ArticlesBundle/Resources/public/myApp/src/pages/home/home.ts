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


  //addauteurForm: FormGroup;

  constructor(public navCtrl: NavController,
              private webservice: Webservice,
              private formBuilder: FormBuilder) {
    
  }


  ionViewDidLoad() {
    console.log('Hello Home Page');

    /*this.addauteurForm = this.formBuilder.group({
      nom: ['aze'],// pour mettre une valeur par défaut, il suffit de remplir les ''
      prenom: [],//ajout de validators pour les menus déroulants ion-select; il faut choisir une option pour pouvoir continuer
      email: []
    })*/
  }


  add(name,surname,email){
    //console.log(this.addauteurForm.value);
    console.log("Bonjour "+surname+" "+name+"!");

    var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/add';

    //var tableau = [{name: name},{surname: surname},{email:email}];

    var tableau = [name, surname, email];

    //var data = {name: name} 

    console.log(tableau);

    this.webservice.post(url,tableau,'add').subscribe((result => {
      console.log(result);
    }),
    (err => {
      console.log("Quelque chose ne va pas...")
    }));

    this.navCtrl.setRoot(ListPage);


  }

}