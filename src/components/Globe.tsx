import { useEffect, useRef } from "react";
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

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const RADIUS = 2;

    // Inner glowing core sphere
    const coreGeo = new THREE.SphereGeometry(RADIUS * 0.98, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0a0e2a"),
      transparent: true,
      opacity: 0.85,
    });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // Wireframe latitude/longitude
    const wireGeo = new THREE.SphereGeometry(RADIUS, 36, 24);
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 0.18,
    });
    globeGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(wireGeo), wireMat));

    // Dotted continent surface (procedural fibonacci sphere distribution + lat/lng-based mask)
    const dotsGeo = new THREE.BufferGeometry();
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const N = 4500;
    const cyan = new THREE.Color("#67e8f9");
    const magenta = new THREE.Color("#f0abfc");
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      // Pseudo-continent mask via noisy bands
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
    const dotsMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    globeGroup.add(new THREE.Points(dotsGeo, dotsMat));

    // Atmosphere glow (back-side shader-ish via additive sphere)
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.18, 64, 64);
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
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // City points
    const pointMeshes: THREE.Mesh[] = [];
    POINTS.forEach((p) => {
      const v = latLngToVec3(p.lat, p.lng, RADIUS * 1.01);
      const geo = new THREE.SphereGeometry(0.04, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: "#f0abfc" });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(v);
      globeGroup.add(mesh);
      pointMeshes.push(mesh);

      // halo ring
      const ringGeo = new THREE.RingGeometry(0.06, 0.09, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: "#22d3ee",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(v);
      ring.lookAt(0, 0, 0);
      globeGroup.add(ring);
    });

    // Arcs
    const arcLines: { line: THREE.Line; total: number; offset: number }[] = [];
    ARCS.forEach(([a, b], idx) => {
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
      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      });
      const line = new THREE.Line(geo, mat);
      globeGroup.add(line);
      arcLines.push({ line, total: points.length, offset: idx * 0.3 });

      // traveling pulse
      const pulseGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      (pulse as any).userData = { curve, offset: Math.random() };
      globeGroup.add(pulse);
      arcLines.push({ line: pulse as unknown as THREE.Line, total: 0, offset: 0 });
    });

    // Star field background
    const starsGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 1200; i++) {
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }
    starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starsGeo,
      new THREE.PointsMaterial({ color: "#ffffff", size: 0.08, transparent: true, opacity: 0.7 }),
    );
    scene.add(stars);

    // Interaction: drag to rotate, auto-spin, momentum
    const state = {
      rotX: 0.2,
      rotY: 0,
      velX: 0,
      velY: 0.0025,
      dragging: false,
      lastX: 0,
      lastY: 0,
      hoverLerp: 1, // slowdown factor
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

    mount.style.cursor = "grab";
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    mount.addEventListener("pointerenter", onEnter);
    mount.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      // momentum decay
      if (!state.dragging) {
        state.velY = state.velY * 0.96 + 0.0025 * state.hoverLerp * 0.04;
        state.velX *= 0.92;
        state.rotY += state.velY;
        state.rotX += state.velX;
      }
      // clamp tilt
      state.rotX = Math.max(-0.9, Math.min(0.9, state.rotX));
      globeGroup.rotation.y = state.rotY;
      globeGroup.rotation.x = state.rotX;

      // pulse city halos
      pointMeshes.forEach((m, i) => {
        const s = 1 + Math.sin(t * 2 + i) * 0.2;
        m.scale.setScalar(s);
      });

      // animate traveling arc pulses
      globeGroup.children.forEach((c) => {
        if ((c as any).userData?.curve) {
          const u = (((c as any).userData.offset + t * 0.15) % 1);
          const p = (c as any).userData.curve.getPoint(u);
          c.position.copy(p);
        }
      });

      stars.rotation.y += 0.0003;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      mount.removeEventListener("pointerenter", onEnter);
      mount.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="absolute inset-0 select-none touch-none" />
      <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "var(--gradient-radial-glow)" }} />
    </div>
  );
}
