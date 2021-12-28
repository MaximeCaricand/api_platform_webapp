<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;


/**
 * Classe pour tester l'operation pour récupérer les donnees de la repartition des ventes par region sur une annee
 */

class DistributionRegionTest extends ApiTestCase{

    use RefreshDatabaseTrait;

    public function testDistributionRegion(){
        $response = static::createClient()->request('GET', '/land_values/distributionRegion/2021');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection'
        ]);

        $this->assertIsFloat(floatval($response->toArray()['hydra:member'][0]['distribution']));

        $this->assertNotCount(0, $response->toArray()['hydra:member']);
    }

    public function testInvalidDistributionRegion(){
        $response = static::createClient()->request('GET', '/land_values/distributionRegion');
        $this->assertResponseStatusCodeSame(404);

    }
}
