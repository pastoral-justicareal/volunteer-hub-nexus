import { useEffect } from "react"
import { useNavigate, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { VolunteerSidebar } from "@/components/VolunteerSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { TermsManagement } from "@/components/TermsManagement"

const Dashboard = () => {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem("userRole") === "admin"
  const userName = localStorage.getItem("userName") || "Usuário"
  const profileImage = localStorage.getItem("profileImage")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isAdmin ? <AdminSidebar /> : <VolunteerSidebar />}
        <div className="flex-1">
          <DashboardHeader userName={userName} profileImage={profileImage} />
          <main className="p-4">
            <Routes>
              <Route
                path="/terms"
                element={
                  <div>
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