<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $laptops = [
            ['name' => 'HP Omen',               'brand' => 'HP',     'short_des' => 'Omen',             'price' => 87800,  'actual_price' => 90000,  'discount' => '10% off', 'image' => '/assets/Hp.jpg'],
            ['name' => 'ASUS ROG',               'brand' => 'ASUS',   'short_des' => 'ROG',              'price' => 88000,  'actual_price' => 100000, 'discount' => '20% off', 'image' => '/assets/asus.jpg'],
            ['name' => 'DELL XPS 15',            'brand' => 'DELL',   'short_des' => 'XPS 15',           'price' => 113000, 'actual_price' => 139990, 'discount' => '15% off', 'image' => '/assets/DELL_XPS_15_9510_87YR3.jpg'],
            ['name' => 'ACER Predator Helios',   'brand' => 'ACER',   'short_des' => 'Predator Helios',  'price' => 117000, 'actual_price' => 129990, 'discount' => '30% off', 'image' => '/assets/acer predator helios 300.jpg'],
            ['name' => 'MSI GF63 Gaming',        'brand' => 'MSI',    'short_des' => 'GF63 Gaming',      'price' => 23990,  'actual_price' => 30099,  'discount' => '16% off', 'image' => '/assets/Msi.jpg'],
            ['name' => 'HP Pavilion 7',          'brand' => 'HP',     'short_des' => 'Pavilion 7',       'price' => 10990,  'actual_price' => 12399,  'discount' => '10% off', 'image' => '/assets/Hp pavillion.jpg'],
            ['name' => 'APPLE MacBook 7',        'brand' => 'APPLE',  'short_des' => 'MacBook 7',        'price' => 22990,  'actual_price' => 28099,  'discount' => '20% off', 'image' => '/assets/apple.jpg'],
            ['name' => 'LENOVO ThinkBook 15',    'brand' => 'LENOVO', 'short_des' => 'ThinkBook 15',     'price' => 8099,   'actual_price' => 10090,  'discount' => '10% off', 'image' => '/assets/Lenovo thick book 15.jpg'],
        ];

        $mobiles = [
            ['name' => 'APPLE iPhone 13 Pro',       'brand' => 'APPLE',    'short_des' => 'iPhone 13 Pro',  'price' => 87800, 'actual_price' => 90000,  'discount' => '10% off', 'image' => '/assets/Apple iphone 13.jpg'],
            ['name' => 'SAMSUNG S22 Ultra',          'brand' => 'SAMSUNG',  'short_des' => 'S22 Ultra',      'price' => 88000, 'actual_price' => 100000, 'discount' => '20% off', 'image' => '/assets/Samsung s22 ultra.jpg'],
            ['name' => 'VIVO Y21',                   'brand' => 'VIVO',     'short_des' => 'Y21',            'price' => 11300, 'actual_price' => 13990,  'discount' => '15% off', 'image' => '/assets/Vivo y21.jpg'],
            ['name' => 'ONEPLUS OnePlus 10 Pro',     'brand' => 'ONEPLUS',  'short_des' => 'OnePlus 10 Pro', 'price' => 24000, 'actual_price' => 30000,  'discount' => '30% off', 'image' => '/assets/Oneplus 10 pro.jpg'],
            ['name' => 'MOTOROLA Moto G',            'brand' => 'MOTOROLA', 'short_des' => 'Moto G',         'price' => 11700, 'actual_price' => 12990,  'discount' => '17% off', 'image' => '/assets/Mortolo gp.jpg'],
            ['name' => 'NOKIA Nokia 9',              'brand' => 'NOKIA',    'short_des' => 'Nokia 9',        'price' => 10990, 'actual_price' => 12399,  'discount' => '10% off', 'image' => '/assets/Nokia 9.jpg'],
            ['name' => 'OPPO Oppo F15',              'brand' => 'OPPO',     'short_des' => 'Oppo F15',       'price' => 22990, 'actual_price' => 28099,  'discount' => '20% off', 'image' => '/assets/oppo f15.jpg'],
            ['name' => 'SAMSUNG Samsung A22',        'brand' => 'SAMSUNG',  'short_des' => 'Samsung A22',    'price' => 8099,  'actual_price' => 10090,  'discount' => '10% off', 'image' => '/assets/Samsung A22.jpg'],
        ];

        $televisions = [
            ['name' => 'SAMSUNG Crystal UHD', 'brand' => 'SAMSUNG',  'short_des' => 'Crystal UHD', 'price' => 87800, 'actual_price' => 90000,  'discount' => '10% off', 'image' => '/assets/samsung crystal tv.jpg'],
            ['name' => 'Skyworth Smart QLED', 'brand' => 'Skyworth', 'short_des' => 'Smart QLED',  'price' => 88000, 'actual_price' => 100000, 'discount' => '20% off', 'image' => '/assets/skyworth tv.jpg'],
            ['name' => 'SONY Ultra Max',       'brand' => 'SONY',     'short_des' => 'Ultra Max',   'price' => 11300, 'actual_price' => 13990,  'discount' => '15% off', 'image' => '/assets/sony tv.jpg'],
            ['name' => 'TCL TCL 720',          'brand' => 'TCL',      'short_des' => 'TCL 720',     'price' => 24000, 'actual_price' => 30000,  'discount' => '30% off', 'image' => '/assets/tcl Tv.jpg'],
            ['name' => 'APPLE Apple TV',       'brand' => 'APPLE',    'short_des' => 'Apple TV',    'price' => 11700, 'actual_price' => 12990,  'discount' => '17% off', 'image' => '/assets/Tv.jpg'],
            ['name' => 'MI Mi TV 12',          'brand' => 'MI',       'short_des' => 'Mi TV 12',    'price' => 23990, 'actual_price' => 30099,  'discount' => '16% off', 'image' => '/assets/Mi tv.jpg'],
            ['name' => 'LG Smart 11i',         'brand' => 'LG',       'short_des' => 'Smart 11i',   'price' => 10990, 'actual_price' => 12399,  'discount' => '10% off', 'image' => '/assets/lg smart tv.jpg'],
            ['name' => 'FORTEX Fortex 1+',     'brand' => 'FORTEX',   'short_des' => 'Fortex 1+',   'price' => 22990, 'actual_price' => 28099,  'discount' => '20% off', 'image' => '/assets/fortex tv.jpg'],
        ];

        $now = now();

        foreach ($laptops as $item) {
            DB::table('products')->insert(array_merge($item, ['category' => 'laptop', 'created_at' => $now, 'updated_at' => $now]));
        }
        foreach ($mobiles as $item) {
            DB::table('products')->insert(array_merge($item, ['category' => 'mobile', 'created_at' => $now, 'updated_at' => $now]));
        }
        foreach ($televisions as $item) {
            DB::table('products')->insert(array_merge($item, ['category' => 'television', 'created_at' => $now, 'updated_at' => $now]));
        }
    }
}