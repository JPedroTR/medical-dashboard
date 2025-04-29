import type { Patient } from "@/types/patient"

// Função para carregar pacientes do localStorage ou usar dados padrão
const loadPatients = (): Patient[] => {
  if (typeof window !== "undefined") {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      return JSON.parse(savedPatients)
    }
  }

  // Dados padrão se não houver dados salvos
  const defaultPatients = [
    {
      id: "1",
      sequence: 7,
      date: "27/01/2025",
      name: "SANTA TERESA BRAGA PEREIRA DE AVILA",
      exam: "TORAX AP, ARCO COSTAL DIREITO",
      priority: 3,
      location: "PRONTO SOCORRO",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR", // Adicionando cidade aos dados existentes
    },
    {
      id: "2",
      sequence: 8,
      date: "27/01/2025",
      name: "ARTHUR SILVA DA SILVA",
      exam: "TORARX PA/P",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "3",
      sequence: 9,
      date: "27/01/2025",
      name: "LETICIA PRESTES RODRIGUES",
      exam: "CRANIO",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "ZETI",
      city: "CHUÍ",
    },
    {
      id: "4",
      sequence: 10,
      date: "27/01/2025",
      name: "GABRIELLE PEREIRA MARTINS",
      exam: "TORAX PA/P",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "5",
      sequence: 11,
      date: "27/01/2025",
      name: "ROSA MIRAPALHETE ARIM",
      exam: "TORAX PA/P",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "ZETI",
      city: "CHUÍ",
    },
    {
      id: "6",
      sequence: 12,
      date: "27/01/2024",
      name: "ROSA ELAINE MENDES",
      exam: "ABDOME AP/P",
      priority: 2,
      location: "SUS",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "7",
      sequence: 13,
      date: "27/01/2025",
      name: "LINDIZAI MIRAPALHETE DOS SANTOA",
      exam: "C.LOMBO SACRA",
      priority: 2,
      location: "SUS",
      technician: "ZETI",
      city: "CHUÍ",
    },
    {
      id: "8",
      sequence: 14,
      date: "27/01/2025",
      name: "MARIA LAURA SANCHEZ CASTERAN",
      exam: "TORAX PA/P",
      priority: 2,
      location: "SUS",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "9",
      sequence: 15,
      date: "27/01/2025",
      name: "FLANI EDIMILSON DREBES RODRIGUES",
      exam: "BACIA,FEMUR,JOELHO,PERNA,TORNOZELO E PE",
      priority: 14,
      location: "PROTO SOCORRO",
      technician: "ZETI",
      city: "CHUÍ",
    },
    {
      id: "10",
      sequence: 16,
      date: "27/01/2025",
      name: "FELIPE CANDIA ARNONI MULLER",
      exam: "ANTEBRACO ESQ",
      priority: 15,
      location: "PARTICULAR",
      technician: "ZETI",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "11",
      sequence: 17,
      date: "27/01/2025",
      name: "DARLEI LUIZ GONCALVES LIMA",
      exam: "JOELHO D/E PERNADA/E OMBRO ESQUERDO,CLS, C CERVICAL",
      priority: 15,
      location: "SUS",
      technician: "JOAO PEDRO",
      city: "CHUÍ",
    },
    {
      id: "12",
      sequence: 18,
      date: "27/01/2025",
      name: "ODETE CABREIRA SILVEIRA",
      exam: "TORAX",
      priority: 2,
      location: "SUS",
      technician: "JOAO PEDRO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "13",
      sequence: 19,
      date: "27/01/2025",
      name: "EVA MENDES",
      exam: "TORAX ARCOS COSTAIS",
      priority: 4,
      location: "PROTO SOCORRO",
      technician: "JOAO PEDRO",
      city: "CHUÍ",
    },
    {
      id: "14",
      sequence: 20,
      date: "27/01/2025",
      name: "ARCELINO DA SILVA",
      exam: "TORAX",
      priority: 2,
      location: "SUS",
      technician: "JOAO PEDRO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "15",
      sequence: 21,
      date: "27/01/2025",
      name: "ERICK HENRIQUE DE SOUZA",
      exam: "TORAX",
      priority: 2,
      location: "SUS",
      technician: "JOAO PEDRO",
      city: "CHUÍ",
    },
    {
      id: "16",
      sequence: 22,
      date: "27/01/2025",
      name: "JUAREZ MACHADO",
      exam: "TORAX",
      priority: 1,
      location: "PROTO SOCORRO",
      technician: "JOAO PEDRO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "17",
      sequence: 23,
      date: "27/01/2025",
      name: "CHARLENE GARCIA BORBA",
      exam: "OMBRO E",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "FER",
      city: "CHUÍ",
    },
    {
      id: "18",
      sequence: 24,
      date: "27/01/2025",
      name: "CEZAR RAFAEL JARDIM FERNANDEZ",
      exam: "TX, ABDOME",
      priority: 2,
      location: "INTERNADO",
      technician: "FER",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "19",
      sequence: 25,
      date: "27/01/2025",
      name: "MARIA ROSIMERE SILVEIRA",
      exam: "CC, CLS, PUNHO D",
      priority: 6,
      location: "PARTICULAR",
      technician: "FER",
      city: "CHUÍ",
    },
    {
      id: "20",
      sequence: 26,
      date: "27/01/2025",
      name: "ENZO SANTOS CARDOSO",
      exam: "UMERO, COTOVELO, ANTEBRACO",
      priority: 3,
      location: "PRONTO SOCORRO",
      technician: "FER",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "21",
      sequence: 1,
      date: "28/01/2025",
      name: "ADENIR DE OLIVEIRA",
      exam: "COLUNA LOMBO SACRA",
      priority: 2,
      location: "SUS",
      technician: "RO",
      city: "CHUÍ",
    },
    {
      id: "22",
      sequence: 2,
      date: "28/01/2025",
      name: "OROSMAR SILVA",
      exam: "TORAX PA E PERFIL",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "RO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "23",
      sequence: 3,
      date: "28/01/2025",
      name: "URIEL GUTIERREZ DE SOUZA",
      exam: "PERNA, TORNOZELO E PE ESQUERDO",
      priority: 6,
      location: "PRONTO SOCORRO",
      technician: "RO",
      city: "CHUÍ",
    },
    {
      id: "24",
      sequence: 4,
      date: "28/01/2025",
      name: "VALNI VIEIRA MACHADO",
      exam: "COTOVELO DIREITO",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "RO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "25",
      sequence: 5,
      date: "28/01/2025",
      name: "TIAGO CABREIRA RODRIGUES",
      exam: "JOELHO ESQUERDO",
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "RO",
      city: "CHUÍ",
    },
    {
      id: "26",
      sequence: 6,
      date: "28/01/2025",
      name: "ALVARO ALONSO DE CASTRO",
      exam: "TORAX PA E PERFIL",
      priority: 2,
      location: "SUS",
      technician: "RO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "27",
      sequence: 7,
      date: "28/01/2025",
      name: "JUCIEL NIEVES PIZANE",
      exam: "FACE",
      priority: 4,
      location: "PRONTO SOCORRO",
      technician: "RO",
      city: "CHUÍ",
    },
    {
      id: "28",
      sequence: 8,
      date: "28/01/2025",
      name: "FRANCISCO PINILLO ZULUETA",
      exam: "BACIA",
      priority: 2,
      location: "SUS",
      technician: "RO",
      city: "SANTA VITÓRIA DO PALMAR",
    },
    // Adicionando exemplos de múltiplos exames para o mesmo paciente
    {
      id: "29",
      sequence: 9,
      date: "28/01/2025",
      name: "SANTA TERESA BRAGA PEREIRA DE AVILA", // Mesmo paciente do ID 1
      exam: "CRANIO AP", // Exame diferente
      priority: 2,
      location: "PRONTO SOCORRO",
      technician: "MARIA", // Técnico diferente
      city: "SANTA VITÓRIA DO PALMAR",
    },
    {
      id: "30",
      sequence: 10,
      date: "28/01/2025",
      name: "ARTHUR SILVA DA SILVA", // Mesmo paciente do ID 2
      exam: "COLUNA LOMBAR", // Exame diferente
      priority: 3,
      location: "SUS",
      technician: "CARLOS", // Técnico diferente
      city: "CHUÍ",
    },
  ];

  // Map legacy 'priority' field to 'patientNumber'
  const patientsWithNumbers: Patient[] = defaultPatients.map((p) => {
    const { priority, ...rest } = p as any;
    return { ...rest, patientNumber: priority };
  });

  // Verificar se os dados já têm o campo city, se não, adicionar
  return patientsWithNumbers.map((patient) => {
    if (!patient.city) {
      patient.city = Math.random() > 0.5 ? "SANTA VITÓRIA DO PALMAR" : "CHUÍ";
    }
    return patient;
  });
}

// Inicializa a lista de pacientes
export let patients: Patient[] = loadPatients()

// Função para salvar pacientes no localStorage
export const savePatients = (updatedPatients: Patient[]) => {
  patients = updatedPatients
  if (typeof window !== "undefined") {
    localStorage.setItem("patients", JSON.stringify(patients))
  }
}

// Função para adicionar um novo paciente
export const addPatient = (patient: Patient) => {
  const updatedPatients = [...patients, patient]
  savePatients(updatedPatients)
  return updatedPatients
}

// Função para atualizar um paciente existente
export const updatePatient = (id: string, updatedData: Partial<Patient>) => {
  const updatedPatients = patients.map((patient) => (patient.id === id ? { ...patient, ...updatedData } : patient))
  savePatients(updatedPatients)
  return updatedPatients
}

// Função para remover um paciente
export const removePatient = (id: string) => {
  const updatedPatients = patients.filter((patient) => patient.id !== id)
  savePatients(updatedPatients)
  return updatedPatients
}
