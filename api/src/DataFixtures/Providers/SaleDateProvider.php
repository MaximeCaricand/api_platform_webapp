<?php

namespace App\DataFixtures\Providers;

class SaleDateProvider{

    public function saleDate(): \DateTime
    {
        $date = new \DateTime();
        $date->setDate(rand(2017,2021), rand(1,12), rand(1,30));
        return $date;
    }

}