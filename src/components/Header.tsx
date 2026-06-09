import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onClose?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({ title, showBack = false, onClose, rightElement }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 bg-cream/95 backdrop-blur-sm border-b border-rose/50 px-4 py-4 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(showBack || onClose) && (
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-soft hover:bg-rose/30 transition-colors"
            >
              {onClose ? (
                <X size={24} className="text-brown" />
              ) : (
                <ArrowLeft size={24} className="text-brown" />
              )}
            </button>
          )}
          {title && (
            <h1 className="text-xl font-semibold text-brown">{title}</h1>
          )}
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </header>
  );
}