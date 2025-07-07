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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Combobox from '@/Components/Combobox'

import { PageProps, Option } from '@/types'

type User = {
    id: number
    office_id: number | null
    name: string
    kana: string
    email: string
    role: number
    can_manage_job_postings: boolean
    can_manage_groupings: boolean
    updated_at: string
}

type RoleTypeOption = Option

type Office = {
    id: number
    name: string
}

type FormData = {
    name: string
    kana: string
    role: number
    office: number
    can_manage_job_postings: boolean
    can_manage_groupings: boolean
    updated_at: string
}

type EditProps = PageProps<{
    user: User
    roleTypeOptions: RoleTypeOption[]
    offices: Office[]
}>

type PermissionKey = 'can_manage_job_postings' | 'can_manage_groupings'

type Permission = {
    key: PermissionKey
    label: string
    description: string
}

const PERMISSIONS: readonly Permission[] = [
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

export default function Edit({ user, roleTypeOptions, offices }: EditProps) {
    const officeOptions = offices.map(office => ({
        label: office.name,
        value: office.id,
    }))

    const { data, setData, put, delete: destroy, processing, errors } = useForm<FormData>({
        name: user.name,
        kana: user.kana,
        role: user.role,
        office: user.office_id ? user.office_id : 0,
        can_manage_job_postings: user.can_manage_job_postings,
        can_manage_groupings: user.can_manage_groupings,
        updated_at: user.updated_at,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('admin.account.users.update', { user: user.id }))
    }

    const handleDelete: () => void = () => {
        destroy(route('admin.account.users.destroy', { user: user.id }))
    }

    const enableAllPermissions = () => {
        const updates: Partial<FormData> = {}
        PERMISSIONS.forEach(permission => {
            updates[permission.key] = true
        })

        setData(prev => ({ ...prev, ...updates }))
    }

    const disableAllPermissions = () => {
        const updates: Partial<FormData> = {}
        PERMISSIONS.forEach(permission => {
            updates[permission.key] = false
        })

        setData(prev => ({ ...prev, ...updates }))
    }

    const areAllPermissionsEnabled = (): boolean => {
        return PERMISSIONS.every(permission => data[permission.key] === true)
    }

    const areAllPermissionsDisabled = (): boolean => {
        return PERMISSIONS.every(permission => data[permission.key] === false)
    }

    return (
        <AuthenticatedLayout>
            <Head title="ユーザー編集" />

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
                                    <BreadcrumbPage>ユーザー編集</BreadcrumbPage>
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
                                    ユーザー編集
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    ユーザーを編集できます。
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
                                        <Label htmlFor="email">メールアドレス<span className="text-red-600"> *ユーザー設定からのみ変更可能です</span></Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            disabled
                                        />
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
                                            権限設定<span className="text-red-600"> *役割によっては機能の一部が制限されます</span>
                                        </p>

                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={enableAllPermissions}
                                                disabled={areAllPermissionsEnabled()}
                                            >
                                                全て有効
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={disableAllPermissions}
                                                disabled={areAllPermissionsDisabled()}
                                            >
                                                全て無効
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {PERMISSIONS.map(permission => (
                                                <div key={permission.key}>
                                                    <Label
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
                                                        <Switch
                                                            id={permission.key}
                                                            checked={data[permission.key]}
                                                            onCheckedChange={(checked) => setData(permission.key, checked)}
                                                        />
                                                    </Label>

                                                    <InputError message={errors[permission.key]} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <InputError message={errors.updated_at} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.account.users.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
                                        <Button type="submit" disabled={processing}>更新する</Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    disabled={processing}
                                                >
                                                    削除する
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>ユーザーを削除しますか？</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        この操作は取り消すことができません。<br />
                                                        ユーザー「{user.name}」を完全に削除し、すべてのデータが失われます。
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleDelete}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        disabled={processing}
                                                    >
                                                        削除する
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
