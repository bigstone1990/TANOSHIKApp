<?php

namespace App\Enums\Account;

enum AccountRoleType: string
{
    case STAFF = '1';
    case MEMBER = '9';

    public function label(): string
    {
        return match ($this) {
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

    public static function labelByValue(string|int|null $value): ?string
    {
        foreach (self::cases() as $type) {
            if ($type->value === strval($value)) {
                return $type->label();
            }
        }
        return null;
    }
}
