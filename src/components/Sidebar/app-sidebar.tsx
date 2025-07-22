"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  Mail,
  FileText,
  Video,
  Plus,
  List,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
  {
    name: "Anasayfa",
    href: "/",
    icon: Home,
  },
  {
    name: "İletişim",
    href: "/iletisim",
    icon: Mail,
  },
  {
    name: "Yazılarımız",
    href: "/yazilarimiz",
    icon: FileText,
    subItems: [
      { name: "Yazılar Listesi", href: "/yazilarimiz", icon: List },
      { name: "Ekle", href: "/yazilarimiz/ekle", icon: Plus },
    ],
  },
  {
    name: "Videolarımız",
    href: "/videolarimiz",
    icon: Video,
    subItems: [
      { name: "Videolar Listesi", href: "/videolarimiz", icon: List },
      { name: "Ekle", href: "/videolarimiz/ekle", icon: Plus },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActiveParent = (item: (typeof navItems)[0]) => {
    if (item.subItems) {
      return (
        item.subItems.some((subItem) => pathname === subItem.href) ||
        pathname === item.href
      );
    }
    return pathname === item.href;
  };

  const isActiveSubItem = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-sidebar-foreground">
          Özkan Hukuk
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.subItems ? (
                    <Collapsible
                      defaultOpen={isActiveParent(item)}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isActiveParent(item)}
                          className="w-full"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActiveSubItem(subItem.href)}
                              >
                                <Link href={subItem.href}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
