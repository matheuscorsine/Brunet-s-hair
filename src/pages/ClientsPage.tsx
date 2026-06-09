import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BottomNav } from '../components';
import { ClientDetailsPage } from './ClientDetailsPage';
import { Client } from '../types';

export function ClientsPage() {
  const { clients } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Filtrar clientes pela busca
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  // Ordenar alfabeticamente
  const sortedClients = [...filteredClients].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4"
      >
        <h1 className="text-2xl font-semibold text-brown">Clientes</h1>
        <p className="text-brown/70 mt-1">{clients.length} clientes cadastradas</p>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/50"
          />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-rose rounded-soft-lg text-brown placeholder:text-brown/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Lista de Clientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 space-y-2"
      >
        {sortedClients.length === 0 ? (
          <div className="text-center py-12 text-brown/60">
            <User size={48} className="mx-auto mb-4 opacity-30" />
            <p>Nenhuma cliente encontrada</p>
          </div>
        ) : (
          sortedClients.map((client, index) => (
            <motion.button
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedClient(client)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-soft-lg shadow-soft hover:shadow-soft-lg transition-all duration-200"
            >
              {/* Avatar */}
              <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center text-brown font-medium">
                {client.name.charAt(0)}
              </div>

              {/* Informações */}
              <div className="flex-1 text-left">
                <p className="font-medium text-brown">{client.name}</p>
                <p className="text-sm text-brown/60">{client.phone}</p>
              </div>

              {/* Ícone de seta */}
              <ChevronRight size={20} className="text-brown/40" />
            </motion.button>
          ))
        )}
      </motion.div>

      <BottomNav />

      {/* Página de Detalhes da Cliente */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailsPage
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
