<?php

namespace App\DataFixtures;

use App\Entity\LandValue;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;


class AppFixtures extends Fixture{

    public function load(ObjectManager $manager): void
    {
        ini_set('memory_limit', '4096M');
        set_time_limit(0);
        $codePostal_to_regionNom = array(
            '01'=> 'Auvergne-Rhône-Alpes',
            '02'=>'Nord-Pas-de-Calais-Picardie',
            '03'=>'Auvergne-Rhône-Alpes',
            '04'=>'Provence-Alpes-Côte d\'Azur',
            '05'=>'Provence-Alpes-Côte d\'Azur',
            '06'=>'Provence-Alpes-Côte d\'Azur',
            '07'=>'Auvergne-Rhône-Alpes',
            '08'=>'Alsace-Champagne-Ardenne-Lorraine',
            '09'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '10'=>'Alsace-Champagne-Ardenne-Lorraine',
            '11'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '12'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '13'=>'Provence-Alpes-Côte d\'Azur',
            '14'=>'Normandie',
            '15'=>'Auvergne-Rhône-Alpes',
            '16'=>'Aquitaine-Limousin-Poitou-Charentes',
            '17'=>'Aquitaine-Limousin-Poitou-Charentes',
            '18'=>'Centre-Val de Loire',
            '19'=>'Aquitaine-Limousin-Poitou-Charentes',
            '2A'=>'Corse',
            '2B'=>'Corse',
            '21'=>"Bourgogne-Franche-Comté",
            '22'=>"Bretagne",
            '23'=>'Aquitaine-Limousin-Poitou-Charentes',
            '24'=>'Aquitaine-Limousin-Poitou-Charentes',
            '25'=>'Bourgogne-Franche-Comté',
            '26'=>'Auvergne-Rhône-Alpes',
            '27'=>'Normandie',
            '28'=>'Centre-Val de Loire',
            '29'=>'Bretagne',
            '30'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '31'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '32'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '33'=>'Aquitaine-Limousin-Poitou-Charentes',
            '34'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '35'=>'Bretagne',
            '36'=>'Centre-Val de Loire',
            '37'=>'Centre-Val de Loire',
            '38'=>'Auvergne-Rhône-Alpes',
            '39'=>'Bourgogne-Franche-Comté',
            '40'=>'Aquitaine-Limousin-Poitou-Charentes',
            '41'=>'Centre-Val de Loire',
            '42'=>'Auvergne-Rhône-Alpes',
            '43'=>'Auvergne-Rhône-Alpes',
            '44'=>'Pays de la Loire',
            '45'=>'Centre-Val de Loire',
            '46'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '47'=>'Aquitaine-Limousin-Poitou-Charentes',
            '48'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '49'=>'Pays de la Loire',
            '50'=>'Normandie',
            '51'=>'Alsace-Champagne-Ardenne-Lorraine',
            '52'=>'Alsace-Champagne-Ardenne-Lorraine',
            '53'=>'Pays de la Loire',
            '54'=>'Alsace-Champagne-Ardenne-Lorraine',
            '55'=>'Alsace-Champagne-Ardenne-Lorraine',
            '56'=>'Bretagne',
            '57'=>'Alsace-Champagne-Ardenne-Lorraine',
            '58'=>'Bourgogne-Franche-Comté',
            '59'=>'Nord-Pas-de-Calais-Picardie',
            '60'=>'Nord-Pas-de-Calais-Picardie',
            '61'=>'Normandie',
            '62'=>'Nord-Pas-de-Calais-Picardie',
            '63'=>'Auvergne-Rhône-Alpes',
            '64'=>'Aquitaine-Limousin-Poitou-Charentes',
            '65'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '66'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '67'=>'Alsace-Champagne-Ardenne-Lorraine',
            '68'=>'Alsace-Champagne-Ardenne-Lorraine',
            '69'=>'Auvergne-Rhône-Alpes',
            '70'=>'Bourgogne-Franche-Comté',
            '71'=>'Bourgogne-Franche-Comté',
            '72'=>'Pays de la Loire',
            '73'=>'Auvergne-Rhône-Alpes',
            '74'=>'Auvergne-Rhône-Alpes',
            '75'=>'Île-de-France',
            '76'=>'Normandie',
            '77'=>'Île-de-France',
            '78'=>'Île-de-France',
            '79'=>'Aquitaine-Limousin-Poitou-Charentes',
            '80'=>'Nord-Pas-de-Calais-Picardie',
            '81'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '82'=>'Languedoc-Roussillon-Midi-Pyrénées',
            '83' => 'Provence-Alpes-Côte d\'Azur',
            '84'=>'Provence-Alpes-Côte d\'Azur',
            '85'=>'Pays de la Loire',
            '86'=>'Aquitaine-Limousin-Poitou-Charentes',
            '87'=>'Aquitaine-Limousin-Poitou-Charentes',
            '88'=>'Alsace-Champagne-Ardenne-Lorraine',
            '89'=>'Bourgogne-Franche-Comté',
            '90'=>'Bourgogne-Franche-Comté',
            '91'=>'Île-de-France',
            '92'=>'Île-de-France',
            '93'=>'Île-de-France',
            '94'=>'Île-de-France',
            '95'=>'Île-de-France',
            '971' => 'Guadeloupe',
            '972' => 'Martinique',
            '973' => 'Guyane',
            '974' => 'La Réunion',
            '976' => 'Mayotte'
        );
        $i = 0;
        $rows = $this->read('./src/data/valeursfoncieres-2021-s1.csv');
        foreach($rows as $row) {
            $data = explode("|",$row);
            $i++;
            if(isset($data[9]) && $data[9] == "Vente" && $data[38] != "" && $data[38] != "0" && $data[18] !== "" && ($data[36] == "Appartement" || $data[36] == "Maison")){
                $d = explode("/",$data[8]);
                $date =  new \DateTime();
                $date->setDate($d[2], $d[1], $d[0]);
                $data[10] = str_replace(',', '.', $data[10]);
                $data[38] = str_replace(',', '.', $data[38]);
                echo $i  ." \n";
                $prop = new LandValue();
                $prop->setPriceSurface((float) $data[10]/ (float)$data[38]);
                $prop->setRegion($codePostal_to_regionNom[$data[18]]);
                $prop->setSaleDate($date);
                $manager->persist($prop);
            }
            $data = null;
        }
        $manager->flush();
    }


    public function read(string $filename): \Generator
    {
        $handle = fopen($filename, "r");
        while(!feof($handle)) {
            yield fgets($handle);
        }

        fclose($handle);
    }

}


