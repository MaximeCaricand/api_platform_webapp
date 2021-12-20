<?php

namespace App\Controller;

use App\Repository\LandValueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class GetNbSalesbyDelta extends AbstractController
{
    public function __invoke(Request $request, LandValueRepository $Repository, string $delta, string $start, string $end)
    {
        if($delta == "year" || $delta == "month" || $delta == "day"){
            return $Repository->nbSalesByDelta($delta, $start , $end);
        }else{
            return null;
        }

    }
}

