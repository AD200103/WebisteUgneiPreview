import { useEffect, useRef } from "react";
import styles from "./LiquidReveal.module.css";

type LiquidRevealProps = {
  topImage: string;
  bottomImage: string;
};

type TrailPoint = {
  x: number;
  y: number;
};

type PointerData = {
  x: number;
  y: number;
  lastMoveTime: number;
  touching: boolean;
};

const LiquidReveal = ({ topImage, bottomImage }: LiquidRevealProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const trailRef = useRef<TrailPoint[]>([]);

  const pointerRef = useRef<PointerData>({
    x: 0,
    y: 0,
    lastMoveTime: 0,
    touching: false,
  });

  const revealSizeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // =====================================
    // SETTINGS
    // =====================================

    const MAX_REVEAL_SIZE = 300;

    // Lower = slower / gooier.
    const SIZE_SPEED = 0.06;

    // Distance between trail points.
    const POINT_SPACING = 6;

    // Desktop: time before we decide
    // that the mouse stopped moving.
    const STOP_DELAY = 80;

    // How quickly the old trail retracts.
    const RETRACT_SPEED = 4;

    const MAX_TRAIL_POINTS = 180;

    // =====================================
    // IMAGE
    // =====================================

    const revealImage = new Image();

    revealImage.src = bottomImage;

    // =====================================
    // CANVAS
    // =====================================

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // =====================================
    // POINTER POSITION
    // =====================================

    let lastX: number | null = null;
    let lastY: number | null = null;

    // =====================================
    // ADD TRAIL
    // =====================================

    const addTrailPoint = (x: number, y: number) => {
      /*
       * First point.
       */
      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;

        trailRef.current.push({
          x,
          y,
        });

        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /*
       * Fill all gaps between the previous
       * and current pointer position.
       */
      const steps = Math.max(Math.ceil(distance / POINT_SPACING), 1);

      for (let i = 1; i <= steps; i++) {
        const progress = i / steps;

        trailRef.current.push({
          x: lastX + dx * progress,
          y: lastY + dy * progress,
        });
      }

      /*
       * Prevent the array from growing
       * forever.
       */
      if (trailRef.current.length > MAX_TRAIL_POINTS) {
        trailRef.current.splice(0, trailRef.current.length - MAX_TRAIL_POINTS);
      }

      lastX = x;
      lastY = y;
    };

    // =====================================
    // POINTER DOWN
    // =====================================

    const handlePointerDown = (event: PointerEvent) => {
      /*
       * We mainly need pointerDown for
       * touch screens.
       */
      if (event.pointerType === "touch") {
        pointerRef.current.touching = true;
      }

      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.lastMoveTime = performance.now();

      lastX = x;
      lastY = y;

      trailRef.current.push({
        x,
        y,
      });
    };

    // =====================================
    // POINTER MOVE
    // =====================================

    const handlePointerMove = (event: PointerEvent) => {
      /*
       * On touch devices we only reveal
       * while the finger is actually down.
       *
       * Mouse doesn't have this restriction
       * because we want normal hover.
       */
      if (event.pointerType === "touch" && !pointerRef.current.touching) {
        return;
      }

      const rect = container.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      pointerRef.current.x = x;
      pointerRef.current.y = y;

      pointerRef.current.lastMoveTime = performance.now();

      addTrailPoint(x, y);
    };

    // =====================================
    // POINTER UP
    // =====================================

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        pointerRef.current.touching = false;

        /*
         * Force retraction immediately
         * when the finger leaves.
         */
        pointerRef.current.lastMoveTime = 0;
      }

      lastX = null;
      lastY = null;
    };

    // =====================================
    // POINTER LEAVE
    // =====================================

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        pointerRef.current.touching = false;
      }

      pointerRef.current.lastMoveTime = 0;

      lastX = null;
      lastY = null;
    };

    // =====================================
    // POINTER CANCEL
    // =====================================

    const handlePointerCancel = () => {
      pointerRef.current.touching = false;
      pointerRef.current.lastMoveTime = 0;

      lastX = null;
      lastY = null;
    };

    // =====================================
    // EVENT LISTENERS
    // =====================================

    container.addEventListener("pointerdown", handlePointerDown);

    container.addEventListener("pointermove", handlePointerMove);

    container.addEventListener("pointerup", handlePointerUp);

    container.addEventListener("pointerleave", handlePointerLeave);

    container.addEventListener("pointercancel", handlePointerCancel);

    // =====================================
    // ANIMATION
    // =====================================

    let animationId: number;

    const animate = () => {
      const now = performance.now();

      const timeSinceMove = now - pointerRef.current.lastMoveTime;

      /*
       * Desktop:
       * moving = mouse moved recently.
       *
       * Touch:
       * moving = finger is currently down.
       */
      const isMoving =
        pointerRef.current.touching ||
        (pointerRef.current.lastMoveTime !== 0 && timeSinceMove < STOP_DELAY);

      // =====================================
      // EXPAND / CONTRACT
      // =====================================

      const targetSize = isMoving ? MAX_REVEAL_SIZE : 0;

      revealSizeRef.current +=
        (targetSize - revealSizeRef.current) * SIZE_SPEED;

      // =====================================
      // RETRACT
      // =====================================

      if (!isMoving && trailRef.current.length > 0) {
        trailRef.current.splice(
          0,
          Math.min(RETRACT_SPEED, trailRef.current.length),
        );
      }

      // =====================================
      // CLEAR
      // =====================================

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // =====================================
      // DRAW
      // =====================================

      if (
        revealImage.complete &&
        revealImage.naturalWidth > 0 &&
        trailRef.current.length > 0 &&
        revealSizeRef.current > 0.5
      ) {
        drawLiquidTrail(
          ctx,
          revealImage,
          trailRef.current,
          revealSizeRef.current,
          canvas,
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    if (revealImage.complete) {
      animate();
    } else {
      revealImage.onload = animate;
    }

    // =====================================
    // CLEANUP
    // =====================================

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      container.removeEventListener("pointerdown", handlePointerDown);

      container.removeEventListener("pointermove", handlePointerMove);

      container.removeEventListener("pointerup", handlePointerUp);

      container.removeEventListener("pointerleave", handlePointerLeave);

      container.removeEventListener("pointercancel", handlePointerCancel);

      cancelAnimationFrame(animationId);
    };
  }, [bottomImage]);

  return (
    <div ref={containerRef} className={styles.container}>
      <img src={topImage} className={styles.image} alt="" draggable={false} />

      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default LiquidReveal;

// ========================================
// DRAW LIQUID TRAIL
// ========================================

const drawLiquidTrail = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  points: TrailPoint[],
  radius: number,
  canvas: HTMLCanvasElement,
) => {
  if (points.length === 0) return;

  ctx.save();

  /*
   * Create one connected solid mask
   * from overlapping circles.
   */

  ctx.fillStyle = "white";

  for (const point of points) {
    ctx.beginPath();

    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

    ctx.fill();
  }

  /*
   * Only display the bottom image
   * inside our liquid mask.
   */

  ctx.globalCompositeOperation = "source-in";

  drawImageCover(ctx, image, canvas.width, canvas.height);

  ctx.restore();
};

// ========================================
// OBJECT-FIT: COVER FOR CANVAS
// ========================================

const drawImageCover = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;

  const canvasRatio = width / height;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;

    offsetX = (width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;

    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};
