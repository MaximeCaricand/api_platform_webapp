<?php

namespace App\DataFixtures\Providers;

use App\utils\RegionName;

class RegionProvider{

    public function region(): string {
        return RegionName::getRandomRegion();
    }

}