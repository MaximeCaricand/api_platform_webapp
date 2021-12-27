<?php

use App\Entity\LandValue;
use App\utils\DataManager;
use App\utils\RegionName;
use Doctrine\Persistence\ObjectManager;

function saveLandValueFromFile(string $file, ObjectManager $manager){
    ini_set('memory_limit', '1024M');
    set_time_limit(0);
    $i = 0;
    $pourcent = 0;
    $rows = read(DataManager::$pathDir.$file);
    $nbT = DataManager::$nbLandValuesByFile[$file];
    echo "__________________________________________________\n";
    echo "Save in File: ".$file .":\n|";
    foreach ($rows as $row) {
        $data = explode("|", $row);

        if (isLineToKeep($data)) {
            $i++;
            $d = explode("/", $data[8]);
            $date = new \DateTime();
            $date->setDate($d[2], $d[1], $d[0]);
            $data[10] = str_replace(',', '.', $data[10]);
            $data[38] = str_replace(',', '.', $data[38]);
            $landValue = new LandValue();
            $landValue->setPriceSurface((float)$data[10] / (float)$data[38]);
            $landValue->setRegion(RegionName::getRegionName($data[18]));
            $landValue->setSaleDate($date);
            $manager->persist($landValue);
            if (intval(($i*100)/$nbT) == $pourcent+2){
                $pourcent = intval(($i*100)/$nbT);
                echo "-";
            }

            if ($i % 100000 == 0) {
                $manager->flush();
                $manager->clear();
                gc_collect_cycles();
            }
        }
    }
    echo "| -> ". $i . " nb land values to save \n";
    $manager->flush();
    $manager->clear();
    gc_collect_cycles();
}

function read(string $filename): \Generator {
    $handle = fopen($filename, "r");
    while (!feof($handle)) {
        yield fgets($handle);
    }
    fclose($handle);
}

function isLineToKeep(array $line):bool {
    return(
        isset($line[9]) &&
        $line[9] == "Vente" &&
        $line[38] != "" &&
        $line[38] != "0" &&
        $line[18] !== "" &&
        ($line[36] == "Appartement" || $line[36] == "Maison"));
}