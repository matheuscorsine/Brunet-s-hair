import { create } from 'zustand';
import { Appointment, Client, FinancialRecord, ServiceItem, User, WorkSchedule } from '../types';

// Dados de exemplo
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Maria Santos',
    phone: '(11) 99999-1111',
    email: 'maria@email.com',
    photo: '',
    notes: 'Cliente preferencial',
    allergies: 'Alergia a produtos com formol',
    serviceHistory: [
      { id: 'h1', serviceType: 'cabelo', date: new Date('2026-05-15'), price: 120, notes: 'Mechas' },
      { id: 'h2', serviceType: 'manicure', date: new Date('2026-05-20'), price: 45 },
    ],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    name: 'Ana Paula Silva',
    phone: '(11) 99999-2222',
    email: 'ana@email.com',
    photo: '',
    serviceHistory: [
      { id: 'h3', serviceType: 'pedicure', date: new Date('2026-05-18'), price: 50 },
    ],
    createdAt: new Date('2025-03-15'),
  },
  {
    id: '3',
    name: 'Carla Oliveira',
    phone: '(11) 99999-3333',
    email: 'carla@email.com',
    photo: '',
    notes: 'Prefere produtos específicos',
    serviceHistory: [
      { id: 'h4', serviceType: 'manicure', date: new Date('2026-05-22'), price: 45 },
      { id: 'h5', serviceType: 'pedicure', date: new Date('2026-05-22'), price: 50 },
    ],
    createdAt: new Date('2025-04-20'),
  },
  {
    id: '4',
    name: 'Juliana Costa',
    phone: '(11) 99999-4444',
    email: 'juliana@email.com',
    photo: '',
    serviceHistory: [],
    createdAt: new Date('2025-06-01'),
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    clientId: '1',
    client: mockClients[0],
    serviceType: 'cabelo',
    date: new Date('2026-06-01'),
    time: '09:00',
    notes: 'Tintura completa',
    status: 'pending',
  },
  {
    id: 'a2',
    clientId: '2',
    client: mockClients[1],
    serviceType: 'manicure',
    date: new Date('2026-06-01'),
    time: '10:30',
    status: 'pending',
  },
  {
    id: 'a3',
    clientId: '3',
    client: mockClients[2],
    serviceType: 'pedicure',
    date: new Date('2026-06-01'),
    time: '14:00',
    status: 'pending',
  },
  {
    id: 'a4',
    clientId: '1',
    client: mockClients[0],
    serviceType: 'manicure',
    date: new Date('2026-06-02'),
    time: '11:00',
    status: 'pending',
  },
];

const mockFinancialRecords: FinancialRecord[] = [
  { id: 'f1', type: 'income', amount: 120, description: 'Serviço - Maria Santos', date: new Date('2026-05-30') },
  { id: 'f2', type: 'income', amount: 45, description: 'Serviço - Ana Paula', date: new Date('2026-05-29') },
  { id: 'f3', type: 'expense', amount: 30, description: 'Compra de tintas', date: new Date('2026-05-28') },
  { id: 'f4', type: 'income', amount: 95, description: 'Serviço - Carla Oliveira', date: new Date('2026-05-27') },
  { id: 'f5', type: 'expense', amount: 15, description: 'Esmaltes', date: new Date('2026-05-26') },
];

const mockServices: ServiceItem[] = [
  { id: 's1', name: 'Corte Feminino', price: 80, duration: 60, type: 'cabelo' },
  { id: 's2', name: 'Mechas', price: 150, duration: 120, type: 'cabelo' },
  { id: 's3', name: 'Tintura', price: 120, duration: 90, type: 'cabelo' },
  { id: 's4', name: 'Manicure', price: 45, duration: 45, type: 'manicure' },
  { id: 's5', name: 'Pedicure', price: 50, duration: 45, type: 'pedicure' },
  { id: 's6', name: 'SPA Mão e Pé', price: 90, duration: 90, type: 'manicure' },
];

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Navigation
  currentTab: string;
  
  // Data
  clients: Client[];
  appointments: Appointment[];
  financialRecords: FinancialRecord[];
  services: ServiceItem[];
  workSchedule: WorkSchedule[];
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  setCurrentTab: (tab: string) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  completeAppointment: (id: string) => void;
  addFinancialRecord: (record: FinancialRecord) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: {
    id: 'u1',
    name: 'Bruna',
    businessName: "Brunet's hair",
    email: 'bruna@email.com',
    phone: '(11) 98888-7777',
  },
  isAuthenticated: true,
  currentTab: 'dashboard',
  clients: mockClients,
  appointments: mockAppointments,
  financialRecords: mockFinancialRecords,
  services: mockServices,
  workSchedule: [
    { dayOfWeek: 1, startTime: '08:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 2, startTime: '08:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 3, startTime: '08:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 4, startTime: '08:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 5, startTime: '08:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 6, startTime: '09:00', endTime: '14:00', isAvailable: true },
    { dayOfWeek: 0, startTime: '00:00', endTime: '00:00', isAvailable: false },
  ],
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: (email, password) => {
    // Simulação de login
    set({
      isAuthenticated: true,
      user: {
        id: 'u1',
        name: 'Bruna',
        businessName: "Brunet's hair",
        email,
        phone: '(11) 98888-7777',
      }
    });
  },
  
  logout: () => set({ isAuthenticated: false, user: null, currentTab: 'dashboard' }),
  
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  addClient: (client) => set((state) => ({ 
    clients: [...state.clients, client] 
  })),
  
  updateClient: (id, clientData) => set((state) => ({
    clients: state.clients.map(c => c.id === id ? { ...c, ...clientData } : c)
  })),
  
  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),
  
  updateAppointment: (id, appointmentData) => set((state) => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, ...appointmentData } : a)
  })),
  
  cancelAppointment: (id) => set((state) => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, status: 'cancelled' } : a)
  })),
  
  completeAppointment: (id) => set((state) => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, status: 'completed' } : a)
  })),
  
  addFinancialRecord: (record) => set((state) => ({
    financialRecords: [record, ...state.financialRecords]
  })),
}));
