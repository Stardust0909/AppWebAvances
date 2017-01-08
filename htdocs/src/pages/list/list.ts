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

  //définition du tableau “auteurs”
  auteurs = [];
  auteur;  
  thing;

  modifyautorForm: FormGroup;

  formNotActive = true;
  formActive = false;

  constructor(public navCtrl: NavController,
              private webservice: Webservice,
              private formBuilder: FormBuilder) {
                
      //url où il faut envoyer la requête GET
      var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/get';

      //appelle de la fonction get du webservice
      this.webservice.get(url).subscribe((result => {
        this.auteurs=result; //stockage du résultat dans le tableau “auteurs”
        console.log(this.auteurs);
      }),
      (err => { //si erreur lors de la requête http
        console.log("Quelque chose ne va pas...")
      }));
  }

  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }

  //envoi à la page home.html si on clique sur le bouton “Ajouter auteur”
  new() {
    this.navCtrl.push(HomePage);
  }

  //fonction pour supprimer un auteur, appelée quand on clique sur un bouton “Supprimer”
  remove(id) {

    var url = 'http://localhost/my_project1/web/app_dev.php/api/auteur/del/' + id;

    //appelle de la fonction “remove” du webservice
    this.webservice.remove(url).subscribe((result => {
        console.log('Auteur éliminé!');
        this.navCtrl.setRoot(ListPage);
    }),
    (err => { //sinon message d’erreur
      console.log('Ca ne marche pas....');
    }));
  }

  //fonction pour modifier un auteur, appelée quand on clique sur un bouton “Modifier”
  edit(person) {

    //permet l’affichage du formulaire de modification et cache la liste des auteurs
    this.formNotActive = false;
    this.formActive = true;

    //création du formulaire
    //préremplit les inputs avec les valeurs que l’auteur a pour l’instant
    this.modifyautorForm = this.formBuilder.group({
      name: [person.nom],
      surname: [person.prenom],
      email: [person.email],
      id: [person.id]
    })

  }

  //fonction pour enregistrer les modifications, appelée quand on clique sur un bouton “Enregistrer”
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
  }

  //recache le formulaire et affiche à nouveau la liste d’auteur sans rien modifier d’autre
  cancel() { 
    this.formNotActive = true;
    this.formActive = false;
  }

}
