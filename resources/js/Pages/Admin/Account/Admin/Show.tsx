import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react';

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

import { PageProps } from '@/types'

type Admin = {
    id: number
    name: string
    kana: string
    email: string
}

type ShowProps = PageProps<{
    admin: Admin
}>

export default function Show({ admin }: ShowProps) {
    return (
        <AuthenticatedLayout>
            <Head title="管理者詳細" />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href={route('admin.account.admins.index')}>
                                            管理者一覧
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>管理者詳細</BreadcrumbPage>
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
                                    管理者詳細
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    管理者の詳細を確認できます。
                                </p>
                            </header>

                            <div className="mt-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">名前</Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            className="bg-gray-100"
                                            value={admin.name}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="kana">かな</Label>

                                        <Input
                                            id="kana"
                                            type="text"
                                            className="bg-gray-100"
                                            value={admin.kana}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">メールアドレス</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            className="bg-gray-100"
                                            value={admin.email}
                                            readOnly
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            as="button"
                                            href={route('admin.account.admins.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
                                        <Link
                                            as="button"
                                            href={route('admin.account.admins.edit', { admin: admin.id })}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                        >
                                            編集する
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </SidebarInset>
        </AuthenticatedLayout>
    )
}
