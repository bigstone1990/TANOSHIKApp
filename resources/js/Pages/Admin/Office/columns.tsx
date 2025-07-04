import { useState } from 'react'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

type Office = {
    id: number
    name: string
    kana: string
}

type CreateColumnsProps = {
    onDelete: (id: number) => void
    isProcessing?: boolean
}

export const createColumns = ({ onDelete, isProcessing = false }: CreateColumnsProps): ColumnDef<Office>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    名前
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "kana",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    かな
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("kana")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const office = row.original

            return (
                <ActionsCell
                    office={office}
                    onDelete={onDelete}
                    isProcessing={isProcessing}
                />
            )
        },
    },
]

const ActionsCell = ({
    office,
    onDelete,
    isProcessing
}: {
    office: Office
    onDelete: (id: number) => void
    isProcessing: boolean
}) => {
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        onDelete(office.id)
        setOpen(false)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <a
                            href={route('admin.offices.show', { office: office.id })}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            詳細
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                            href={route('admin.offices.edit', { office: office.id })}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            編集
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <button
                            type="button"
                            className="w-full"
                            onClick={() => setOpen(true)}
                        >
                            削除
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>事業所を削除しますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            この操作は取り消すことができません。<br />
                            事業所「{office.name}」を完全に削除し、すべてのデータが失われます。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isProcessing}
                        >
                            削除する
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
