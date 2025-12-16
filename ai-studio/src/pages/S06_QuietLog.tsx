import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getProofs, saveSession } from '../services/storage';
import { Proof } from '../types';

const S06_QuietLog: React.FC = () => {
  const navigate = useNavigate();
  const [proofs, setProofs] = useState<Proof[]>([]);

  useEffect(() => {
    setProofs(getProofs());
  }, []);

  const handleStartAgain = (goalTitle: string) => {
    // Start a new session with the same title immediately
    const session = {
      goal: goalTitle,
      durationMinutes: 30,
      remainingSeconds: 30 * 60,
      status: 'running' as const,
      startedAt: Date.now(),
      lastTick: Date.now(),
    };
    saveSession(session);
    navigate('/timer');
  };

  const handleClickProof = (proof: Proof) => {
    navigate(`/share/${proof.id}`);
  };

  return (
    <Layout title="기록">
      <div className="pb-10">
        {proofs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-hw-muted space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 opacity-50">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>아직 기록된 작업이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {proofs.map((proof) => {
              const isAbandoned = proof.status === 'abandoned';
              return (
                <div 
                  key={proof.id}
                  className={`p-5 rounded-hw-lg border transition-colors cursor-pointer group relative ${isAbandoned ? 'bg-zinc-50 border-hw-border opacity-70' : 'bg-white border-hw-border hover:border-hw-accent'}`}
                  onClick={() => handleClickProof(proof)}
                >
                  <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${isAbandoned ? 'bg-zinc-100 text-hw-muted' : 'bg-zinc-50 text-hw-muted'}`}>
                          {new Date(proof.date).toLocaleDateString()}
                          {isAbandoned && ' • 중단됨'}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                            variant="link" 
                            size="sm"
                            className="text-xs h-auto p-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStartAgain(proof.goal);
                            }}
                        >
                            다시 시작하기
                        </Button>
                      </div>
                  </div>
                  <h3 className={`text-lg font-medium mb-1 ${isAbandoned ? 'text-hw-muted line-through' : 'text-hw-fg'}`}>{proof.goal}</h3>
                  <div className="text-sm text-hw-muted flex items-center gap-2">
                      <span>{proof.durationMinutes}분 목표</span>
                      {proof.reflection && (
                          <>
                              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                              <span className="truncate max-w-[150px]">"{proof.reflection}"</span>
                          </>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default S06_QuietLog;