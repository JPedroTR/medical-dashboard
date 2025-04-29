import NewPatientForm from "@/components/new-patient-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NewPatientPage() {
  return (
    <main className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Novo Paciente</h1>
        <p className="text-muted-foreground">Preencha o formulário abaixo com os dados do paciente</p>
      </div>

      <NewPatientForm />
    </main>
  )
}
