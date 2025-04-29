"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import type { Patient } from "@/types/patient"

interface DashboardChartsProps {
  patients: Patient[]
}

export default function DashboardCharts({ patients }: DashboardChartsProps) {
  const [activeTab, setActiveTab] = useState("planos")

  // Cores para os gráficos
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  // Processar dados para gráfico de planos de saúde
  const getHealthPlanData = () => {
    const planCounts: Record<string, number> = {}

    patients.forEach((patient) => {
      const plan = patient.location
      planCounts[plan] = (planCounts[plan] || 0) + 1
    })

    return Object.entries(planCounts).map(([name, value]) => ({ name, value }))
  }

  // Processar dados para gráfico de tipos de exame
  const getExamTypeData = () => {
    const examTypes: Record<string, number> = {}

    patients.forEach((patient) => {
      // Extrair o tipo de exame (primeira palavra ou até a vírgula)
      const examType = patient.exam.split(",")[0].split(" ")[0]
      examTypes[examType] = (examTypes[examType] || 0) + 1
    })

    return Object.entries(examTypes)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10) // Limitar aos 10 tipos mais comuns
  }

  // Processar dados para gráfico de técnicos
  const getTechnicianData = () => {
    const techCounts: Record<string, number> = {}

    patients.forEach((patient) => {
      const tech = patient.technician
      techCounts[tech] = (techCounts[tech] || 0) + 1
    })

    return Object.entries(techCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  // Dados processados
  const healthPlanData = getHealthPlanData()
  const examTypeData = getExamTypeData()
  const technicianData = getTechnicianData()

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Métricas e Análises</CardTitle>
        <CardDescription>Visualização de dados por plano de saúde, tipo de exame e técnico</CardDescription>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="planos">Planos de Saúde</TabsTrigger>
            <TabsTrigger value="exames">Tipos de Exame</TabsTrigger>
            <TabsTrigger value="tecnicos">Técnicos</TabsTrigger>
          </TabsList>

          <TabsContent value="planos" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthPlanData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {healthPlanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} pacientes`, "Quantidade"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="exames" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={examTypeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} exames`, "Quantidade"]} />
                  <Legend />
                  <Bar dataKey="value" name="Quantidade" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="tecnicos" className="mt-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={technicianData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value} exames`, "Quantidade"]} />
                  <Legend />
                  <Bar dataKey="value" name="Exames Realizados" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="p-1 sm:p-6">{/* Content moved inside the Tabs component above */}</CardContent>
    </Card>
  )
}
