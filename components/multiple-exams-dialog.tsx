"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addPatient, patients } from "@/data/patients"
import type { Patient } from "@/types/patient"

interface MultipleExamsDialogProps {
  patient: Patient
  onClose: () => void
}

export default function MultipleExamsDialog({ patient, onClose }: MultipleExamsDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [exam, setExam] = useState("")
  const [priority, setPriority] = useState("2")
  const [location, setLocation] = useState(patient.location)
  const [technician, setTechnician] = useState("")
  const [city, setCity] = useState(patient.city) // Inicializa com a cidade do paciente

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!exam || !technician) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Generate a new patient ID
      const newId = (patients.length > 0 ? Number.parseInt(patients[patients.length - 1].id) + 1 : 1).toString()

      // Get today's date in DD/MM/YYYY format
      const today = new Date()
      const date = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

      // Get the next sequence number
      const sequence = patients.filter((p) => p.date === date).length + 1

      // Create new exam entry
      const newExam = {
        id: newId,
        sequence,
        date,
        name: patient.name,
        exam: exam.toUpperCase(),
        priority: Number.parseInt(priority),
        location,
        technician: technician.toUpperCase(),
        city, // Adicionando cidade ao novo exame
      }

      // Add the new exam using our new function
      addPatient(newExam)

      toast({
        title: "Exame adicionado com sucesso",
        description: `Um novo exame foi adicionado para ${patient.name}.`,
      })

      // Close dialog and refresh page
      setTimeout(() => {
        onClose()
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Erro ao adicionar exame:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao adicionar o exame. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Exame</DialogTitle>
          <DialogDescription>Adicione um novo exame para o paciente {patient.name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="exam">Exame</Label>
            <Input
              id="exam"
              placeholder="Descreva o exame a ser realizado"
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="15"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Local</Label>
              <Select defaultValue={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRONTO SOCORRO">Pronto Socorro</SelectItem>
                  <SelectItem value="SUS">SUS</SelectItem>
                  <SelectItem value="INTERNADO">Internado</SelectItem>
                  <SelectItem value="PARTICULAR">Particular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="technician">Técnico Responsável</Label>
              <Input
                id="technician"
                placeholder="Nome do técnico que realizará o exame"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                required
              />
            </div>

            {/* Novo campo para cidade */}
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Select defaultValue={city} onValueChange={setCity}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SANTA VITÓRIA DO PALMAR">Santa Vitória do Palmar</SelectItem>
                  <SelectItem value="CHUÍ">Chuí</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Adicionar Exame"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
