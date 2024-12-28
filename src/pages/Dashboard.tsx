import { useEffect, useState } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { VolunteerSidebar } from "@/components/VolunteerSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { TermsManagement } from "@/components/TermsManagement"
import { useIsMobile } from "@/hooks/use-mobile"

const Dashboard = () => {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem("userRole") === "admin"
  const userName = localStorage.getItem("userName") || "Usuário"
  const profileImage = localStorage.getItem("profileImage")
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <SidebarProvider open={!isMobile} onOpenChange={setOpenMobile}>
      <div className="min-h-screen flex w-full">
        {isAdmin ? <AdminSidebar /> : <VolunteerSidebar />}
        <div className="flex-1 flex flex-col">
          <DashboardHeader 
            userName={userName} 
            profileImage={profileImage}
            onMenuClick={() => setOpenMobile(!openMobile)}
            isMobile={isMobile}
          />
          <main className="p-4 flex-1 overflow-auto">
            <Routes>
              <Route
                path="/terms"
                element={
                  <div className="space-y-4">
                    {isAdmin && <TermsManagement />}
                    <div>Lista de Termos</div>
                  </div>
                }
              />
              <Route path="/volunteers" element={<div>Lista de Voluntários</div>} />
              <Route index element={<div>Bem-vindo ao Dashboard</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard