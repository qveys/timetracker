import React from 'react';
import { LucideIcon } from 'lucide-react';
import { UI_STYLES } from '@/constants/styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, icon: Icon, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`${UI_STYLES.BUTTON.BASE} ${variant === 'primary' ? UI_STYLES.BUTTON.PRIMARY : ''} ${UI_STYLES.BUTTON.DISABLED} ${className}`}
      {...props}
    >
      {Icon && <Icon className={UI_STYLES.BUTTON.ICON} />}
      {children}
    </button>
  );
} 