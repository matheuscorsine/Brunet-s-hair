import { motion } from 'framer-motion';
import { Clock, DollarSign, Scissors, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BottomNav } from '../components';

export function DashboardPage() {
  const { user, appointments, financialRecords } = useStore();

  // Filtrar agendamentos de hoje
  const today = new Date();
  const todayAppointments = appointments.filter(
    (apt) =>
      apt.date.toDateString() === today.toDateString() &&
      apt.status === 'pending'
  );

  // Calcular faturamento do dia
  const todayIncome = financialRecords
    .filter(
      (record) =>
        record.date.toDateString() === today.toDateString() &&
        record.type === 'income'
    )
    .reduce((sum, record) => sum + record.amount, 0);

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'cabelo':
        return <Scissors size={18} />;
      case 'manicure':
      case 'pedicure':
        return <User size={18} />;
      default:
        return <User size={18} />;
    }
  };

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'cabelo':
        return 'Cabelo';
      case 'manicure':
        return 'Manicure';
      case 'pedicure':
        return 'Pé e Mão';
      default:
        return serviceType;
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Saudação */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4"
      >
        <h1 className="text-2xl font-semibold text-brown">
          Olá, {user?.name}! 👋
        </h1>
        <p className="text-brown/70 mt-1">
          Bem-vinda ao Brunet's hair
        </p>
      </motion.header>

      <div className="px-6 space-y-6">
        {/* Cards de Resumo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-rose rounded-soft-lg p-5 shadow-soft"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink/30 rounded-soft">
                <Clock size={24} className="text-brown" />
              </div>
              <div>
                <p className="text-sm text-brown/70">Próximo atendimento</p>
                <p className="text-lg font-semibold text-brown">em 15 min</p>
                <p className="text-sm text-brown/80">Maria Santos - Cabelo</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-pink/20 rounded-soft-lg p-5 shadow-soft"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink/40 rounded-soft">
              <DollarSign size={24} className="text-brown" />
            </div>
            <div>
              <p className="text-sm text-brown/70">Faturamento do Dia</p>
              <p className="text-2xl font-bold text-brown">
                R$ {todayIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lista de Próximos Agendamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-brown mb-4">
            Próximos Agendamentos de Hoje
          </h2>
          
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8 text-brown/60">
              <p>Nenhum agendamento para hoje</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map((apt, index) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-soft-lg p-4 shadow-soft flex items-center gap-4 cursor-pointer hover:shadow-soft-lg transition-shadow"
                >
                  {/* Foto de perfil (placeholder) */}
                  <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center text-brown font-medium">
                    {apt.client.name.charAt(0)}
                  </div>
                  
                  {/* Informações */}
                  <div className="flex-1">
                    <p className="font-medium text-brown">{apt.client.name}</p>
                    <div className="flex items-center gap-2 text-sm text-brown/70">
                      {getServiceIcon(apt.serviceType)}
                      <span>{getServiceLabel(apt.serviceType)}</span>
                    </div>
                  </div>
                  
                  {/* Horário */}
                  <div className="text-right">
                    <p className="font-semibold text-brown">{apt.time}</p>
                    <p className="text-xs text-brown/60">Agendado</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
