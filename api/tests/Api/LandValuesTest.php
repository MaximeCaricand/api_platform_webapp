<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\LandValue;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

/**
 * Classe pour tester l'operation pour récupérer toutes les donnees de toutes les ventes
 */

class LandValuesTest extends ApiTestCase{

    use RefreshDatabaseTrait;

    public function testGetCollection(){
        $response = static::createClient()->request('GET', '/land_values');

        $this->assertResponseIsSuccessful();

        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertJsonContains([
            '@context' => '/contexts/LandValue',
            '@id' => '/land_values',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
            'hydra:view' => [
                '@id' => '/land_values?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/land_values?page=1',
                'hydra:last' => '/land_values?page=4',
                'hydra:next' => '/land_values?page=2',
            ],
        ]);

        $this->assertCount(30, $response->toArray()['hydra:member']);

        $this->assertMatchesResourceCollectionJsonSchema(LandValue::class);
    }

}
