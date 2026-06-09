import { Home, Calendar, Users, BarChart3, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { clsx } from 'clsx';

const tabs = [
  { id: 'dashboard', label: 'Início', icon: Home },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export function BottomNav() {
  const { currentTab, setCurrentTab } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cream border-t border-rose shadow-soft-lg z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={clsx(
                'flex flex-col items-center justify-center py-2 px-3 rounded-soft transition-all duration-300',
                isActive ? 'bg-pink/20' : 'hover:bg-rose/30'
              )}
            >
              <Icon 
                size={24} 
                className={clsx(
                  'transition-colors duration-300',
                  isActive ? 'text-pink' : 'text-brown'
                )}
              />
              <span 
                className={clsx(
                  'text-xs mt-1 transition-colors duration-300',
                  isActive ? 'text-pink font-medium' : 'text-brown'
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}