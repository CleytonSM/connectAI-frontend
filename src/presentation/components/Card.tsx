import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card bg-base-100 shadow-xl ${className}`}>
    <div className="card-body">
      {children}
    </div>
  </div>
);

export default Card;
