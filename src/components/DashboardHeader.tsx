import { Menu, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface DashboardHeaderProps {
  userName: string
  profileImage?: string
  onMenuClick?: () => void
  isMobile?: boolean
}

export function DashboardHeader({ 
  userName, 
  profileImage, 
  onMenuClick,
  isMobile 
}: DashboardHeaderProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="font-medium hidden sm:inline">{userName}</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-sm">
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}