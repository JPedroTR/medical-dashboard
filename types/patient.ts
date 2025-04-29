export interface Patient {
  id: string
  sequence: number
  date: string
  name: string
  exam: string
  patientNumber: number
  location: string
  technician: string
  city: string // Novo campo para cidade
}
