import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useCallback } from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import InputError from '@/Components/InputError'

type FormDataType = {
    name: string
    kana: string
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FormDataType>({
        name: '',
        kana: '',
    })

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault()

        post(route('admin.offices.store'))
    }, [post])

    return (
        <AuthenticatedLayout>
            <Head title="事業所作成" />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href={route('admin.offices.index')}>
                                            事業所一覧
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>事業所作成</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="bg-white p-4 border shadow sm:rounded-lg sm:p-8">
                        <section className="max-w-xl">
                            <header className="flex flex-col space-y-1.5">
                                <h2 className="font-semibold tracking-tight text-xl">
                                    事業所作成
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    事業所を作成できます。
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">名前</Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            autoComplete="name"
                                            autoFocus
                                            placeholder="オフィス"
                                            required
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="kana">かな</Label>

                                        <Input
                                            id="kana"
                                            type="text"
                                            value={data.kana}
                                            autoComplete="kana"
                                            placeholder="おふぃす"
                                            required
                                            onChange={(e) => setData('kana', e.target.value)}
                                        />

                                        <InputError message={errors.kana} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.offices.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
                                        <Button type="submit" disabled={processing}>作成する</Button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </SidebarInset>
        </AuthenticatedLayout>
    )
}
