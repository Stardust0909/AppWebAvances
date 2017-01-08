<?php

namespace ArticlesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use ArticlesBundle\Entity\Auteur;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('ArticlesBundle:Default:index.html.twig');
    }

    /**
     * @Route("/api/auteur/add")
     * @Method("POST")
     */
    public function addAuteur(Request $request) {
    //méthode effectuée si une requête POST est envoyée depuis Angular
    //API est définie ci-dessus
 
        //récupération des données envoyées avec la requête
        $name = $request->get('addname');
        $surname = $request->get('addsurname');
        $email = $request->get('addemail');

        //création d’un nouvel Auteur (défini dans Entity Auteur.php)
        $auteur = new Auteur();

        $auteur->setNom($name);
        $auteur->setPrenom($surname);
        $auteur->setEmail($email);

        //envoi du nouvel auteur à la base de données
        $em = $this->getDoctrine()->getManager();
        $em->persist($auteur);
        $em->flush();

        //réponse envoyée au front-end
        return new Response("Nouvel auteur créé!");
    }

    /**
     * @Route("/api/auteur/get")
     * @Method("GET")
     */
    public function getAuteur() {
    //méthode effectuée si une requête GET est envoyée depuis Angular
    //API est définie ci-dessus

        //récupération de tous les auteurs depuis la base de données
        $auteur = $this->getDoctrine()
            ->getRepository('ArticlesBundle:Auteur')
            ->findAll();

        if (!$auteur) {
        throw $this->createNotFoundException(
        'No autor found for id '.$id
        ); 
        }

        $testBonjour = array();
        $thing;

        //remplissage d’un tableau avec tous les auteurs
        foreach($auteur as $thing){
            $testBonjour[] = [array('nom' => $thing->getNom(), 'prenom' => $thing->getPrenom(), 'email' => $thing->getEmail(), 'id' => $thing->getId())];
        }
            
        //envoi du tableau vers le front-end sous format json
        return new JsonResponse($testBonjour);
    }

    /**
     * @Route("/api/auteur/del/{id}")
     * @Method("DELETE")
     */
    public function deleteAuteur($id) {
    //méthode effectuée si une requête DELETE est envoyée depuis Angular
    //API est définie ci-dessus

        //récupération de l’auteur ayant l’id envoyé depuis Angular
        $auteur = $this->getDoctrine()
            ->getRepository('ArticlesBundle:Auteur')
            ->find($id);

        //si pas de correspondance trouvée, erreur est renvoyée
        if (!$auteur) {
        throw $this->createNotFoundException(
        'No autor found for id '.$id
        ); 
        }

        //suppression de cet auteur de la base de données
        $em = $this->getDoctrine()->getManager();
        $em->remove($auteur);
        $em->flush();

        //réponse envoyée au front-end
        return new Response("Auteur supprimé!");
    }

    /**
     * @Route("/api/auteur/edit/{id}")
     * @Method("PUT")
     */
    public function editAuteur(Request $request) {
    //méthode effectuée si une requête PUT est envoyée depuis Angular
    //API est définie ci-dessus

        //récupération des données envoyées avec la requête
        $name = $request->get('addname');
        $surname = $request->get('addsurname');
        $email = $request->get('addemail');
        $id = $request->get('addid');

        if (!$name) {
        throw $this->createNotFoundException(
        'No name sent'
        ); 
        }
        
        //récupération de l’auteur ayant l’id envoyé depuis Angular
        $auteur = $this->getDoctrine()
            ->getRepository('ArticlesBundle:Auteur')
            ->find($id);

        if (!$auteur) {
        throw $this->createNotFoundException(
        'No autor found for id '.$id
        ); 
        }

        //remplacement des valeurs de l’auteur récupéré par les nouvelles
        $auteur->setNom($name);
        $auteur->setPrenom($surname);
        $auteur->setEmail($email);

        //enregistrement des changements dans la base de données
        $em = $this->getDoctrine()->getManager();
        $em->persist($auteur);
        $em->flush();

        //réponse envoyée au front-end
        return new Response("Modifications enregistrées!");
    }
}
