import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

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

import { PageProps } from '@/types'

type Office = {
    id: number
    name: string
    kana: string
}

type ShowProps = PageProps<{
    office: Office
}>

export default function Show({ office }: ShowProps) {
    return (
        <AuthenticatedLayout>
            <Head title="事業所詳細" />

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
                                    <BreadcrumbPage>事業所詳細</BreadcrumbPage>
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
                                    事業所詳細
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    事業所の詳細を確認できます。
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
                                            value={office.name}
                                            readOnly
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="kana">かな</Label>

                                        <Input
                                            id="kana"
                                            type="text"
                                            className="bg-gray-100"
                                            value={office.kana}
                                            readOnly
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('admin.offices.index')}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2"
                                        >
                                            一覧に戻る
                                        </Link>
                                        <Link
                                            href={route('admin.offices.edit', { office: office.id })}
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
