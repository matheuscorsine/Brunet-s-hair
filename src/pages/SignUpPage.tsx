import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User, Store } from 'lucide-react';
import { Button, Input } from '../components';
import { useStore } from '../store/useStore';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      login(formData.email, formData.password);
      setIsLoading(false);
    }, 800);
  };

  const inputFields = [
    { name: 'fullName', label: 'Nome Completo', icon: User, type: 'text' },
    { name: 'businessName', label: 'Nome do Negócio', icon: Store, type: 'text' },
    { name: 'email', label: 'E-mail', icon: Mail, type: 'email' },
    { name: 'phone', label: 'Telefone', icon: Phone, type: 'tel' },
    { name: 'password', label: 'Senha', icon: Lock, type: 'password' },
    { name: 'confirmPassword', label: 'Confirmar Senha', icon: Lock, type: 'password' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 bg-cream/95 backdrop-blur-sm border-b border-rose/50 px-4 py-4 z-40"
      >
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 rounded-soft hover:bg-rose/30 transition-colors">
            <ArrowLeft size={24} className="text-brown" />
          </button>
          <h1 className="text-xl font-semibold text-brown">Criar Nova Conta</h1>
        </div>
      </motion.header>

      {/* Formulário */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >
        {inputFields.map((field, index) => (
          <div key={field.name} className="relative">
            <field.icon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/50"
            />
            <input
              name={field.name}
              type={
                field.name === 'password' || field.name === 'confirmPassword'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : field.type
              }
              placeholder={field.label}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown placeholder:text-brown/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all duration-200"
            />
            {field.name === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/50 hover:text-brown transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
        ))}

        {/* Botão Cadastrar */}
        <Button
          type="submit"
          size="lg"
          className="w-full mt-8"
          disabled={isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar e Começar'}
        </Button>
      </motion.form>
    </div>
  );
}
