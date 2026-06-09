import { motion } from 'framer-motion';
import { 
  User, 
  Clock, 
  Scissors, 
  Bell, 
  LogOut,
  ChevronRight,
  Edit2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { BottomNav } from '../components';

const settingsItems = [
  { id: 'profile', label: 'Meu Perfil', icon: User, description: 'Editar dados pessoais' },
  { id: 'schedule', label: 'Horário de Trabalho', icon: Clock, description: 'Dias e horários disponíveis' },
  { id: 'services', label: 'Catálogo de Serviços', icon: Scissors, description: 'Serviços e preços' },
  { id: 'notifications', label: 'Notificações e Lembretes', icon: Bell, description: 'Configurar alertas' },
];

export function SettingsPage() {
  const { user, logout } = useStore();

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair da conta?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4"
      >
        <h1 className="text-2xl font-semibold text-brown">Configurações</h1>
      </motion.header>

      {/* Perfil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="bg-white rounded-soft-lg p-6 shadow-soft flex items-center gap-4">
          <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center text-brown font-bold text-xl">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-brown">{user?.name}</h2>
            <p className="text-sm text-brown/70">{user?.businessName}</p>
            <p className="text-sm text-brown/60">{user?.email}</p>
          </div>
          <button className="p-2 bg-rose/30 rounded-soft text-brown hover:bg-rose/50 transition-colors">
            <Edit2 size={20} />
          </button>
        </div>
      </motion.div>

      {/* Menu de Opções */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-6 space-y-3"
      >
        {settingsItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="w-full bg-white rounded-soft-lg p-4 shadow-soft flex items-center gap-4 hover:shadow-soft-lg transition-all duration-200"
          >
            <div className="p-3 bg-rose/30 rounded-soft text-brown">
              <item.icon size={22} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-brown">{item.label}</p>
              <p className="text-sm text-brown/60">{item.description}</p>
            </div>
            <ChevronRight size={20} className="text-brown/40" />
          </motion.button>
        ))}
      </motion.div>

      {/* Botão Sair */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mt-8"
      >
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 border-2 border-red-200 rounded-soft-lg p-4 flex items-center gap-4 hover:bg-red-100 transition-colors"
        >
          <div className="p-3 bg-red-100 rounded-soft text-red-600">
            <LogOut size={22} />
          </div>
          <span className="font-medium text-red-600">Sair da Conta</span>
        </button>
      </motion.div>

      {/* Versão do App */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-6 mt-8 text-center"
      >
        <p className="text-sm text-brown/50">Brunet's hair v1.0.0</p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
