<?php

namespace Stardust\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('StardustPlatformBundle:Default:index.html.twig');
    }
}
