import * as React from "react"
import {
  BookOpen,
  Bot,
  Building,
  LayoutDashboard,
  Settings2,
  SquareTerminal,
  UserPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, usePage } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { url: currentUrl, props: { auth } } = usePage()
  const { user, isAdmin } = auth

  const navItems = React.useMemo(() => {
    const adminNavMain = [
      {
        title: "ダッシュボード",
        url: route('admin.dashboard'),
        icon: LayoutDashboard,
        isActive: route().current('admin.dashboard'),
      },
      {
        title: "アカウント管理",
        url: "#",
        icon: UserPlus,
        isActive: route().current('admin.account.*'),
        items: [
          {
            title: "管理者管理",
            url: route('admin.account.admins.index'),
            isActive: route().current('admin.account.admins.*'),
          },
          {
            title: "ユーザー管理",
            url: route('admin.account.users.index'),
            isActive: route().current('admin.account.users.*'),
          },
        ],
      },
      {
        title: "事業所管理",
        url: route('admin.offices.index'),
        icon: Building,
        isActive: route().current('admin.offices.*'),
      },
    ]

    const userNavMain = [
      {
        title: "ダッシュボード",
        url: route('user.dashboard'),
        icon: LayoutDashboard,
        isActive: route().current('user.dashboard'),
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ]

    return isAdmin ? adminNavMain : userNavMain
  }, [isAdmin, currentUrl])

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={isAdmin ? route('admin.top') : route('user.top')} className="[&>svg]:size-auto [&>svg]:shrink">
                <ApplicationLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
