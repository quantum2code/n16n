"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  icons,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  WrenchIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { useHasActiveSubscription } from "@/features/auth/components/subcriptions/use-subscription";

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
  const footerItems = [
    {
      title: "Billing portal",
      icon: CreditCardIcon,
      url: "",
      cb: () => {
        authClient.customer.portal();
      },
    },
    {
      title: "Log Out",
      icon: LogOutIcon,
      url: "",
      cb: () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
          },
        });
      },
    },
  ];
  const menuItems = [
    {
      title: "Main",
      items: [
        {
          title: "Workflows",
          icon: FolderOpenIcon,
          url: "/workflows",
        },
        {
          title: "Executions",
          icon: WrenchIcon,
          url: "/executions",
        },
        {
          title: "Credentials",
          icon: KeyIcon,
          url: "/credentials",
        },
      ],
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={"/"}
                prefetch
                className="flex items-center gap-3 font-semibold text-sm"
              >
                <Image src={"/logo.svg"} alt="logo" width={30} height={30} />{" "}
                <span>n16n</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((items) => (
          <SidebarGroup key={items.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  authClient.checkout({
                    slug: "n16n-pro",
                  });
                }}
              >
                <StarIcon />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild onClick={() => item.cb()}>
                <Link
                  href={item.url}
                  prefetch
                  className="flex items-center gap-3"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
