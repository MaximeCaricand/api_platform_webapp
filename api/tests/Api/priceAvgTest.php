<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

/**
 * Classe pour tester l'operation pour récupérer les donnees mois par mois de l’évolutions du prix de vente moyen du mètre carré pour les ventes
 */

class priceAvgTest extends ApiTestCase{

    use RefreshDatabaseTrait;

    public function testPriceAvgTest(){
        $response = static::createClient()->request('GET', '/land_values/priceAvg');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection'
        ]);

        $this->assertIsFloat(floatval($response->toArray()['hydra:member'][0]['avgPrice']));

        $this->assertNotCount(0, $response->toArray()['hydra:member']);
    }


}
