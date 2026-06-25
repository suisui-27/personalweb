import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeAccent() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.08, 0.16, 128, 16);
    const material = new THREE.MeshStandardMaterial({
      color: "#bd8c3a",
      metalness: 0.5,
      roughness: 0.34
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight("#fffdfa", 1.1));
    const keyLight = new THREE.PointLight("#ffffff", 2.6, 10);
    keyLight.position.set(3, 2, 4);
    scene.add(keyLight);

    let frame = 0;
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const render = () => {
      frame = window.requestAnimationFrame(render);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.006;
      renderer.render(scene, camera);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="three-accent" ref={mountRef} aria-hidden="true" />;
}
