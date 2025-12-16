import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getSession, clearSession, saveProof } from '../services/storage';
import { Proof } from '../types';

const S04_CompleteProof: React.FC = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [sessionData, setSessionData] = useState<{goal: string, duration: number} | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/');
      return;
    }
    setSessionData({
      goal: session.goal,
      duration: session.durationMinutes
    });
  }, [navigate]);

  const handleCreateProof = () => {
    if (!sessionData) return;

    const newProof: Proof = {
      id: Date.now().toString(), // Simple ID
      goal: sessionData.goal,
      date: new Date().toISOString(),
      durationMinutes: sessionData.duration,
      reflection: reflection.trim() || undefined,
    };

    saveProof(newProof);
    clearSession();
    navigate(`/share/${newProof.id}`);
  };

  if (!sessionData) return null;

  return (
    <Layout>
      <div className="flex flex-col h-full pt-10 pb-8">
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-light text-hw-fg">
              수고하셨습니다.
            </h1>
            <p className="text-hw-muted">
              {sessionData.duration}분간의 집중이 완료되었습니다.
            </p>
          </div>

          <div className="p-6 bg-white rounded-hw-lg border border-hw-border space-y-4">
            <div>
              <div className="text-xs text-hw-muted uppercase tracking-wider mb-1">완료한 작업</div>
              <div className="text-lg font-medium text-hw-fg">{sessionData.goal}</div>
            </div>
            <div className="w-full h-px bg-zinc-100" />
             <div>
              <div className="text-xs text-hw-muted uppercase tracking-wider mb-2">짧은 회고 (선택)</div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="어떤 기분이 드나요?"
                className="w-full text-sm p-3 bg-zinc-50 rounded-lg border-none focus:ring-1 focus:ring-hw-accent resize-none placeholder:text-zinc-300"
                rows={3}
              />
            </div>
          </div>
        </div>

        <Button fullWidth onClick={handleCreateProof}>
          기록 남기기
        </Button>
      </div>
    </Layout>
  );
};

export default S04_CompleteProof;