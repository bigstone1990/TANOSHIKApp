import InputError from '@/Components/InputError'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ResetPasswordProps = {
    token: string
    email: string
}

type FormDataType = {
    token: string
    email: string
    password: string
    password_confirmation: string
}

export default function ResetPassword({
    token,
    email,
}: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<FormDataType>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        post(route('user.password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }, [post, reset])

    return (
        <GuestLayout>
            <Head title="パスワードリセット" />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">パスワードリセット</CardTitle>
                        <CardDescription>
                            パスワードを再設定してください
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">メールアドレス</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            autoComplete="username"
                                            placeholder="user@example.com"
                                            required
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">パスワード</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            autoFocus
                                            required
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">確認用パスワード</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            required
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        パスワードリセット
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    )
}
