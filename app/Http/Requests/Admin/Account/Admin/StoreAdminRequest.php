<?php

namespace App\Http\Requests\Admin\Account\Admin;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Admin;

class StoreAdminRequest extends FormRequest
{
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
            'email' => 'required|string|lowercase|email|max:255|unique:'.Admin::class,
        ];
    }

    public function messages(): array
    {
        return [
            'kana.regex' => 'かなは、ひらがな、全角・半角スペース、全角・半角数字のみで入力してください。',
        ];
    }
}
