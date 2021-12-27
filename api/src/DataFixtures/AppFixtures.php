<?php

namespace App\DataFixtures;

use App\utils\DataManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;


class AppFixtures extends Fixture
{

    public function load(ObjectManager $manager): void{
        $manager->getConnection()->getConfiguration()->setSQLLogger(null);
        $dataManager = new DataManager();
        if($dataManager->download()){
            foreach ($dataManager->fileNames as $name => $url){
                saveLandValueFromFile($name, $manager);
            }
        }
    }



}




