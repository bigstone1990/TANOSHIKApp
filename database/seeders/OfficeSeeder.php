<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('offices')->insert([
            [
                'name' => 'オフィス1',
                'kana' => 'おふぃすいち',
            ],
            [
                'name' => 'オフィス2',
                'kana' => 'おふぃすに',
            ],
            [
                'name' => 'オフィス3',
                'kana' => 'おふぃすさん',
            ],
        ]);
    }
}
