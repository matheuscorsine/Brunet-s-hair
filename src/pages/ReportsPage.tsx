import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BottomNav } from '../components';

type FilterPeriod = 'today' | 'week' | 'month';

export function ReportsPage() {
  const { financialRecords, appointments } = useStore();
  const [period, setPeriod] = useState<FilterPeriod>('week');

  // Filtrar registros pelo período
  const getFilteredRecords = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
      case 'today':
        return financialRecords.filter(
          (r) => r.date.toDateString() === today.toDateString()
        );
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return financialRecords.filter((r) => r.date >= weekAgo);
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return financialRecords.filter((r) => r.date >= monthAgo);
      default:
        return financialRecords;
    }
  };

  const filteredRecords = getFilteredRecords();

  // Calcular métricas
  const totalIncome = filteredRecords
    .filter((r) => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = filteredRecords
    .filter((r) => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const netProfit = totalIncome - totalExpense;

  // Contagem de serviços por tipo
  const serviceCount = {
    cabelo: 0,
    manicure: 0,
    pedicure: 0,
  };

  const completedAppointments = appointments.filter((a) => a.status === 'completed');
  completedAppointments.forEach((apt) => {
    if (apt.serviceType in serviceCount) {
      serviceCount[apt.serviceType as keyof typeof serviceCount]++;
    }
  });

  const totalServices = Object.values(serviceCount).reduce((a, b) => a + b, 0);

  const getServicePercentage = (count: number) => {
    if (totalServices === 0) return 0;
    return Math.round((count / totalServices) * 100);
  };

  const periodLabels = {
    today: 'Hoje',
    week: 'Esta Semana',
    month: 'Este Mês',
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-4"
      >
        <h1 className="text-2xl font-semibold text-brown">Seu Desempenho</h1>
        <p className="text-brown/70 mt-1">Acompanhe seus resultados</p>
      </motion.header>

      {/* Filtro de Período */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="flex gap-2">
          {(['today', 'week', 'month'] as FilterPeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`
                flex-1 py-3 rounded-soft-lg font-medium transition-all duration-200
                ${
                  period === p
                    ? 'bg-pink-light text-white shadow-soft'
                    : 'bg-white text-brown border border-rose hover:bg-rose/20'
                }
              `}
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards de Métricas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-6 space-y-4"
      >
        {/* Faturamento Bruto */}
        <div className="bg-rose rounded-soft-lg p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink/30 rounded-soft">
                <TrendingUp size={24} className="text-brown" />
              </div>
              <div>
                <p className="text-sm text-brown/70">Faturamento Bruto</p>
                <p className="text-2xl font-bold text-brown">
                  R$ {totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gastos com Insumos */}
        <div className="bg-pink/20 rounded-soft-lg p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink/40 rounded-soft">
                <TrendingDown size={24} className="text-brown" />
              </div>
              <div>
                <p className="text-sm text-brown/70">Gastos com Insumos</p>
                <p className="text-2xl font-bold text-brown">
                  R$ {totalExpense.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lucro Líquido */}
        <div className={`rounded-soft-lg p-5 shadow-soft ${
          netProfit >= 0 ? 'bg-pink/30' : 'bg-red-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-soft ${
                netProfit >= 0 ? 'bg-pink/50' : 'bg-red-200'
              }`}>
                <DollarSign size={24} className="text-brown" />
              </div>
              <div>
                <p className="text-sm text-brown/70">Lucro Líquido</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-brown' : 'text-red-600'}`}>
                  R$ {netProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráfico de Serviços */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mt-6"
      >
        <div className="bg-white rounded-soft-lg p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={20} className="text-brown" />
            <h3 className="font-semibold text-brown">Serviços Mais Procurados</h3>
          </div>
          
          <div className="space-y-4">
            {/* Cabelo */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-brown">Cabelo</span>
                <span className="text-sm font-medium text-brown">
                  {getServicePercentage(serviceCount.cabelo)}%
                </span>
              </div>
              <div className="h-3 bg-rose/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink rounded-full transition-all duration-500"
                  style={{ width: `${getServicePercentage(serviceCount.cabelo)}%` }}
                />
              </div>
            </div>

            {/* Manicure */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-brown">Manicure</span>
                <span className="text-sm font-medium text-brown">
                  {getServicePercentage(serviceCount.manicure)}%
                </span>
              </div>
              <div className="h-3 bg-rose/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-light rounded-full transition-all duration-500"
                  style={{ width: `${getServicePercentage(serviceCount.manicure)}%` }}
                />
              </div>
            </div>

            {/* Pedicure */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-brown">Pedicure</span>
                <span className="text-sm font-medium text-brown">
                  {getServicePercentage(serviceCount.pedicure)}%
                </span>
              </div>
              <div className="h-3 bg-rose/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose rounded-full transition-all duration-500"
                  style={{ width: `${getServicePercentage(serviceCount.pedicure)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Histórico Recente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="px-6 mt-6 pb-8"
      >
        <div className="bg-white rounded-soft-lg p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpDown size={20} className="text-brown" />
            <h3 className="font-semibold text-brown">Movimentações Recentes</h3>
          </div>
          
          <div className="space-y-3">
            {filteredRecords.slice(0, 5).map((record, index) => (
              <div
                key={record.id}
                className="flex items-center justify-between py-2 border-b border-rose/30 last:border-0"
              >
                <div>
                  <p className="text-sm text-brown">{record.description}</p>
                  <p className="text-xs text-brown/60">
                    {record.date.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span
                  className={`font-medium ${
                    record.type === 'income' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {record.type === 'income' ? '+' : '-'}R$ {record.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
