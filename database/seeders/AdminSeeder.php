<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => '管理者1',
                'kana' => 'かんりしゃいち',
                'email' => 'admin1@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => '管理者2',
                'kana' => 'かんりしゃに',
                'email' => 'admin2@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => '管理者3',
                'kana' => 'かんりしゃさん',
                'email' => 'admin3@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => '管理者4',
                'kana' => 'かんりしゃよん',
                'email' => 'admin4@test.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => '管理者5',
                'kana' => 'かんりしゃご',
                'email' => 'admin5@test.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
