import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../components';
import { useStore } from '../store/useStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular delay de login
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Logo e Título */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brown mb-2 tracking-wide">
            Brunet's hair
          </h1>
          <p className="text-brown/70 text-sm font-medium tracking-widest uppercase">
            Beleza & Estilo
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-5"
        >
          {/* Campo E-mail */}
          <div className="relative">
            <Mail 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/50" 
            />
            <input
              type="text"
              placeholder="E-mail ou Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown placeholder:text-brown/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all duration-200"
            />
          </div>

          {/* Campo Senha */}
          <div className="relative">
            <Lock 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/50" 
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-14 py-4 bg-cream border-2 border-rose rounded-soft-lg text-brown placeholder:text-brown/40 focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/50 hover:text-brown transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Botão Entrar */}
          <Button
            type="submit"
            size="lg"
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          {/* Links */}
          <div className="flex flex-col items-center gap-3 mt-6">
            <button
              type="button"
              className="text-sm text-brown/70 hover:text-brown hover:underline transition-colors"
            >
              Esqueci minha senha
            </button>
            <button
              type="button"
              className="text-sm text-brown hover:underline transition-colors font-medium"
            >
              Criar uma conta
            </button>
          </div>
        </motion.form>
      </div>

      {/* Decoração inferior */}
      <div className="h-2 bg-gradient-to-r from-pink via-pink-light to-pink rounded-t-full" />
    </div>
  );
}
