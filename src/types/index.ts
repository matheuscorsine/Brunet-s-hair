// Tipos para o aplicativo Brunet's hair

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
  notes?: string;
  allergies?: string;
  serviceHistory: ServiceRecord[];
  createdAt: Date;
}

export interface ServiceRecord {
  id: string;
  serviceType: ServiceType;
  date: Date;
  price: number;
  notes?: string;
}

export type ServiceType = 'cabelo' | 'manicure' | 'pedicure';

export interface Appointment {
  id: string;
  clientId: string;
  client: Client;
  serviceType: ServiceType;
  date: Date;
  time: string;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
  category?: string;
}

export interface User {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  photo?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: number; // em minutos
  type: ServiceType;
}

export interface WorkSchedule {
  dayOfWeek: number; // 0-6 (domingo-sábado)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
