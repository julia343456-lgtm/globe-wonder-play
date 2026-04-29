import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Point = { lat: number; lng: number; label: string };

const POINTS: Point[] = [
  { lat: 40.71, lng: -74.0, label: "New York" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 19.43, lng: -99.13, label: "México" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
  { lat: 25.2, lng: 55.27, label: "Dubai" },
  { lat: 52.52, lng: 13.4, label: "Berlin" },
  { lat: 28.61, lng: 77.21, label: "Delhi" },
];

const ARCS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [0, 5], [4, 7], [8, 9], [1, 7], [5, 6], [2, 4], [9, 3],
];

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const RADIUS = 2;

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return;

    // Detect mobile/low-power
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const dotCount = isSmall ? 1800 : 4500;
    const starCount = isSmall ? 500 : 1200;
    const dpr = isSmall ? 1 : Math.min(window.devicePixelRatio, 2);

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Core sphere
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 0.98, 64, 64),
        new THREE.MeshBasicMaterial({ color: new THREE.Color("#0a0e2a"), transparent: true, opacity: 0.85 }),
      ),
    );

    // Wireframe
    const wireGeo = new THREE.SphereGeometry(RADIUS, 36, 24);
    globeGroup.add(
      new THREE.LineSegments(
        new THREE.WireframeGeometry(wireGeo),
        new THREE.LineBasicMaterial({ color: "#22d3ee", transparent: true, opacity: 0.18 }),
      ),
    );

    // Dotted continents
    const dotsGeo = new THREE.BufferGeometry();
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const cyan = new THREE.Color("#67e8f9");
    const magenta = new THREE.Color("#f0abfc");
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = Math.atan2(z, x) * (180 / Math.PI);
      const n =
        Math.sin(lat * 0.12) * Math.cos(lng * 0.08) +
        Math.sin(lng * 0.05 + 1.3) * Math.cos(lat * 0.09 + 0.4) * 0.7;
      if (n > 0.15) {
        dotPositions.push(x * RADIUS * 1.005, y * RADIUS * 1.005, z * RADIUS * 1.005);
        const mix = (Math.sin(lat * 0.1 + lng * 0.05) + 1) / 2;
        const c = cyan.clone().lerp(magenta, mix * 0.5);
        dotColors.push(c.r, c.g, c.b);
      }
    }
    dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    dotsGeo.setAttribute("color", new THREE.Float32BufferAttribute(dotColors, 3));
    globeGroup.add(
      new THREE.Points(
        dotsGeo,
        new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.95, sizeAttenuation: true }),
      ),
    );

    // Atmosphere
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color("#22d3ee") } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(uColor, 1.0) * intensity;
        }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.18, 64, 64), atmoMat));

    // City points + halos
    const pointMeshes: THREE.Mesh[] = [];
    POINTS.forEach((p) => {
      const v = latLngToVec3(p.lat, p.lng, RADIUS * 1.01);
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), new THREE.MeshBasicMaterial({ color: "#f0abfc" }));
      mesh.position.copy(v);
      globeGroup.add(mesh);
      pointMeshes.push(mesh);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.09, 24),
        new THREE.MeshBasicMaterial({ color: "#22d3ee", side: THREE.DoubleSide, transparent: true, opacity: 0.6 }),
      );
      ring.position.copy(v);
      ring.lookAt(0, 0, 0);
      globeGroup.add(ring);
    });

    // Arcs + traveling pulses (kept in separate arrays — fixes the latent type bug)
    const pulses: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number }[] = [];
    ARCS.forEach(([a, b]) => {
      const start = latLngToVec3(POINTS[a].lat, POINTS[a].lng, RADIUS * 1.01);
      const end = latLngToVec3(POINTS[b].lat, POINTS[b].lng, RADIUS * 1.01);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(RADIUS + dist * 0.5);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(60);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const colors = new Float32Array(points.length * 3);
      for (let i = 0; i < points.length; i++) {
        const t = i / (points.length - 1);
        const c = cyan.clone().lerp(magenta, t);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      globeGroup.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 })));

      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshBasicMaterial({ color: "#ffffff" }));
      globeGroup.add(pulse);
      pulses.push({ mesh: pulse, curve, offset: Math.random() });
    });

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < starCount; i++) {
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: "#ffffff", size: 0.08, transparent: true, opacity: 0.7 }));
    scene.add(stars);

    // Interaction state
    const state = {
      rotX: 0.2,
      rotY: 0,
      velX: 0,
      velY: 0.0025,
      dragging: false,
      lastX: 0,
      lastY: 0,
      hoverLerp: 1,
    };

    const onDown = (e: PointerEvent) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      mount.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.velY = dx * 0.005;
      state.velX = dy * 0.005;
      state.rotY += state.velY;
      state.rotX += state.velX;
    };
    const onUp = () => {
      state.dragging = false;
      mount.style.cursor = "grab";
    };
    const onEnter = () => (state.hoverLerp = 0.3);
    const onLeave = () => {
      state.hoverLerp = 1;
      onUp();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") state.velY = -0.05;
      if (e.key === "ArrowRight") state.velY = 0.05;
      if (e.key === "ArrowUp") state.velX = -0.05;
      if (e.key === "ArrowDown") state.velX = 0.05;
    };

    mount.style.cursor = "grab";
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    mount.addEventListener("pointerenter", onEnter);
    mount.addEventListener("pointerleave", onLeave);
    mount.addEventListener("keydown", onKey);

    // IntersectionObserver — pause RAF when offscreen
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    let raf = 0;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      t += 0.016;
      if (!state.dragging) {
        state.velY = state.velY * 0.96 + 0.0025 * state.hoverLerp * 0.04;
        state.velX *= 0.92;
        state.rotY += state.velY;
        state.rotX += state.velX;
      }
      state.rotX = Math.max(-0.9, Math.min(0.9, state.rotX));
      globeGroup.rotation.y = state.rotY;
      globeGroup.rotation.x = state.rotX;

      pointMeshes.forEach((m, i) => m.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.2));

      pulses.forEach((p) => {
        const u = (p.offset + t * 0.15) % 1;
        p.mesh.position.copy(p.curve.getPoint(u));
      });

      stars.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      mount.removeEventListener("pointerenter", onEnter);
      mount.removeEventListener("pointerleave", onLeave);
      mount.removeEventListener("keydown", onKey);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  if (reduced) {
    // Static, accessible fallback — pure CSS, no WebGL
    return (
      <div
        role="img"
        aria-label="Stylised globe representing Neom Teckverse's global reach"
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative aspect-square w-[80%] rounded-full border border-primary/40 bg-card-gradient overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-8 rounded-full border border-primary/20" />
          <div className="absolute inset-16 rounded-full border border-accent/20" />
          <div className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-radial-glow)" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        tabIndex={0}
        role="application"
        aria-label="Interactive 3D globe — drag to rotate, arrow keys to spin"
        className="absolute inset-0 select-none touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
      />
      <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "var(--gradient-radial-glow)" }} />
    </div>
  );
}
