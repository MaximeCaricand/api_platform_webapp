<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use App\Controller\GetDistributionRegion;
use App\Controller\GetNbSalesbyDelta;
use App\Controller\GetPriceAvgLandValues;
use App\Repository\LandValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LandValueRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'priceAvg' => [
            'method' => 'GET',
            'path' => 'land_values/priceAvg',
            'controller' => GetPriceAvgLandValues::class
        ],
        'distributionRegion' => [
            'method' => 'GET',
            'path' => 'land_values/distributionRegion/{year}',
            'controller' => GetDistributionRegion::class
        ],
        'nbSaleBy' => [
            'method' => 'GET',
            'path' => 'land_values/nbSaleBy/{delta}/{start}/{end}',
            'controller' => GetNbSalesbyDelta::class
        ],
    ],
    itemOperations: [
        'get'
    ]
)]


class LandValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'date')]
    private $saleDate;

    #[ORM\Column(type: 'string', length: 255)]
    private $region;

    #[ORM\Column(type: 'float')]
    private $priceSurface;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSaleDate(): ?\DateTimeInterface
    {
        return $this->saleDate;
    }

    public function setSaleDate(\DateTimeInterface $saleDate): self
    {
        $this->saleDate = $saleDate;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getPriceSurface(): ?float
    {
        return $this->priceSurface;
    }

    public function setPriceSurface(float $priceSurface): self
    {
        $this->priceSurface = $priceSurface;

        return $this;
    }
}
