import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { getProof } from '../services/storage';
import { Proof } from '../types';

const S05_ShareExport: React.FC = () => {
  const { proofId } = useParams();
  const navigate = useNavigate();
  const [proof, setProof] = useState<Proof | null>(null);
  const [template, setTemplate] = useState<'A' | 'B'>('A');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (proofId) {
      const p = getProof(proofId);
      if (p) setProof(p);
      else navigate('/log');
    }
  }, [proofId, navigate]);

  // Canvas Drawing Logic
  useEffect(() => {
    if (!proof || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas settings (High res 9:16)
    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#FAFAFA'; // hw-bg
    ctx.fillRect(0, 0, W, H);

    // Common Text Config
    ctx.fillStyle = '#27272A'; // hw-fg
    ctx.textAlign = 'center';

    if (template === 'A') {
      // --- Template A: Text Only Minimal ---
      
      // Date
      const dateStr = new Date(proof.date).toLocaleDateString('ko-KR', {
          month: 'long', day: 'numeric', weekday: 'long'
      });
      ctx.font = '300 40px Pretendard, sans-serif';
      ctx.fillStyle = '#A1A1AA';
      ctx.fillText(dateStr, W/2, 400);

      // Duration Ring / Icon placeholder
      ctx.beginPath();
      ctx.arc(W/2, 600, 40, 0, 2 * Math.PI);
      ctx.fillStyle = '#E4E4E7';
      ctx.fill();
      
      // Time
      ctx.font = '500 48px Pretendard, sans-serif';
      ctx.fillStyle = '#52525B';
      ctx.fillText(`${proof.durationMinutes} min focus`, W/2, 700);

      // Goal (Wrap text)
      ctx.font = '600 80px Pretendard, sans-serif';
      ctx.fillStyle = '#27272A';
      wrapText(ctx, proof.goal, W/2, 900, 800, 100);

      // Reflection
      if (proof.reflection) {
          ctx.font = '400 50px Pretendard, sans-serif';
          ctx.fillStyle = '#71717A';
          wrapText(ctx, `"${proof.reflection}"`, W/2, 1300, 700, 70);
      }

      // Footer
      ctx.font = '400 32px Pretendard, sans-serif';
      ctx.fillStyle = '#D4D4D8';
      ctx.fillText('Homework.', W/2, H - 100);

    } else {
      // --- Template B: Image Placeholder ---
      
      // Gray Image Area
      ctx.fillStyle = '#E4E4E7';
      ctx.fillRect(140, 200, 800, 800); // Square placeholder
      
      // Date
      const dateStr = new Date(proof.date).toLocaleDateString('ko-KR');
      ctx.textAlign = 'left';
      ctx.font = '400 40px Pretendard, sans-serif';
      ctx.fillStyle = '#71717A';
      ctx.fillText(dateStr, 140, 1100);

      // Goal
      ctx.font = '600 70px Pretendard, sans-serif';
      ctx.fillStyle = '#27272A';
      wrapText(ctx, proof.goal, 140, 1220, 800, 90, 'left');

      // Duration tag
      ctx.font = '500 40px Pretendard, sans-serif';
      ctx.fillStyle = '#52525B';
      ctx.fillText(`${proof.durationMinutes}분 집중 완료`, 140, 1500);

      // Footer
      ctx.textAlign = 'center';
      ctx.font = '400 32px Pretendard, sans-serif';
      ctx.fillStyle = '#D4D4D8';
      ctx.fillText('Homework.', W/2, H - 100);
    }

  }, [proof, template]);

  const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, align: 'center' | 'left' = 'center') => {
    const words = text.split(''); // Char split for Korean breaking
    let line = '';
    let currentY = y;

    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n];
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `proof-${proof?.id}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  if (!proof) return null;

  return (
    <Layout title="기록 공유" hideHeader={false}>
      <div className="flex flex-col h-full space-y-6">
        {/* Template Selector */}
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          <button 
            onClick={() => setTemplate('A')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${template === 'A' ? 'bg-white shadow-sm text-hw-fg' : 'text-hw-muted'}`}
          >
            텍스트
          </button>
          <button 
            onClick={() => setTemplate('B')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${template === 'B' ? 'bg-white shadow-sm text-hw-fg' : 'text-hw-muted'}`}
          >
            카드
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-zinc-100 rounded-hw-lg overflow-hidden relative flex items-center justify-center p-4">
             {/* The canvas is the source of truth, but we might scale it down with CSS for preview */}
             <canvas 
                ref={canvasRef} 
                className="w-full h-auto shadow-lg rounded-sm max-h-[60vh] object-contain bg-white"
             />
        </div>

        <div className="flex gap-3">
          <Button fullWidth variant="secondary" onClick={() => navigate('/log')}>
            완료
          </Button>
          <Button fullWidth variant="primary" onClick={handleDownload}>
            이미지 저장
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default S05_ShareExport;