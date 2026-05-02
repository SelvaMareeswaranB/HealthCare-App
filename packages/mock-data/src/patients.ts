export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Discharged" | "Critical";
  diagnosis: string;
  department:
    | "Cardiology"
    | "Neurology"
    | "Orthopedics"
    | "Pediatrics"
    | "General";

  doctorAssigned: string;

  appointmentStatus: "Completed" | "Pending" | "Cancelled";
  appointmentType: "Walk-in" | "Online" | "Emergency";

  billAmount: number;

  admissionDate: string;
  dischargeDate?: string;
  lastVisitDate: string;

  contact: string;
  email: string;
  address: string;

  visitCount: number;
  satisfactionScore: number; // 1 - 5
}

export const mockPatients: Patient[] = [
  {
    id: "P-10241",
    name: "Eleanor Vance",
    age: 62,
    gender: "Female",
    status: "Active",

    diagnosis: "Hypertensive Heart Disease",
    department: "Cardiology",
    doctorAssigned: "Dr. Michael Carter",

    appointmentStatus: "Completed",
    appointmentType: "Walk-in",

    billAmount: 18500,

    admissionDate: "2026-04-12",
    dischargeDate: undefined,
    lastVisitDate: "2026-05-01",

    contact: "+1-555-0198",
    email: "eleanor@example.com",
    address: "New York, USA",

    visitCount: 6,
    satisfactionScore: 4.8,
  },

  {
    id: "P-10242",
    name: "Arthur Pendelton",
    age: 78,
    gender: "Male",
    status: "Critical",

    diagnosis: "Acute Respiratory Failure",
    department: "General",
    doctorAssigned: "Dr. Sarah Lee",

    appointmentStatus: "Pending",
    appointmentType: "Emergency",

    billAmount: 42000,

    admissionDate: "2026-04-28",
    dischargeDate: undefined,
    lastVisitDate: "2026-05-01",

    contact: "+1-555-0143",
    email: "arthur@example.com",
    address: "Chicago, USA",

    visitCount: 12,
    satisfactionScore: 4.2,
  },

  {
    id: "P-10243",
    name: "Sophia Lin",
    age: 34,
    gender: "Female",
    status: "Discharged",

    diagnosis: "Mild Concussion",
    department: "Neurology",
    doctorAssigned: "Dr. David Kim",

    appointmentStatus: "Completed",
    appointmentType: "Online",

    billAmount: 8200,

    admissionDate: "2026-04-25",
    dischargeDate: "2026-04-27",
    lastVisitDate: "2026-04-27",

    contact: "+1-555-0177",
    email: "sophia@example.com",
    address: "San Francisco, USA",

    visitCount: 2,
    satisfactionScore: 4.9,
  },

  {
    id: "P-10244",
    name: "Marcus Brody",
    age: 51,
    gender: "Male",
    status: "Active",

    diagnosis: "Type 2 Diabetes Mellitus",
    department: "General",
    doctorAssigned: "Dr. Emma Watson",

    appointmentStatus: "Cancelled",
    appointmentType: "Walk-in",

    billAmount: 12600,

    admissionDate: "2026-04-29",
    dischargeDate: undefined,
    lastVisitDate: "2026-05-01",

    contact: "+1-555-0121",
    email: "marcus@example.com",
    address: "Dallas, USA",

    visitCount: 8,
    satisfactionScore: 4.1,
  },

  {
    id: "P-10245",
    name: "Amelia Stone",
    age: 15,
    gender: "Female",
    status: "Active",

    diagnosis: "Seasonal Viral Fever",
    department: "Pediatrics",
    doctorAssigned: "Dr. Olivia Brown",

    appointmentStatus: "Completed",
    appointmentType: "Online",

    billAmount: 3500,

    admissionDate: "2026-04-30",
    dischargeDate: undefined,
    lastVisitDate: "2026-05-01",

    contact: "+1-555-0166",
    email: "amelia@example.com",
    address: "Boston, USA",

    visitCount: 3,
    satisfactionScore: 5,
  },
];