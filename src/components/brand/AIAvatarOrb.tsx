import { useEffect, useRef } from 'react';

interface AIAvatarOrbProps {
  size?: number;
  isThinking?: boolean;
  pulseSpeed?: 'normal' | 'fast';
  className?: string;
}

export function AIAvatarOrb({
  size = 120,
  isThinking = false,
  className = '',
}: AIAvatarOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.38;

      angle += isThinking ? 0.05 : 0.015;

      // Outer ethereal glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius * 1.3);
      glowGrad.addColorStop(0, 'rgba(241, 102, 35, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(66, 22, 75, 0.4)');
      glowGrad.addColorStop(1, 'rgba(38, 34, 98, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Core Iridescent Sphere (Exact Indigo to Sunset Palette)
      const sphereGrad = ctx.createLinearGradient(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius,
        cx - Math.cos(angle) * radius,
        cy - Math.sin(angle) * radius
      );
      sphereGrad.addColorStop(0, '#262262');
      sphereGrad.addColorStop(0.3, '#42164B');
      sphereGrad.addColorStop(0.55, '#A54055');
      sphereGrad.addColorStop(0.8, '#F16623');
      sphereGrad.addColorStop(1, '#E99856');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner refractive specular highlight
      const specGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.35,
        radius * 0.05,
        cx - radius * 0.2,
        cy - radius * 0.2,
        radius * 0.8
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      specGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Glowing friendly sensor eye slits / nodes
      const eyeSpacing = radius * 0.32;
      const eyeY = cy - radius * 0.05;
      const eyeW = radius * 0.22;
      const eyeH = radius * 0.14;

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#F16623';
      ctx.shadowBlur = 12;

      // Left eye
      ctx.beginPath();
      ctx.ellipse(cx - eyeSpacing, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.ellipse(cx + eyeSpacing, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [size, isThinking]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isThinking ? 'drop-shadow(0 0 24px rgba(241,102,35,0.85))' : 'drop-shadow(0 0 16px rgba(38,34,98,0.75))',
        transition: 'filter 0.3s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}
      />
    </div>
  );
}
