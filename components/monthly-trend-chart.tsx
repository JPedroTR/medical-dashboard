"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Patient } from "@/types/patient"

interface MonthlyTrendChartProps {
  patients: Patient[]
}

export default function MonthlyTrendChart({ patients }: MonthlyTrendChartProps) {
  // Processar dados para gráfico de tendência mensal
  const getMonthlyData = () => {
    const monthlyData: Record<string, { total: number; emergency: number; sus: number; private: number }> = {}

    // Inicializar os últimos 6 meses
    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today)
      d.setMonth(today.getMonth() - i)
      const monthKey = `${d.getMonth() + 1}/${d.getFullYear()}`
      monthlyData[monthKey] = { total: 0, emergency: 0, sus: 0, private: 0 }
    }

    // Preencher com dados reais
    patients.forEach((patient) => {
      // Extrair mês e ano da data do paciente (formato DD/MM/YYYY)
      const [, month, year] = patient.date.split("/")

      // Verificar se o mês está nos últimos 6 meses
      const monthKey = `${Number.parseInt(month)}/${year}`

      if (monthlyData[monthKey]) {
        monthlyData[monthKey].total += 1

        if (patient.location.includes("PRONTO SOCORRO")) {
          monthlyData[monthKey].emergency += 1
        } else if (patient.location.includes("SUS")) {
          monthlyData[monthKey].sus += 1
        } else if (patient.location.includes("PARTICULAR")) {
          monthlyData[monthKey].private += 1
        }
      }
    })

    // Converter para array para o gráfico
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      total: data.total,
      emergency: data.emergency,
      sus: data.sus,
      private: data.private,
    }))
  }

  const monthlyData = getMonthlyData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência Mensal</CardTitle>
        <CardDescription>Evolução do número de exames nos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" name="Total" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="emergency" name="Pronto Socorro" stroke="#ff8042" />
              <Line type="monotone" dataKey="sus" name="SUS" stroke="#82ca9d" />
              <Line type="monotone" dataKey="private" name="Particular" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
