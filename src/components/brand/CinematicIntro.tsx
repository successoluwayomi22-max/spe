// XERXES Cinematic Opening Sequence (Part 18 of Master PRD)
import { useEffect, useState, useRef, type FC } from 'react';
import { XerxesLogo } from './Logos';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence stages:
    // Stage 0: Black screen with single pulsing singularity point (0 - 1.2s)
    // Stage 1: Point erupts into neural mesh network (1.2s - 2.8s)
    // Stage 2: Mesh resolves into sharp geometric X (2.8s - 4.5s)
    // Stage 3: X expands into interconnected digital world (people, objects, devices, cities) (4.5s - 6.2s)
    // Stage 4: Resolves to XERXES brandmark + "INTELLIGENCE FOR THE WORLD AROUND YOU" (6.2s - 8s)

    const timers = [
      setTimeout(() => setStage(1), 1200),
      setTimeout(() => setStage(2), 2800),
      setTimeout(() => setStage(3), 4500),
      setTimeout(() => setStage(4), 6200),
      setTimeout(() => onComplete(), 8200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Particle background for the network stage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.4;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      role="dialog"
      aria-label="XERXES Cinematic Introduction"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#05070D',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        overflow: 'hidden',
        transition: 'opacity 0.6s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: stage >= 1 ? 0.7 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          padding: '8px 18px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '1px',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
      >
        SKIP INTRO &rarr;
      </button>

      {/* Sequence Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          maxWidth: '680px',
          zIndex: 5,
        }}
      >
        {/* Stage 0: Singularity point */}
        {stage === 0 && (
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#00F0FF',
              boxShadow: '0 0 24px 8px rgba(0, 240, 255, 0.8)',
              animation: 'pulse 1.2s infinite alternate ease-in-out',
            }}
          />
        )}

        {/* Stage 1: Point becomes Network */}
        {stage === 1 && (
          <div style={{ animation: 'fadeIn 0.8s ease' }}>
            <div
              style={{
                fontSize: '14px',
                letterSpacing: '4px',
                color: '#00F0FF',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Sensory Matrix Initializing
            </div>
            <div style={{ fontSize: '22px', fontWeight: 300, color: 'rgba(255, 255, 255, 0.8)' }}>
              Connecting cameras, objects, telemetry, and places...
            </div>
          </div>
        )}

        {/* Stage 2: Formation of the Geometric X */}
        {stage === 2 && (
          <div style={{ animation: 'scaleUp 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <XerxesLogo variant="lettermark" size={96} colorMode="brand" />
            <div
              style={{
                marginTop: '20px',
                fontSize: '13px',
                letterSpacing: '5px',
                color: '#8B5CF6',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Geometric Perception Forming
            </div>
          </div>
        )}

        {/* Stage 3: X expands into Digital World */}
        {stage === 3 && (
          <div style={{ animation: 'fadeIn 0.8s ease' }}>
            <XerxesLogo variant="symbol" size={110} colorMode="brand" />
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '24px',
              }}
            >
              {['OBJECTS', 'PLACES', 'PEOPLE', 'DEVICES', 'AUTOMATION'].map((entity, i) => (
                <span
                  key={entity}
                  style={{
                    padding: '4px 12px',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    borderRadius: '12px',
                    background: 'rgba(0, 240, 255, 0.08)',
                    color: '#00F0FF',
                    animation: `fadeIn 0.5s ease ${i * 0.15}s both`,
                  }}
                >
                  {entity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stage 4: Climax — Brandmark + Tagline */}
        {stage >= 4 && (
          <div style={{ animation: 'climaxReveal 0.9s ease' }}>
            <div style={{ marginBottom: '16px' }}>
              <XerxesLogo variant="combo" size={54} colorMode="brand" />
            </div>
            <p
              style={{
                fontSize: '16px',
                letterSpacing: '4px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginTop: '16px',
                lineHeight: 1.5,
              }}
            >
              « Intelligence for the world around you »
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes climaxReveal {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
