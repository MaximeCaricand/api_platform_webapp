<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

/**
 * Classe pour tester l'operation pour récupérer les donnees du nombre de ventes (mutations) par jour, semaine, mois, année, pour un intervalle de temps donne
 */

class nbSaleByTest extends ApiTestCase{

    use RefreshDatabaseTrait;

    public function testnbSaleByDay(){
        $response = static::createClient()->request('GET', '/land_values/nbSaleBy/day/2018-01-01/2021-01-01');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection'
        ]);

        $this->assertIsInt(intval($response->toArray()['hydra:member'][0]['nb']));

        $this->assertEquals(10, strlen($response->toArray()['hydra:member'][0]['Date']));

        $this->assertNotCount(0, $response->toArray()['hydra:member']);
    }

    public function testNbSaleByMonth(){
        $response = static::createClient()->request('GET', '/land_values/nbSaleBy/month/2018-01-01/2021-01-01');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection'
        ]);

        $this->assertIsInt(intval($response->toArray()['hydra:member'][0]['nb']));

        $this->assertEquals(7, strlen($response->toArray()['hydra:member'][0]['Date']));

        $this->assertNotCount(0, $response->toArray()['hydra:member']);
    }

    public function testNbSaleByYear(){
        $response = static::createClient()->request('GET', '/land_values/nbSaleBy/year/2018-01-01/2021-01-01');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection'
        ]);

        $this->assertIsInt(intval($response->toArray()['hydra:member'][0]['nb']));

        $this->assertEquals(4, strlen($response->toArray()['hydra:member'][0]['Date']));

        $this->assertNotCount(0, $response->toArray()['hydra:member']);
    }

    public function testInvalidSaleBy(){
        $response = static::createClient()->request('GET', '/land_values/nbSaleBy/');
        $this->assertResponseStatusCodeSame(404);

    }


}
