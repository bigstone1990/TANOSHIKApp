<?php

namespace App\Enums\Account;

enum AccountRoleType: int
{
    case UNSET = 0;
    case STAFF = 1;
    case MEMBER = 9;

    public function label(): string
    {
        return match ($this) {
            self::UNSET => '未設定',
            self::STAFF => 'スタッフ',
            self::MEMBER => 'メンバー',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn(self $type) => [
                'label' => $type->label(),
                'value' => $type->value,
            ],
            self::cases()
        );
    }

    public static function values(): array
    {
        return array_map(fn(self $type) => $type->value, self::cases());
    }

    public static function labelByValue(int|string|null $value): ?string
    {
        if ($value === null) {
            return null;
        }

        foreach (self::cases() as $type) {
            if ($type->value === intval($value)) {
                return $type->label();
            }
        }
        return null;
    }
}
