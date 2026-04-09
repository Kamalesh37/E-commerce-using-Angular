<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_email',
        'product_id',
        'quantity',
        'total_price',
        'status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}