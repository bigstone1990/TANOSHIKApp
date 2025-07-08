<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    protected $fillable = [
        'name',
        'kana',
        'created_by',
        'updated_by',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
