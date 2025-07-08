import InputError from '@/Components/InputError'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
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
import { Checkbox } from "@/components/ui/checkbox"

type LoginProps = {
    status?: string
    canResetPassword: boolean
}

type FormDataType = {
    email: string
    password: string
    remember: boolean
}

export default function Login({
    status,
    canResetPassword,
}: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<FormDataType>({
        email: '',
        password: '',
        remember: false,
    })

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        post(route('admin.login'), {
            onFinish: () => reset('password'),
        })
    }, [post, reset])

    return (
        <GuestLayout>
            <Head title="管理者ログイン" />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">おかえりなさい</CardTitle>
                        <CardDescription>
                            Webアプリケーションにログインしましょう
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
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
                                            autoFocus
                                            placeholder="admin@example.com"
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
                                            autoComplete="current-password"
                                            required
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} />
                                        {canResetPassword && (
                                            <Link
                                                href={route('admin.password.request')}
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                パスワードを忘れましたか？
                                            </Link>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', checked === true)}
                                        />
                                        <Label htmlFor="remember">Remember me</Label>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        ログイン
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    アカウントをお持ちでない方は<br />
                                    管理者にご連絡ください
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    )
}
