import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getSession, saveSession, clearSession, saveProof } from '../services/storage';
import { Session, Proof } from '../types';

const S02_TimerRunning: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isPausedSheetOpen, setIsPausedSheetOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Initial Load
  useEffect(() => {
    const saved = getSession();
    if (!saved) {
      navigate('/');
      return;
    }
    
    // Recalculate remaining time based on elapsed wall-clock time if it was running
    if (saved.status === 'running') {
      const now = Date.now();
      const elapsed = Math.floor((now - saved.lastTick) / 1000);
      saved.remainingSeconds = Math.max(0, saved.remainingSeconds - elapsed);
      saved.lastTick = now;
      saveSession(saved);
    }
    setSession(saved);
    
    // If loaded state is paused, open sheet automatically or just stay paused
    if (saved.status === 'paused') {
        setIsPausedSheetOpen(true);
    }
  }, [navigate]);

  // Timer Logic
  useEffect(() => {
    if (!session || session.status === 'paused' || session.remainingSeconds <= 0) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSession(prev => {
        if (!prev) return null;
        const now = Date.now();
        // Calculate precise delta
        const delta = Math.floor((now - prev.lastTick) / 1000);
        
        // If delta is huge (device sleep), we catch up
        // If delta is 0 (fast updates), we wait
        if (delta < 1) return prev;

        const newRemaining = Math.max(0, prev.remainingSeconds - delta);
        
        const nextSession = {
          ...prev,
          remainingSeconds: newRemaining,
          lastTick: now
        };
        saveSession(nextSession);
        return nextSession;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [session?.status]);

  const handlePauseToggle = () => {
    if (!session) return;
    
    const newSession = {
        ...session,
        status: 'paused' as const,
        lastTick: Date.now()
    };
    setSession(newSession);
    saveSession(newSession);
    setIsPausedSheetOpen(true);
  };

  const handleResume = () => {
    if (!session) return;
    const newSession = {
        ...session,
        status: 'running' as const,
        lastTick: Date.now()
    };
    setSession(newSession);
    saveSession(newSession);
    setIsPausedSheetOpen(false);
  };

  const handleStopForToday = () => {
    if (!session) return;

    // Save as abandoned proof
    const abandonedProof: Proof = {
        id: Date.now().toString(),
        goal: session.goal,
        date: new Date().toISOString(),
        durationMinutes: session.durationMinutes,
        status: 'abandoned',
        reflection: '중단함'
    };
    saveProof(abandonedProof);

    clearSession();
    navigate('/log');
  };

  const handleComplete = () => {
    navigate('/complete');
  };

  const handleExtend = () => {
    if (!session) return;
    const newSession = {
      ...session,
      durationMinutes: session.durationMinutes + 5,
      remainingSeconds: session.remainingSeconds + 300,
      lastTick: Date.now()
    };
    setSession(newSession);
    saveSession(newSession);
  };

  const handleEarlyComplete = () => {
    if (!session) return;
    
    // Calculate actual elapsed minutes (minimum 1)
    const totalSeconds = session.durationMinutes * 60;
    const elapsedSeconds = totalSeconds - session.remainingSeconds;
    const elapsedMinutes = Math.max(1, Math.ceil(elapsedSeconds / 60));

    const completedSession = {
      ...session,
      durationMinutes: elapsedMinutes,
      remainingSeconds: 0,
      lastTick: Date.now()
    };
    
    saveSession(completedSession);
    navigate('/complete');
  };

  if (!session) return null;

  const progress = 1 - (session.remainingSeconds / (session.durationMinutes * 60));
  const minutes = Math.floor(session.remainingSeconds / 60);
  const seconds = session.remainingSeconds % 60;
  const fmtTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Layout hideHeader>
      <div className="flex flex-col items-center justify-between h-full pt-12 pb-8 relative">
        
        {/* Top Goal Display */}
        <div className="w-full text-center space-y-4 px-4">
          <p className="text-hw-muted text-sm tracking-wide uppercase">Current Goal</p>
          <h2 className="text-2xl font-medium text-hw-fg leading-snug break-keep">
            {session.goal}
          </h2>
        </div>

        {/* Timer Ring */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background Ring */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="var(--hw-border)"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Progress Ring */}
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="var(--hw-fg)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress)} 
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="text-5xl font-light text-hw-fg tabular-nums tracking-tighter">
            {fmtTime}
          </div>
        </div>

        {/* Actions */}
        <div className="w-full px-4 space-y-6">
            {session.remainingSeconds === 0 ? (
                 <Button fullWidth onClick={handleComplete} className="animate-pulse">
                    완료하기
                 </Button>
            ) : (
                <>
                  <Button fullWidth variant="secondary" onClick={handlePauseToggle}>
                      잠시 멈춤
                  </Button>
                  
                  <div className="flex items-start justify-between px-2 pt-2 gap-4">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleExtend}
                      className="whitespace-nowrap"
                    >
                      + 5분 연장
                    </Button>
                    
                    <div className="flex flex-col items-end gap-1 flex-1">
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={handleEarlyComplete}
                        className="justify-end"
                      >
                        지금 완료하기
                      </Button>
                      <span className="text-xs text-hw-muted opacity-60 text-right">
                        지금 여기까지도 충분해요
                      </span>
                    </div>
                  </div>
                </>
            )}
        </div>

        {/* Pause Sheet Overlay */}
        {isPausedSheetOpen && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
                onClick={handleResume}
            />
            <div className="bg-white rounded-t-3xl p-8 z-10 shadow-2xl animate-slide-up space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-medium">잠시 쉬어가시겠어요?</h3>
                <p className="text-hw-muted text-sm">지금까지의 집중도 충분히 의미가 있습니다.</p>
              </div>
              <div className="space-y-3">
                <Button fullWidth variant="primary" onClick={handleResume}>
                  다시 집중하기 (재개)
                </Button>
                <Button fullWidth variant="danger-ghost" onClick={handleStopForToday}>
                  오늘은 그만하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default S02_TimerRunning;