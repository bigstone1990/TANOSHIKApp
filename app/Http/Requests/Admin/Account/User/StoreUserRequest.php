<?php

namespace App\Http\Requests\Admin\Account\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use App\Models\Office;
use Illuminate\Validation\Rule;
use App\Enums\Account\AccountRoleType;


class StoreUserRequest extends FormRequest
{
    protected array $accountRoleTypes;

    public function __construct()
    {
        parent::__construct();
        $this->accountRoleTypes = AccountRoleType::values();
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:30'],
            'kana' => ['required', 'string', 'regex:/^[ぁ-ゖー０-９0-9\x{3000}\x{0020}]+$/u', 'max:255'],
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role' => ['required', 'integer', Rule::in($this->accountRoleTypes)],
            'office' => [
                'required',
                'integer',
                function ($attribute, $value, $fail) {
                    if ($value !== 0 && !Office::where('id', $value)->exists()) {
                        $fail('選択された事業所は存在しません。');
                    }
                },
            ],
            'can_manage_job_postings' => ['required', 'boolean'],
            'can_manage_groupings' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'kana.regex' => 'かなは、ひらがな、全角・半角スペース、全角・半角数字のみで入力してください。',
        ];
    }
}
