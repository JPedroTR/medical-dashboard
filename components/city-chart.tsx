"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import type { Patient } from "@/types/patient"

interface CityChartProps {
  patients: Patient[]
}

export default function CityChart({ patients }: CityChartProps) {
  // Processar dados para gráfico de distribuição por cidade
  const getCityData = () => {
    const cityCounts: Record<string, number> = {}

    patients.forEach((patient) => {
      const city = patient.city
      cityCounts[city] = (cityCounts[city] || 0) + 1
    })

    return Object.entries(cityCounts).map(([name, value]) => ({ name, value }))
  }

  // Processar dados para gráfico de exames por cidade
  const getCityExamData = () => {
    const cityExamCounts: Record<string, Record<string, number>> = {}

    // Inicializar contadores para cada cidade
    patients.forEach((patient) => {
      if (!cityExamCounts[patient.city]) {
        cityExamCounts[patient.city] = {}
      }
    })

    // Extrair os tipos de exame mais comuns (primeiras palavras)
    const examTypes = new Set<string>()
    patients.forEach((patient) => {
      const examType = patient.exam.split(",")[0].split(" ")[0]
      examTypes.add(examType)
    })

    // Inicializar contadores para cada tipo de exame em cada cidade
    examTypes.forEach((examType) => {
      Object.keys(cityExamCounts).forEach((city) => {
        cityExamCounts[city][examType] = 0
      })
    })

    // Contar exames por tipo e cidade
    patients.forEach((patient) => {
      const examType = patient.exam.split(",")[0].split(" ")[0]
      cityExamCounts[patient.city][examType] = (cityExamCounts[patient.city][examType] || 0) + 1
    })

    // Converter para o formato esperado pelo gráfico
    return Object.entries(cityExamCounts).map(([city, examCounts]) => {
      return {
        city,
        ...examCounts,
      }
    })
  }

  const cityData = getCityData()
  const cityExamData = getCityExamData()

  // Cores para o gráfico
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Obter os tipos de exame para as barras
  const getExamTypes = () => {
    const examTypes = new Set<string>()
    patients.forEach((patient) => {
      const examType = patient.exam.split(",")[0].split(" ")[0]
      examTypes.add(examType)
    })
    return Array.from(examTypes).slice(0, 5) // Limitar aos 5 tipos mais comuns
  }

  const examTypes = getExamTypes()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Cidade</CardTitle>
          <CardDescription>Pacientes atendidos por cidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cityData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} pacientes`, "Quantidade"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exames por Cidade</CardTitle>
          <CardDescription>Comparação de tipos de exame por cidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cityExamData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Legend />
                {examTypes.map((examType, index) => (
                  <Bar
                    key={examType}
                    dataKey={examType}
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                    name={examType}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
