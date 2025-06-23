<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('offices')->insert([
            [
                'name' => 'オフィス1',
                'kana' => 'おふぃすいち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス2',
                'kana' => 'おふぃすに',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス3',
                'kana' => 'おふぃすさん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス4',
                'kana' => 'おふぃすよん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス5',
                'kana' => 'おふぃすご',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス6',
                'kana' => 'おふぃすろく',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス7',
                'kana' => 'おふぃすなな',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス8',
                'kana' => 'おふぃすはち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス9',
                'kana' => 'おふぃすきゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス10',
                'kana' => 'おふぃすじゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス11',
                'kana' => 'おふぃすじゅういち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス12',
                'kana' => 'おふぃすじゅうに',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス13',
                'kana' => 'おふぃすじゅうさん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス14',
                'kana' => 'おふぃすじゅうよん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス15',
                'kana' => 'おふぃすじゅうご',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス16',
                'kana' => 'おふぃすじゅうろく',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス17',
                'kana' => 'おふぃすじゅうなな',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス18',
                'kana' => 'おふぃすじゅうはち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス19',
                'kana' => 'おふぃすじゅうきゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス20',
                'kana' => 'おふぃすにじゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス21',
                'kana' => 'おふぃすにじゅういち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス22',
                'kana' => 'おふぃすにじゅうに',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス23',
                'kana' => 'おふぃすにじゅうさん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス24',
                'kana' => 'おふぃすにじゅうよん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス25',
                'kana' => 'おふぃすにじゅうご',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス26',
                'kana' => 'おふぃすにじゅうろく',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス27',
                'kana' => 'おふぃすにじゅうなな',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス28',
                'kana' => 'おふぃすにじゅうはち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス29',
                'kana' => 'おふぃすにじゅうきゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス30',
                'kana' => 'おふぃすさんじゅう',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
