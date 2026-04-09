<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'short_des',
        'price',
        'actual_price',
        'discount',
        'image',
        'category',   // 'laptop' | 'mobile' | 'television'
    ];

    protected $casts = [
        'price'        => 'integer',
        'actual_price' => 'integer',
    ];
}