import InputError from '@/Components/InputError'
import { Transition } from '@headlessui/react'
import { useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function UpdateProfileInformation({
    className = '',
}: {
    className?: string
}) {
    const user = usePage().props.auth.user

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            email: user.email,
        })

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        patch(route('admin.profile.update'))
    }, [patch])

    return (
        <section className={className}>
            <header className="flex flex-col space-y-1.5">
                <h2 className="font-semibold tracking-tight text-xl">
                    ユーザー情報
                </h2>

                <p className="text-sm text-muted-foreground">
                    メールアドレスを変更できます。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">名前<span className="text-red-600"> *管理者管理から変更ください</span></Label>

                        <Input
                            id="name"
                            type="text"
                            value={user.name}
                            disabled
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="kana">かな<span className="text-red-600"> *管理者管理から変更ください</span></Label>

                        <Input
                            id="kana"
                            type="text"
                            value={user.kana}
                            disabled
                        />
                    </div>

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

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>保存</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                保存しました
                            </p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    )
}
