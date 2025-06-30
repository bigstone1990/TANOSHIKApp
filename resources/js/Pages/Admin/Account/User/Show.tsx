import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

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
import { Switch } from "@/components/ui/switch"
import InputError from '@/Components/InputError'

import Combobox from '@/Components/Combobox'

import { PageProps, Option } from '@/types'

type RoleTypeOption = Option

type User = {
    id: number
    office_id: number | null
    name: string
    kana: string
    email: string
    role: number
    can_manage_job_postings: boolean
    can_manage_groupings: boolean
    office: {
        id: number
        name: string
    } | null
}

type ShowProps = PageProps<{
    user: User
    roleTypeOptions: RoleTypeOption[]
}>

const PERMISSIONS = [
    {
        key: 'can_manage_job_postings',
        label: '求人管理機能',
        description: '求人の管理ができるようになります'
    },
    {
        key: 'can_manage_groupings',
        label: 'グループ分け管理機能',
        description: 'グループ分けの管理ができるようになります'
    },
] as const

export default function Show({ user, roleTypeOptions }: ShowProps) {
    return (
        <AuthenticatedLayout>
            <Head title="ユーザー詳細" />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href={route('admin.account.users.index')}>
                                            ユーザー詳細
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>ユーザー詳細</BreadcrumbPage>
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
                                    ユーザー詳細
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    ユーザーの詳細を確認できます。
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
                                            value={user.name}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="kana">かな</Label>

                                        <Input
                                            id="kana"
                                            type="text"
                                            className="bg-gray-100"
                                            value={user.kana}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">メールアドレス</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            className="bg-gray-100"
                                            value={user.email}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="role">役割</Label>

                                        <Input
                                            id="role"
                                            type="text"
                                            className="bg-gray-100"
                                            value={roleTypeOptions.find(option => option.value === String(user.role))?.label ?? '不明'}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="office">所属事業所</Label>

                                        <Input
                                            id="office"
                                            type="text"
                                            className="bg-gray-100"
                                            value={user.office ? user.office.name : '未所属'}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            権限設定<span className="text-red-600"> *役割によっては機能の一部が制限されます</span>
                                        </p>

                                        <div className="space-y-4">
                                            {PERMISSIONS.map(permission => (
                                                <Label
                                                    key={permission.key}
                                                    htmlFor={permission.key}
                                                    className="gap-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                                                >
                                                    <div className="space-y-0.5">
                                                        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                            {permission.label}<br />
                                                            <span className="text-muted-foreground text-sm font-normal">
                                                                {permission.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Input
                                                        id={permission.key}
                                                        type="text"
                                                        className="bg-gray-100 w-20 text-center"
                                                        value={user[permission.key] === true ? '有効' : '無効'}
                                                        readOnly
                                                    />
                                                </Label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.account.users.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
                                        <Link
                                            href={route('admin.account.users.edit', { user: user.id })}
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
