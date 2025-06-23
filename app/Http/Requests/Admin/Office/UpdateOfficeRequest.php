<?php

namespace App\Http\Requests\Admin\Office;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficeRequest extends FormRequest
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
            'updatedAt' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
        ];
    }

    public function messages(): array
    {
        return [
            'kana.regex' => 'かなは、ひらがな、全角・半角スペース、全角・半角数字のみで入力してください。',
        ];
    }
}
