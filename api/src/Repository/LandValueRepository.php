<?php

namespace App\Repository;

use App\Entity\LandValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LandValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method LandValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method LandValue[]    findAll()
 * @method LandValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LandValueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LandValue::class);
    }

    // /**
    //  * @return LandValue[] Returns an array of LandValue objects
    //  */

    public function priceSurfaceByMonth(){

        return $this->createQueryBuilder('l')
            ->select('AVG(l.priceSurface) AS avgPrice, DATE_FORMAT(l.saleDate, \'YYYY-MM\') AS Date  ')
            ->groupBy('Date')
            ->getQuery()
            ->getResult()
        ;
    }

    public function nbSalesByDelta($value, $start, $end){
        $d = match ($value) {
            "year" => 'YYYY',
            "month" => 'YYYY-MM',
            "day" => 'YYYY-MM-dd',
            default => "",
        };
        return $this->createQueryBuilder('l')
            ->select('COUNT(l.priceSurface) AS nb, DATE_FORMAT(l.saleDate, :d) AS Date  ')
            ->setParameter('d', $d)
            ->where('l.saleDate >= :s')
            ->setParameter('s',$start)
            ->andWhere('l.saleDate <= :e')
            ->setParameter('e',$end)
            ->groupBy('Date')
            ->getQuery()
            ->getResult()
        ;
    }

    public function distributionRegionByYear($value){
        $nb = (float) $this->createQueryBuilder('l')
            ->select('COUNT(l.priceSurface)')
            ->Where('DATE_FORMAT(l.saleDate, \'YYYY\') LIKE :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()[0]["1"];

        return $this->createQueryBuilder('l')
            ->select('(COUNT(l.priceSurface)*100.0)/:nb AS distribution, l.region')
            ->Where('DATE_FORMAT(l.saleDate, \'YYYY\') LIKE :val')
            ->setParameter('val', $value)
            ->setParameter('nb', $nb)
            ->groupBy('l.region')
            ->getQuery()
            ->getResult()
        ;
    }

}
