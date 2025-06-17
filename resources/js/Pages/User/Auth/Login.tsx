import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
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

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const appName = usePage().props.appName;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="ログイン" />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">おかえりなさい</CardTitle>
                        <CardDescription>
                            {appName}にログインしましょう
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
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            autoFocus
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
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            required
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} />
                                        {canResetPassword && (
                                            <Link
                                            href={route('user.password.request')}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                パスワードを忘れましたか？
                                            </Link>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
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
    );
}
