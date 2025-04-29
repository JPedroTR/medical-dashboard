"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { patients, addPatient } from "@/data/patients"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  exam: z.string().min(2, { message: "Exame deve ter pelo menos 2 caracteres" }),
  patientNumber: z.coerce.number().min(1, { message: "Número do paciente deve ser no mínimo 1" }),
  location: z.string().min(1, { message: "Selecione um plano de saúde" }),
  technician: z.string().min(2, { message: "Nome do técnico deve ter pelo menos 2 caracteres" }),
  city: z.string().min(1, { message: "Selecione uma cidade" }), // Novo campo para cidade
})

export default function NewPatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      exam: "",
      patientNumber: 1,
      location: "",
      technician: "",
      city: "", // Valor padrão para cidade
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Generate a new patient ID
      const newId = (patients.length > 0 ? Number.parseInt(patients[patients.length - 1].id) + 1 : 1).toString()

      // Get today's date in DD/MM/YYYY format
      const today = new Date()
      const date = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

      // Get the next sequence number
      const sequence = patients.filter((p) => p.date === date).length + 1

      // Create new patient object
      const newPatient = {
        id: newId,
        sequence,
        date,
        name: values.name.toUpperCase(),
        exam: values.exam.toUpperCase(),
        patientNumber: values.patientNumber,
        location: values.location,
        technician: values.technician.toUpperCase(),
        city: values.city, // Adicionando cidade ao novo paciente
      }

      // Add the patient using our new function
      addPatient(newPatient)

      toast({
        title: "Paciente adicionado com sucesso",
        description: `${values.name} foi adicionado ao sistema.`,
      })

      // Redirect after successful save
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Erro ao salvar paciente:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o paciente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Formulário de Cadastro</CardTitle>
        <CardDescription>Adicione um novo paciente ao sistema de gerenciamento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Paciente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo do paciente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exame</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o exame realizado pelo paciente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Paciente</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormDescription>Contabiliza a ordem do paciente no dia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano de Saúde</FormLabel>
                    <FormControl>
                      <Input placeholder="Plano de Saúde" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="technician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Técnico Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do técnico que realizou o exame" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Novo campo para cidade */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SANTA VITÓRIA DO PALMAR">Santa Vitória do Palmar</SelectItem>
                        <SelectItem value="CHUÍ">Chuí</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-between px-0 pt-4">
              <Button variant="outline" type="button" onClick={() => router.push("/")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Paciente"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
