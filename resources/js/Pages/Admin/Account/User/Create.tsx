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

type Office = {
    id: number
    name: string
}

type CreateProps = PageProps<{
    roleTypeOptions: RoleTypeOption[]
    offices: Office[]
}>

export default function Create({ roleTypeOptions, offices }: CreateProps) {
    const officeOptions = offices.map(office => ({
        label: office.name,
        value: String(office.id),
    }))

    const { data, setData, post, processing, errors } = useForm<{
        name: string
        kana: string
        email: string
        role: string
        office: string
        canManageJobPostings: boolean
        canManageGroupings: boolean
    }>({
        name: '',
        kana: '',
        email: '',
        role: '',
        office: '',
        canManageJobPostings: false,
        canManageGroupings: false,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('admin.account.users.store'))
    }

    return (
        <AuthenticatedLayout>
            <Head title="ユーザー作成" />

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
                                            ユーザー一覧
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>ユーザー作成</BreadcrumbPage>
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
                                    ユーザー作成
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    ユーザーを作成できます。
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
                                            placeholder="ユーザー"
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
                                            placeholder="ゆーざー"
                                            required
                                            onChange={(e) => setData('kana', e.target.value)}
                                        />

                                        <InputError message={errors.kana} />
                                    </div>

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
                                        <Label htmlFor="role">役割</Label>

                                        <Combobox
                                            id="role"
                                            className="font-normal flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                                            options={roleTypeOptions}
                                            value={data.role}
                                            onValueChange={(value) => setData('role', value)}
                                            placeholder="役割を選択してください..."
                                        />

                                        <InputError message={errors.role} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="office">所属事業所</Label>

                                        <Combobox
                                            id="office"
                                            className="font-normal flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                                            options={officeOptions}
                                            value={data.office}
                                            onValueChange={(value) => setData('office', value)}
                                            placeholder="所属事業所を選択してください..."
                                        />

                                        <InputError message={errors.office} />
                                    </div>

                                    <div className="grid gap-2">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            権限設定
                                        </p>

                                        <div className="space-y-4">
                                            <Label
                                                htmlFor="canManageJobPostings"
                                                className="gap-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="space-y-0.5">
                                                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        求人管理機能<br />
                                                        <span className="text-muted-foreground text-sm font-normal">
                                                            求人の管理ができるようになります
                                                        </span>
                                                    </div>
                                                </div>
                                                <Switch
                                                    id="canManageJobPostings"
                                                    checked={data.canManageJobPostings}
                                                    onCheckedChange={(checked) => setData('canManageJobPostings', checked)}
                                                />
                                            </Label>

                                            <Label
                                                htmlFor="canManageGroupings"
                                                className="gap-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="space-y-0.5">
                                                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        グループ管理機能<br />
                                                        <span className="text-muted-foreground text-sm font-normal">
                                                            グループの管理ができるようになります
                                                        </span>
                                                    </div>
                                                </div>
                                                <Switch
                                                    id="canManageGroupings"
                                                    checked={data.canManageGroupings}
                                                    onCheckedChange={(checked) => setData('canManageGroupings', checked)}
                                                />
                                            </Label>
                                        </div>

                                        <InputError message={errors.canManageJobPostings} />
                                        <InputError message={errors.canManageGroupings} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.account.users.index')}
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
