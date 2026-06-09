import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ServiceType } from '../types';

interface NewAppointmentModalProps {
  onClose: () => void;
  initialTime?: string | null;
  selectedDate?: Date;
}

const serviceTypes: { id: ServiceType; label: string }[] = [
  { id: 'cabelo', label: 'Cabelo' },
  { id: 'manicure', label: 'Manicure' },
  { id: 'pedicure', label: 'Pedicure' },
];

export function NewAppointmentModal({ onClose, initialTime, selectedDate }: NewAppointmentModalProps) {
  const { clients, addAppointment } = useStore();
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [date, setDate] = useState(
    selectedDate 
      ? selectedDate.toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState(initialTime || '09:00');
  const [notes, setNotes] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const handleSubmit = () => {
    if (!selectedClient || !selectedService || !date || !time) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const client = clients.find((c) => c.id === selectedClient);
    if (!client) return;

    const newAppointment = {
      id: `apt-${Date.now()}`,
      clientId: client.id,
      client,
      serviceType: selectedService,
      date: new Date(date),
      time,
      notes,
      status: 'pending' as const,
    };

    addAppointment(newAppointment);
    onClose();
  };

  const selectedClientData = clients.find((c) => c.id === selectedClient);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full bg-cream rounded-t-soft-lg-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm border-b border-rose/50 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-brown">Novo Agendamento</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose/30 rounded-soft transition-colors"
          >
            <X size={24} className="text-brown" />
          </button>
        </div>

        {/* Formulário */}
        <div className="p-6 space-y-6">
          {/* Seleção de Cliente */}
          <div>
            <label className="block text-sm font-medium text-brown mb-2">
              Cliente *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowClientDropdown(!showClientDropdown)}
                className="w-full px-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-left flex items-center justify-between"
              >
                <span className={selectedClientData ? 'text-brown' : 'text-brown/50'}>
                  {selectedClientData?.name || 'Selecione uma cliente'}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-brown/50 transition-transform ${
                    showClientDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showClientDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-rose rounded-soft-lg shadow-soft-lg z-20 max-h-48 overflow-y-auto">
                  {clients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => {
                        setSelectedClient(client.id);
                        setShowClientDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-rose/20 transition-colors text-brown"
                    >
                      {client.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Seleção de Serviço */}
          <div>
            <label className="block text-sm font-medium text-brown mb-2">
              Serviço *
            </label>
            <div className="flex gap-3 flex-wrap">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={`
                    px-5 py-3 rounded-soft-lg font-medium transition-all duration-200
                    ${
                      selectedService === service.id
                        ? 'bg-pink-light text-white shadow-soft'
                        : 'bg-white text-brown border-2 border-rose hover:bg-rose/20'
                    }
                  `}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown mb-2">
                Data *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-2">
                Horário *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20"
              />
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-brown mb-2">
              Observações
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre o serviço..."
              className="w-full px-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown placeholder:text-brown/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 resize-none min-h-[100px]"
            />
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-pink text-white font-medium rounded-soft-lg shadow-soft hover:bg-pink-light hover:shadow-soft-lg transition-all duration-200"
          >
            Salvar Agendamento
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
