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

import { PageProps } from '@/types'

type Admin = {
    id: number
    name: string
    kana: string
    email: string
    updated_at: string
}

type EditProps = PageProps<{
    admin: Admin
}>

export default function Create({ admin }: EditProps) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        name: admin.name,
        kana: admin.kana,
        updatedAt: admin.updated_at,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.account.admins.update', { admin: admin.id }));
    };

    const handleDelete = () => {
        destroy(route('admin.account.admins.destroy', { admin: admin.id }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="管理者編集" />

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
                                    <BreadcrumbPage>管理者編集</BreadcrumbPage>
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
                                    管理者編集
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    管理者を編集できます。
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
                                            className="bg-gray-100"
                                            value={admin.email}
                                            readOnly
                                        />
                                    </div>

                                    <InputError message={errors.updatedAt} />

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.account.admins.show', { admin: admin.id })}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                        >
                                            詳細に戻る
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
                                                    <AlertDialogTitle>管理者を削除しますか？</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        この操作は取り消すことができません。<br />管理者「{admin.name}」を完全に削除し、すべてのデータが失われます。
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleDelete}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        削除する
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.account.admins.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
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
