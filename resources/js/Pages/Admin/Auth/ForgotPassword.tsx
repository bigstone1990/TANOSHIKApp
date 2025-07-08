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

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        post(route('admin.password.email'))
    }, [post])

    return (
        <GuestLayout>
            <Head title="パスワードを忘れましたか？" />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">パスワードを忘れましたか？</CardTitle>
                        <CardDescription>
                            登録しているメールアドレスに<br />
                            パスワードリセット用リンクを送ることができます。
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
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        パスワードリセットメール送信
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    登録しているメールアドレスを忘れた方や<br />
                                    パスワードリセットメールが届かない方は<br />
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
