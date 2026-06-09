import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, Scissors, User } from 'lucide-react';
import { Client } from '../types';

interface ClientDetailsPageProps {
  client: Client;
  onClose: () => void;
}

export function ClientDetailsPage({ client, onClose }: ClientDetailsPageProps) {
  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'cabelo':
        return 'Cabelo';
      case 'manicure':
        return 'Manicure';
      case 'pedicure':
        return 'Pedicure';
      default:
        return serviceType;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'cabelo':
        return <Scissors size={16} />;
      case 'manicure':
      case 'pedicure':
        return <User size={16} />;
      default:
        return <User size={16} />;
    }
  };

  // Calcular total gasto pela cliente
  const totalSpent = client.serviceHistory.reduce((sum, record) => sum + record.price, 0);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-0 bg-cream z-50 overflow-y-auto"
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 bg-cream/95 backdrop-blur-sm border-b border-rose/50 px-4 py-4 z-40"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-soft hover:bg-rose/30 transition-colors"
          >
            <ArrowLeft size={24} className="text-brown" />
          </button>
          <h1 className="text-xl font-semibold text-brown">Detalhes da Cliente</h1>
        </div>
      </motion.header>

      <div className="p-6 space-y-6">
        {/* Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-soft-lg p-6 shadow-soft text-center"
        >
          <div className="w-20 h-20 bg-rose rounded-full flex items-center justify-center text-brown font-bold text-2xl mx-auto mb-4">
            {client.name.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold text-brown">{client.name}</h2>
          
          <div className="flex items-center justify-center gap-2 mt-2 text-brown/70">
            <Phone size={16} />
            <span>{client.phone}</span>
          </div>
          
          {client.email && (
            <div className="flex items-center justify-center gap-2 mt-1 text-brown/70">
              <Mail size={16} />
              <span>{client.email}</span>
            </div>
          )}

          {client.notes && (
            <p className="mt-4 text-sm text-brown/70 italic">{client.notes}</p>
          )}
        </motion.div>

        {/* Informações Cruciais */}
        {client.allergies && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-rose rounded-soft-lg p-5 shadow-soft"
          >
            <h3 className="font-semibold text-brown mb-3">⚠️ Informações Cruciais</h3>
            <p className="text-brown">{client.allergies}</p>
          </motion.div>
        )}

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-pink/20 rounded-soft-lg p-4 text-center">
            <p className="text-sm text-brown/70">Total de Visitas</p>
            <p className="text-2xl font-bold text-brown">{client.serviceHistory.length}</p>
          </div>
          <div className="bg-pink/20 rounded-soft-lg p-4 text-center">
            <p className="text-sm text-brown/70">Total Gasto</p>
            <p className="text-2xl font-bold text-brown">R$ {totalSpent.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Histórico de Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-brown mb-4">Histórico de Serviços</h3>
          
          {client.serviceHistory.length === 0 ? (
            <div className="text-center py-8 text-brown/60 bg-white rounded-soft-lg">
              <p>Nenhum serviço realizado ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...client.serviceHistory]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-soft-lg p-4 shadow-soft flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose/30 rounded-soft text-brown">
                        {getServiceIcon(record.serviceType)}
                      </div>
                      <div>
                        <p className="font-medium text-brown">
                          {getServiceLabel(record.serviceType)}
                        </p>
                        <p className="text-sm text-brown/60">
                          {record.date.toLocaleDateString('pt-BR')}
                          {record.notes && ` • ${record.notes}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-brown">
                      R$ {record.price.toFixed(2)}
                    </span>
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
