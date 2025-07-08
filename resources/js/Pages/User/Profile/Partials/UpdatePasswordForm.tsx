import InputError from '@/Components/InputError'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useRef, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string
}) {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        put(route('user.password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current?.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current?.focus()
                }
            },
        })
    }, [put, reset])

    return (
        <section className={className}>
            <header className="flex flex-col space-y-1.5">
                <h2 className="font-semibold tracking-tight text-xl">
                    パスワード変更
                </h2>

                <p className="text-sm text-muted-foreground">
                    パスワードを変更できます。<br />
                    <span className="text-red-600 font-medium">
                        ※スマートフォンでキーボード操作ができない場合は、お手数ですが、PCから操作をお願いいたします。
                    </span>
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">現在のパスワード</Label>

                        <Input
                            id="current_password"
                            type="password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            autoComplete="current-password"
                            required
                            onChange={(e) => setData('current_password', e.target.value)}
                        />

                        <InputError message={errors.current_password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">新しいパスワード</Label>

                        <Input
                            id="password"
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            autoComplete="new-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">新しいパスワード確認用</Label>

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
