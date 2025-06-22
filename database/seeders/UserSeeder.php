<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('users')->insert([
            [
                'office_id' => 1,
                'name' => 'ユーザー1',
                'kana' => 'ゆーざーいち',
                'email' => 'user1@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'ユーザー2',
                'kana' => 'ゆーざーに',
                'email' => 'user2@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'ユーザー3',
                'kana' => 'ゆーざーさん',
                'email' => 'user3@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'ユーザー4',
                'kana' => 'ゆーざーよん',
                'email' => 'user4@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'ユーザー5',
                'kana' => 'ゆーざーご',
                'email' => 'user5@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'ユーザー6',
                'kana' => 'ゆーざーろく',
                'email' => 'user6@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 2,
                'name' => 'ユーザー7',
                'kana' => 'ゆーざーなな',
                'email' => 'user7@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 2,
                'name' => 'ユーザー8',
                'kana' => 'ゆーざーはち',
                'email' => 'user8@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 3,
                'name' => 'ユーザー9',
                'kana' => 'ゆーざーきゅう',
                'email' => 'user9@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => null,
                'name' => 'ユーザー10',
                'kana' => 'ゆーざーじゅう',
                'email' => 'user10@test.com',
                'password' => Hash::make('password'),
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
