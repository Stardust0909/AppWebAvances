import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { HomePage } from '../home/home';

import { Webservice } from '../../providers/webservice';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  auteurs = [];
  auteur;  
  thing;

  modifyautorForm: FormGroup;

  formNotActive = true;
  formActive = false;

  constructor(public navCtrl: NavController,
              private webservice: Webservice,
              private formBuilder: FormBuilder) {
                
      var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/get';

      this.webservice.get(url).subscribe((result => {
        this.auteurs=result;
        console.log(this.auteurs);
      }),
      (err => {
        console.log("Quelque chose ne va pas...")
      }));
  }

  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }

  new() {
    this.navCtrl.push(HomePage);
  }

  remove(id) {

    var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/del/' + id;

    this.webservice.remove(url).subscribe((result => {
        console.log('Auteur éliminé!');
        //this.navCtrl.setRoot(ListPage);
    }),
    (err => {
      console.log('Ca ne marche pas....');
    }));
  }

  edit(person) {

    this.formNotActive = false;
    this.formActive = true;

    this.modifyautorForm = this.formBuilder.group({
      name: [person.nom],// pour mettre une valeur par défaut, il suffit de remplir les ''
      surname: [person.prenom],
      email: [person.email],
      id: [person.id]
    })

  }

  add() {
    
    var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/edit/' + this.modifyautorForm.value.id;

    //appelle de la fonction put
    this.webservice.put(url, this.modifyautorForm.value, 'add').subscribe((result) => {
      //si on a un résultat
        this.formNotActive = true;
        this.formActive = false;
        this.navCtrl.setRoot(ListPage);
      },(err) => {
        console.log("Impossible de mettre les données à jour pour l'instant"); //sinon...
      });

    //console.log(this.modifyautorForm.value);
    //this.navCtrl.setRoot(ListPage);    

  }

  cancel() { 
    this.formNotActive = true;
    this.formActive = false;
  }

}
