import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface UserEditProps {
  user: {
    id: string
    name: string
    phone: string
    ministries: string[]
  }
}

export function UserEdit({ user }: UserEditProps) {
  const [userData, setUserData] = useState({
    name: user.name,
    phone: user.phone,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData.name.trim() || !userData.phone.trim()) {
      toast.error("Por favor, preencha todos os campos")
      return
    }

    // TODO: Implement user update logic
    console.log("Updating user:", userData)
    toast.success("Dados atualizados com sucesso!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Dados do Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}