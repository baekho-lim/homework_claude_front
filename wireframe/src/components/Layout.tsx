import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, hideHeader = false, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  return (
    <div className="min-h-screen w-full max-w-md mx-auto relative flex flex-col px-6 py-8 bg-hw-bg transition-colors duration-500">
      {!hideHeader && (
        <header className="flex items-center justify-between mb-8 h-12">
          {isHome ? (
             <div className="font-semibold text-lg text-hw-fg tracking-tight">Homework</div>
          ) : (
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-hw-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {title && <span className="text-hw-fg font-medium">{title}</span>}
             </div>
          )}
          
          <button 
            onClick={() => navigate('/log')}
            className="text-sm font-medium text-hw-muted hover:text-hw-fg transition-colors"
          >
            기록
          </button>
        </header>
      )}
      <main className="flex-1 flex flex-col relative z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;