"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown, Filter, Plus, RefreshCw, Search } from "lucide-react"
import PatientTable from "@/components/patient-table"
import PatientStats from "@/components/patient-stats"
import DashboardCharts from "@/components/dashboard-charts"
import ExamBodyPartChart from "@/components/exam-body-part-chart"
import MonthlyTrendChart from "@/components/monthly-trend-chart"
import CityChart from "@/components/city-chart"
import { patients } from "@/data/patients"
import { useToast } from "@/hooks/use-toast"

export default function PatientDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(patients)
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const healthPlans = Array.from(new Set(patients.map(p => p.location)))

  // Força a atualização quando o componente é montado
  useEffect(() => {
    // Isso garante que estamos usando os dados mais recentes do localStorage
    setFilteredPatients([...patients])
  }, [])

  // Filter patients based on search term and active tab
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      let filtered = [...patients]

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.city.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Apply tab filter
      if (activeTab !== "all") {
        filtered = filtered.filter((patient) => {
          // City-specific tabs
          if (activeTab === "svp") return patient.city === "SANTA VITÓRIA DO PALMAR"
          if (activeTab === "chui") return patient.city === "CHUÍ"
          // Plan filter
          return patient.location === activeTab
        })
      }

      setFilteredPatients(filtered)
      setIsLoading(false)
    }, 300) // Simulate loading for better UX
  }, [searchTerm, activeTab])

  const handleNewPatient = () => {
    router.push("/novo-paciente")
  }

  // Função para atualizar os dados
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Recarrega os dados do localStorage
      setFilteredPatients([...patients])
      setIsLoading(false)

      toast({
        title: "Dados atualizados",
        description: "Os dados foram atualizados com sucesso.",
      })
    }, 500)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Pacientes</h1>
          <p className="text-muted-foreground">Gerencie e monitore pacientes em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date().toLocaleDateString("pt-BR")}
          </Button>
          <Button variant="default" size="sm" onClick={handleNewPatient}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>
      </div>

      <PatientStats patients={patients} />

      {/* Nova seção de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DashboardCharts patients={patients} />
        <ExamBodyPartChart patients={patients} />
      </div>

      {/* Gráficos por cidade */}
      <CityChart patients={patients} />

      <MonthlyTrendChart patients={patients} />

      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pacientes..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("all")}>Todos os Pacientes</DropdownMenuItem>
                {healthPlans.map((plan) => (
                  <DropdownMenuItem key={plan} onClick={() => setActiveTab(plan)}>
                    {plan}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {healthPlans.map((plan) => (
              <TabsTrigger key={plan} value={plan}>
                {plan}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-2">
            {activeTab === "all" && <PatientTable patients={filteredPatients} isLoading={isLoading} />}
            {healthPlans.map((plan) => (
              <div key={plan}>
                {activeTab === plan && <PatientTable patients={filteredPatients} isLoading={isLoading} />}
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
