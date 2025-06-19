<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('admins')->insert([
            [
                'name' => '管理者1',
                'kana' => 'かんりしゃいち',
                'email' => 'admin1@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者2',
                'kana' => 'かんりしゃに',
                'email' => 'admin2@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者3',
                'kana' => 'かんりしゃさん',
                'email' => 'admin3@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者4',
                'kana' => 'かんりしゃよん',
                'email' => 'admin4@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者5',
                'kana' => 'かんりしゃご',
                'email' => 'admin5@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者6',
                'kana' => 'かんりしゃろく',
                'email' => 'admin6@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者7',
                'kana' => 'かんりしゃなな',
                'email' => 'admin7@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者8',
                'kana' => 'かんりしゃはち',
                'email' => 'admin8@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者9',
                'kana' => 'かんりしゃきゅう',
                'email' => 'admin9@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者10',
                'kana' => 'かんりしゃじゅう',
                'email' => 'admin10@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者11',
                'kana' => 'かんりしゃじゅういち',
                'email' => 'admin11@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者12',
                'kana' => 'かんりしゃじゅうに',
                'email' => 'admin12@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者13',
                'kana' => 'かんりしゃじゅうさん',
                'email' => 'admin13@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者14',
                'kana' => 'かんりしゃじゅうよん',
                'email' => 'admin14@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者15',
                'kana' => 'かんりしゃじゅうご',
                'email' => 'admin15@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者16',
                'kana' => 'かんりしゃじゅうろく',
                'email' => 'admin16@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者17',
                'kana' => 'かんりしゃじゅうなな',
                'email' => 'admin17@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者18',
                'kana' => 'かんりしゃじゅうはち',
                'email' => 'admin18@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者19',
                'kana' => 'かんりしゃじゅうきゅう',
                'email' => 'admin19@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者20',
                'kana' => 'かんりしゃにじゅう',
                'email' => 'admin20@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者21',
                'kana' => 'かんりしゃにじゅういち',
                'email' => 'admin21@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者22',
                'kana' => 'かんりしゃにじゅうに',
                'email' => 'admin22@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者23',
                'kana' => 'かんりしゃにじゅうさん',
                'email' => 'admin23@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者24',
                'kana' => 'かんりしゃにじゅうよん',
                'email' => 'admin24@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者25',
                'kana' => 'かんりしゃにじゅうご',
                'email' => 'admin25@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者26',
                'kana' => 'かんりしゃにじゅうろく',
                'email' => 'admin26@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者27',
                'kana' => 'かんりしゃにじゅうなな',
                'email' => 'admin27@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者28',
                'kana' => 'かんりしゃにじゅうはち',
                'email' => 'admin28@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者29',
                'kana' => 'かんりしゃにじゅうきゅう',
                'email' => 'admin29@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者30',
                'kana' => 'かんりしゃさんじゅう',
                'email' => 'admin30@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
