"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { updatePatient, removePatient } from "@/data/patients"
import type { Patient } from "@/types/patient"

interface PatientActionsProps {
  patient: Patient
  action: "view" | "edit" | "update" | "delete"
  onClose: () => void
}

export default function PatientActions({ patient, action, onClose }: PatientActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [newStatus, setNewStatus] = useState(patient.location)
  const [newCity, setNewCity] = useState(patient.city) // Adicionando estado para cidade
  const router = useRouter()
  const { toast } = useToast()

  const handleAction = () => {
    setIsLoading(true)

    try {
      if (action === "delete") {
        // Remove patient using our new function
        removePatient(patient.id)

        toast({
          title: "Paciente removido",
          description: `${patient.name} foi removido do sistema.`,
        })
      } else if (action === "update") {
        // Update patient status and city using our new function
        updatePatient(patient.id, { location: newStatus, city: newCity })

        toast({
          title: "Informações atualizadas",
          description: `Os dados de ${patient.name} foram atualizados com sucesso.`,
        })
      }

      // Close dialog and refresh page
      setTimeout(() => {
        onClose()
        router.refresh()
      }, 500)
    } catch (error) {
      console.error(`Erro ao ${action === "delete" ? "remover" : "atualizar"} paciente:`, error)
      toast({
        title: "Erro",
        description: `Ocorreu um erro ao ${action === "delete" ? "remover" : "atualizar"} o paciente.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getActionContent = () => {
    switch (action) {
      case "view":
        return {
          title: "Detalhes do Paciente",
          description: "Informações detalhadas do paciente.",
          content: (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Nome:</div>
                <div className="col-span-3">{patient.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Data:</div>
                <div className="col-span-3">{patient.date}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Exame:</div>
                <div className="col-span-3">{patient.exam}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Nº Paciente:</div>
                <div className="col-span-3">{patient.patientNumber}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Plano de Saúde:</div>
                <div className="col-span-3">{patient.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Técnico:</div>
                <div className="col-span-3">{patient.technician}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Cidade:</div>
                <div className="col-span-3">{patient.city}</div>
              </div>
            </div>
          ),
          action: null,
        }
      case "delete":
        return {
          title: "Remover Paciente",
          description: "Tem certeza que deseja remover este paciente do sistema?",
          content: (
            <div className="py-4">
              <p>
                Esta ação não pode ser desfeita. Isso removerá permanentemente o paciente{" "}
                <strong>{patient.name}</strong> do sistema.
              </p>
            </div>
          ),
          action: {
            label: "Remover",
            variant: "destructive" as const,
          },
        }
      case "update":
        return {
          title: "Atualizar Informações",
          description: "Atualizar as informações do paciente no sistema.",
          content: (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Plano de Saúde Atual:</div>
                <div className="col-span-3">{patient.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Novo Plano de Saúde:</div>
                <div className="col-span-3">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="PRONTO SOCORRO">Pronto Socorro</option>
                    <option value="SUS">SUS</option>
                    <option value="INTERNADO">Internado</option>
                    <option value="PARTICULAR">Particular</option>
                    <option value="ALTA">Alta Médica</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Cidade Atual:</div>
                <div className="col-span-3">{patient.city}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-medium">Nova Cidade:</div>
                <div className="col-span-3">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  >
                    <option value="SANTA VITÓRIA DO PALMAR">Santa Vitória do Palmar</option>
                    <option value="CHUÍ">Chuí</option>
                  </select>
                </div>
              </div>
            </div>
          ),
          action: {
            label: "Atualizar",
            variant: "default" as const,
          },
        }
      default:
        return {
          title: "",
          description: "",
          content: null,
          action: null,
        }
    }
  }

  const actionContent = getActionContent()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{actionContent.title}</DialogTitle>
          <DialogDescription>{actionContent.description}</DialogDescription>
        </DialogHeader>
        {actionContent.content}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {actionContent.action && (
            <Button variant={actionContent.action.variant} onClick={handleAction} disabled={isLoading}>
              {isLoading ? "Processando..." : actionContent.action.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
