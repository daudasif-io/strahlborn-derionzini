"use client";

import { useEffect, useRef } from "react";

interface Segment {
  x: number;
  y: number;
}

interface Branch {
  segments: Segment[];
  opacity: number;
}

interface Lightning {
  segments: Segment[];
  opacity: number;
  width: number;
  timer: number;
  duration: number;
  branches: Branch[];
}

export default function ThunderEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const generateLightning = (
      startX: number,
      startY: number,
      endY: number
    ): Segment[] => {
      const segments: Segment[] = [{ x: startX, y: startY }];
      const steps = 10 + Math.floor(Math.random() * 6);
      const stepHeight = (endY - startY) / steps;
      let currentX = startX;

      for (let i = 1; i <= steps; i++) {
        currentX += (Math.random() - 0.5) * 55;
        currentX = Math.max(20, Math.min(canvas.width - 20, currentX));
        segments.push({ x: currentX, y: startY + stepHeight * i });
      }

      return segments;
    };

    const generateBranch = (
      fromX: number,
      fromY: number,
      dir: number
    ): Segment[] => {
      const segments: Segment[] = [{ x: fromX, y: fromY }];
      const steps = 3 + Math.floor(Math.random() * 3);
      let x = fromX;
      let y = fromY;

      for (let i = 0; i < steps; i++) {
        x += dir * (18 + Math.random() * 25);
        y += 18 + Math.random() * 22;
        segments.push({ x, y });
      }

      return segments;
    };

    // Draw lightning using shadowBlur — GPU accelerated, no ctx.filter
    const drawPath = (
      segments: Segment[],
      opacity: number,
      width: number
    ) => {
      if (segments.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);
      for (let i = 1; i < segments.length; i++) {
        ctx.lineTo(segments[i].x, segments[i].y);
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Glow via shadowBlur — GPU composited, no CPU blur
      ctx.shadowColor = `rgba(180, 210, 255, ${opacity})`;
      ctx.shadowBlur = 18;
      ctx.strokeStyle = `rgba(220, 235, 255, ${opacity * 0.9})`;
      ctx.lineWidth = width * 2.5;
      ctx.stroke();

      // Sharp core on top
      ctx.shadowBlur = 6;
      ctx.strokeStyle = `rgba(240, 248, 255, ${opacity})`;
      ctx.lineWidth = width;
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };

    const lightnings: Lightning[] = [];

    const createLightning = () => {
      const startX = canvas.width * 0.1 + Math.random() * canvas.width * 0.8;
      const startY = 0;
      const endY = canvas.height * 0.2 + Math.random() * canvas.height * 0.2;
      const mainSegments = generateLightning(startX, startY, endY);

      const branches: Branch[] = [];
      const numBranches = 1 + Math.floor(Math.random() * 2);

      for (let b = 0; b < numBranches; b++) {
        const idx = Math.floor(
          mainSegments.length * 0.3 +
          Math.random() * mainSegments.length * 0.4
        );
        const point = mainSegments[idx];
        if (point) {
          branches.push({
            segments: generateBranch(point.x, point.y, Math.random() > 0.5 ? 1 : -1),
            opacity: 0.35 + Math.random() * 0.3,
          });
        }
      }

      lightnings.push({
        segments: mainSegments,
        opacity: 1,
        width: 1.2 + Math.random() * 1.2,
        timer: 0,
        duration: 5 + Math.floor(Math.random() * 6),
        branches,
      });
    };

    let frame = 0;
    // Faster interval — 40 to 120 frames (was 80 to 280)
    let nextIn = 40 + Math.floor(Math.random() * 80);
    let animId: number;

    const draw = () => {
      // Clear only — no fill, keeps it transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame >= nextIn) {
        createLightning();
        frame = 0;
        nextIn = 40 + Math.floor(Math.random() * 120);

        // Double strike occasionally
        if (Math.random() > 0.65) {
          setTimeout(createLightning, 60 + Math.random() * 80);
        }
      }

      for (let i = lightnings.length - 1; i >= 0; i--) {
        const bolt = lightnings[i];
        bolt.timer++;

        let opacity: number;

        if (bolt.timer === 1) {
          // Quick screen flash — single rect, very cheap
          ctx.fillStyle = "rgba(200, 220, 255, 0.035)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          opacity = 1;
        } else if (bolt.timer < 4) {
          opacity = 1;
        } else {
          opacity = Math.max(0, 1 - (bolt.timer - 3) / (bolt.duration - 3));
        }

        drawPath(bolt.segments, opacity, bolt.width);

        bolt.branches.forEach((branch) => {
          drawPath(branch.segments, opacity * branch.opacity, bolt.width * 0.45);
        });

        if (bolt.timer >= bolt.duration) {
          lightnings.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: "screen" }}
    />
  );
}