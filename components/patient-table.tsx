"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, FileText, MoreHorizontal, Plus, Trash, UserCog } from "lucide-react"
import PatientActions from "@/components/patient-actions"
import MultipleExamsDialog from "@/components/multiple-exams-dialog"
import type { Patient } from "@/types/patient"

interface PatientTableProps {
  patients: Patient[]
  isLoading?: boolean
}

export default function PatientTable({ patients, isLoading = false }: PatientTableProps) {
  const [page, setPage] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [actionType, setActionType] = useState<"view" | "edit" | "update" | "delete" | null>(null)
  // Adicionar estado para controlar o diálogo de múltiplos exames
  const [showMultipleExamsDialog, setShowMultipleExamsDialog] = useState(false)

  const patientsPerPage = 10
  const totalPages = Math.ceil(patients.length / patientsPerPage)

  const paginatedPatients = patients.slice((page - 1) * patientsPerPage, page * patientsPerPage)

  const getLocationVariant = (location: string) => {
    if (location.includes("PRONTO SOCORRO")) return "destructive"
    if (location.includes("INTERNADO")) return "default"
    if (location.includes("SUS")) return "secondary"
    return "outline"
  }

  const getCityVariant = (city: string) => {
    if (city === "SANTA VITÓRIA DO PALMAR") return "default"
    if (city === "CHUÍ") return "secondary"
    return "outline"
  }

  const handleAction = (patient: Patient, action: "view" | "edit" | "update" | "delete") => {
    setSelectedPatient(patient)
    setActionType(action)
  }

  // Adicionar função para abrir o diálogo de múltiplos exames
  const handleAddExam = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowMultipleExamsDialog(true)
  }

  // Adicionar função para fechar o diálogo de múltiplos exames
  const closeMultipleExamsDialog = () => {
    setShowMultipleExamsDialog(false)
    setSelectedPatient(null)
  }

  const closeActionDialog = () => {
    setSelectedPatient(null)
    setActionType(null)
  }

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-md border bg-white"
      >
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Seq.</TableHead>
                <TableHead className="w-[100px]">Data</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Exame</TableHead>
                <TableHead className="w-[80px] text-center">Nº Paciente</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead className="w-[80px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-6 w-10" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-10 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-10 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : paginatedPatients.length > 0 ? (
                paginatedPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{patient.sequence}</TableCell>
                    <TableCell>{patient.date}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.exam}</TableCell>
                    <TableCell className="text-center">{patient.patientNumber}</TableCell>
                    <TableCell>
                      <Badge variant={getLocationVariant(patient.location)}>{patient.location}</Badge>
                    </TableCell>
                    <TableCell>{patient.technician}</TableCell>
                    <TableCell>
                      <Badge variant={getCityVariant(patient.city)}>{patient.city}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction(patient, "view")}>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddExam(patient)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar exame
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(patient, "update")}>
                            <UserCog className="mr-2 h-4 w-4" />
                            Atualizar status
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction(patient, "delete")}
                            className="text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Nenhum paciente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {patients.length > patientsPerPage && (
          <div className="flex items-center justify-between px-4 py-2 border-t">
            <div className="text-sm text-muted-foreground">
              Mostrando {Math.min(patients.length, (page - 1) * patientsPerPage + 1)} a{" "}
              {Math.min(patients.length, page * patientsPerPage)} de {patients.length} pacientes
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {selectedPatient && actionType && (
        <PatientActions patient={selectedPatient} action={actionType} onClose={closeActionDialog} />
      )}
      {selectedPatient && showMultipleExamsDialog && (
        <MultipleExamsDialog patient={selectedPatient} onClose={closeMultipleExamsDialog} />
      )}
    </>
  )
}
