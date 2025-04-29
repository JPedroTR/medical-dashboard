"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { Patient } from "@/types/patient"

interface ExamBodyPartChartProps {
  patients: Patient[]
}

export default function ExamBodyPartChart({ patients }: ExamBodyPartChartProps) {
  // Lista de partes do corpo comuns em exames
  const bodyParts = [
    { keyword: "TORAX", part: "Tórax" },
    { keyword: "CRANIO", part: "Crânio" },
    { keyword: "ABDOME", part: "Abdômen" },
    { keyword: "JOELHO", part: "Joelho" },
    { keyword: "COLUNA", part: "Coluna" },
    { keyword: "OMBRO", part: "Ombro" },
    { keyword: "MAO", part: "Mão" },
    { keyword: "PE", part: "Pé" },
    { keyword: "PERNA", part: "Perna" },
    { keyword: "BRACO", part: "Braço" },
    { keyword: "FEMUR", part: "Fêmur" },
    { keyword: "FACE", part: "Face" },
    { keyword: "COTOVELO", part: "Cotovelo" },
    { keyword: "PUNHO", part: "Punho" },
    { keyword: "TORNOZELO", part: "Tornozelo" },
  ]

  // Processar dados para gráfico de partes do corpo
  const getBodyPartData = () => {
    const partCounts: Record<string, number> = {}

    patients.forEach((patient) => {
      const examUpper = patient.exam.toUpperCase()

      // Verificar cada parte do corpo
      for (const { keyword, part } of bodyParts) {
        if (examUpper.includes(keyword)) {
          partCounts[part] = (partCounts[part] || 0) + 1
        }
      }
    })

    // Se não encontrou nenhuma parte específica, categorizar como "Outros"
    patients.forEach((patient) => {
      let found = false
      for (const { keyword } of bodyParts) {
        if (patient.exam.toUpperCase().includes(keyword)) {
          found = true
          break
        }
      }

      if (!found) {
        partCounts["Outros"] = (partCounts["Outros"] || 0) + 1
      }
    })

    return Object.entries(partCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  const bodyPartData = getBodyPartData()

  // Cores para o gráfico
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exames por Parte do Corpo</CardTitle>
        <CardDescription>Distribuição de exames por região anatômica</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bodyPartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {bodyPartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} exames`, "Quantidade"]} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
