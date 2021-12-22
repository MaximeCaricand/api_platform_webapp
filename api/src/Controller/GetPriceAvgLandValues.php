<?php

namespace App\Controller;

use App\Repository\LandValueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class GetPriceAvgLandValues extends AbstractController
{
    public function __invoke(Request $request, LandValueRepository $Repository)
    {
        return $Repository->priceSurfaceByMonth();
    }
}

