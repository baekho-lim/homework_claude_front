import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { saveSession, getSession } from '../services/storage';

const S01_GoalStart: React.FC = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');

  // If there's already an active session, go to timer
  useEffect(() => {
    const existing = getSession();
    if (existing && existing.remainingSeconds > 0) {
      navigate('/timer');
    }
  }, [navigate]);

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!goal.trim()) return;

    const session = {
      goal: goal.trim(),
      durationMinutes: 30,
      remainingSeconds: 30 * 60,
      status: 'running' as const,
      startedAt: Date.now(),
      lastTick: Date.now(),
    };

    saveSession(session);
    navigate('/timer');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full justify-center pb-20">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-light text-hw-fg leading-tight">
              어떤 작업을<br />시작하시나요?
            </h1>
            <p className="text-hw-muted text-sm">
              작고 구체적인 목표 하나를 적어주세요.
            </p>
          </div>

          <form onSubmit={handleStart} className="pt-8 space-y-10">
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="예: 책 30페이지 읽기"
              className="w-full bg-transparent border-b-2 border-hw-border py-4 text-xl text-hw-fg placeholder:text-zinc-300 focus:outline-none focus:border-hw-fg transition-colors"
              autoFocus
            />
            
            <Button 
              type="submit"
              fullWidth 
              disabled={!goal.trim()}
            >
              30분, 지금 시작하기
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default S01_GoalStart;