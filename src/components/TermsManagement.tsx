import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function TermsManagement() {
  const [termName, setTermName] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(selectedFile)
    } else {
      toast.error("Por favor, selecione um arquivo .docx válido")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termName.trim() || !file) {
      toast.error("Por favor, preencha todos os campos")
      return
    }
    
    // TODO: Implement file upload logic with Supabase
    console.log("Uploading term:", { name: termName, file })
    toast.success("Termo cadastrado com sucesso!")
  }

  return (
    <div className="mb-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Cadastrar Novo Termo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Termo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="termName">Nome do Termo</Label>
              <Input
                id="termName"
                value={termName}
                onChange={(e) => setTermName(e.target.value)}
                placeholder="Digite o nome do termo"
              />
            </div>
            <div>
              <Label htmlFor="file">Arquivo (.docx)</Label>
              <Input
                id="file"
                type="file"
                accept=".docx"
                onChange={handleFileChange}
              />
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}