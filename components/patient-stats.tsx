"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Bed, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"
import type { Patient } from "@/types/patient"

interface PatientStatsProps {
  patients: Patient[]
}

export default function PatientStats({ patients }: PatientStatsProps) {
  // Calculate stats
  const totalPatients = patients.length
  const emergencyPatients = patients.filter((p) => p.location.includes("PRONTO SOCORRO")).length
  const susPatients = patients.filter((p) => p.location.includes("SUS")).length
  const inpatientCount = patients.filter((p) => p.location.includes("INTERNADO")).length

  // Calcular estatísticas por cidade
  const svpPatients = patients.filter((p) => p.city === "SANTA VITÓRIA DO PALMAR").length
  const chuiPatients = patients.filter((p) => p.city === "CHUÍ").length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
          <p className="text-xs text-muted-foreground">Pacientes registrados no sistema</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pronto Socorro</CardTitle>
          <Activity className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{emergencyPatients}</div>
          <p className="text-xs text-muted-foreground">Pacientes em atendimento de emergência</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Internados</CardTitle>
          <Bed className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inpatientCount}</div>
          <p className="text-xs text-muted-foreground">Pacientes internados atualmente</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SUS</CardTitle>
          <MapPin className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{susPatients}</div>
          <p className="text-xs text-muted-foreground">Pacientes via SUS</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Santa Vitória</CardTitle>
          <MapPin className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{svpPatients}</div>
          <p className="text-xs text-muted-foreground">Pacientes de Santa Vitória do Palmar</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chuí</CardTitle>
          <MapPin className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{chuiPatients}</div>
          <p className="text-xs text-muted-foreground">Pacientes do Chuí</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
