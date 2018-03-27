<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function product_images()
    {
        return $this->hasMany('App\Product_image', 'foreign_key', 'product_id');
    }
}
