<?php

namespace App\utils;

class DataManager{

    static string $pathDir = "./src/data/";

    public $fileNames = array(
        'valeursfoncieres-2021.txt'=> 'https://www.data.gouv.fr/fr/datasets/r/817204ac-2202-4b4a-98e7-4184d154d98c',
        'valeursfoncieres-2020.txt'=>'https://www.data.gouv.fr/fr/datasets/r/90a98de0-f562-4328-aa16-fe0dd1dca60f',
        'valeursfoncieres-2019.txt'=>'https://www.data.gouv.fr/fr/datasets/r/3004168d-bec4-44d9-a781-ef16f41856a2',
        'valeursfoncieres-2018.txt'=>'https://www.data.gouv.fr/fr/datasets/r/1be77ca5-dc1b-4e50-af2b-0240147e0346',
        'valeursfoncieres-2017.txt'=>'https://www.data.gouv.fr/fr/datasets/r/7161c9f2-3d91-4caf-afa2-cfe535807f04',
        'valeursfoncieres-2016.txt'=>'https://www.data.gouv.fr/fr/datasets/r/0ab442c5-57d1-4139-92c2-19672336401c'
    );

    static $nbLandValuesByFile = array(
        'valeursfoncieres-2021.txt'=> 426468,
        'valeursfoncieres-2020.txt'=> 1149470,
        'valeursfoncieres-2019.txt'=> 1308777,
        'valeursfoncieres-2018.txt'=> 1173407,
        'valeursfoncieres-2017.txt'=> 1192708,
        'valeursfoncieres-2016.txt'=> 575900
    );


    public function __construct(){
        ini_set('memory_limit', '1024M');
        set_time_limit(0);
    }

    public function download():bool {
        echo "__________________________________________________\n";
        foreach ($this->fileNames as $name => $url){
            echo "File: ". $name . " -> ";
            if(!file_exists($this::$pathDir . $name)){
                echo "download ";
                if(file_put_contents($this::$pathDir . $name, file_get_contents($url)))
                    echo "success \n";
                else {
                    echo "error \n";
                    return false;
                }
            }else{
                echo "ok \n";
            }
        }
        gc_collect_cycles();
        return true;
    }

}