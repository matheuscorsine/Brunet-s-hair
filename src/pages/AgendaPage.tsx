import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, Scissors, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BottomNav, Button } from '../components';
import { NewAppointmentModal } from './NewAppointmentModal';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
];

export function AgendaPage() {
  const { appointments, completeAppointment, cancelAppointment } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Gerar dias da semana atual
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDaysList = getWeekDays();

  // Filtrar agendamentos do dia selecionado
  const dayAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString()
  );

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getAppointmentForTime = (time: string) => {
    return dayAppointments.find((apt) => apt.time === time);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const handleComplete = (id: string) => {
    completeAppointment(id);
  };

  const handleCancel = (id: string) => {
    cancelAppointment(id);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4"
      >
        <h1 className="text-2xl font-semibold text-brown">Agenda</h1>
        <p className="text-brown/70 mt-1">Gerencie seus horários</p>
      </motion.header>

      {/* Calendário Semanal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevWeek}
            className="p-2 hover:bg-rose/30 rounded-soft transition-colors text-brown"
          >
            ←
          </button>
          <span className="text-brown font-medium">
            {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-rose/30 rounded-soft transition-colors text-brown"
          >
            →
          </button>
        </div>

        <div className="flex justify-between gap-2">
          {weekDaysList.map((day, index) => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const hasAppointment = appointments.some(
              (apt) => apt.date.toDateString() === day.toDateString()
            );

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`
                  flex-1 flex flex-col items-center py-3 rounded-soft-lg transition-all duration-200
                  ${isSelected 
                    ? 'bg-pink-light text-white shadow-soft' 
                    : 'bg-white text-brown hover:bg-rose/20'
                  }
                `}
              >
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-brown/60'}`}>
                  {weekDays[day.getDay()]}
                </span>
                <span className={`text-lg font-semibold mt-1 ${isSelected ? 'text-white' : ''}`}>
                  {day.getDate()}
                </span>
                {hasAppointment && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-pink'}`} />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Lista de Horários */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 space-y-3"
      >
        {timeSlots.slice(0, 12).map((time) => {
          const appointment = getAppointmentForTime(time);
          
          return (
            <div
              key={time}
              className="flex items-center gap-4 p-4 bg-white rounded-soft-lg shadow-soft"
            >
              {/* Horário */}
              <div className="w-16">
                <span className="text-brown font-medium">{time}</span>
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                {appointment ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose rounded-full flex items-center justify-center text-brown font-medium">
                        {appointment.client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-brown">{appointment.client.name}</p>
                        <p className="text-sm text-brown/60">
                          {appointment.serviceType === 'cabelo' ? 'Cabelo' : 
                           appointment.serviceType === 'manicure' ? 'Manicure' : 'Pé e Mão'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="flex items-center gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleComplete(appointment.id)}
                            className="p-2 bg-green-100 text-green-700 rounded-soft hover:bg-green-200 transition-colors"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-soft hover:bg-red-200 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <span className="text-sm text-green-600 font-medium">Concluído</span>
                      )}
                      {appointment.status === 'cancelled' && (
                        <span className="text-sm text-red-500 font-medium">Cancelado</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedTime(time);
                      setShowNewAppointment(true);
                    }}
                    className="flex items-center gap-2 text-brown/60 hover:text-pink transition-colors"
                  >
                    <Plus size={20} />
                    <span className="text-sm">Agendar</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Botão Flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNewAppointment(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-pink rounded-full flex items-center justify-center shadow-soft-lg text-white z-40"
      >
        <Plus size={28} />
      </motion.button>

      <BottomNav />

      {/* Modal de Novo Agendamento */}
      <AnimatePresence>
        {showNewAppointment && (
          <NewAppointmentModal
            onClose={() => setShowNewAppointment(false)}
            initialTime={selectedTime}
            selectedDate={selectedDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
