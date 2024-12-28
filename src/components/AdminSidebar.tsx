import { Users, FileText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

const menuItems = [
  {
    title: "Voluntários",
    icon: Users,
    path: "/dashboard/volunteers"
  },
  {
    title: "Termos",
    icon: FileText,
    path: "/dashboard/terms"
  }
]

export function AdminSidebar() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  return (
    <Sidebar defaultCollapsed={isMobile} className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}