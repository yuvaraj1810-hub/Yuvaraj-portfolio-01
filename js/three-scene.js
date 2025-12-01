// Basic Three.js hero scene: floating shapes with gentle rotation and parallax

let heroScene;
let heroCamera;
let heroRenderer;
let heroGroup;
let heroAnimationId;

initHeroScene();

function initHeroScene() {
  const canvas = document.getElementById("heroCanvas");
  const wrapper = document.getElementById("heroCanvasWrapper");
  if (!canvas || !wrapper || typeof THREE === "undefined") return;

  heroScene = new THREE.Scene();
  heroScene.fog = new THREE.FogExp2(0x020617, 0.08);

  heroCamera = new THREE.PerspectiveCamera(
    45,
    wrapper.clientWidth / wrapper.clientHeight,
    0.1,
    100
  );
  heroCamera.position.set(0, 0.8, 4);

  heroRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  heroRenderer.setSize(wrapper.clientWidth, wrapper.clientHeight);

  const ambient = new THREE.AmbientLight(0x84ccff, 0.7);
  heroScene.add(ambient);

  const dirLight = new THREE.SpotLight(0x38bdf8, 1.4, 12, Math.PI / 5, 0.7, 1);
  dirLight.position.set(3, 5, 3);
  heroScene.add(dirLight);

  heroGroup = new THREE.Group();
  heroScene.add(heroGroup);

  const tealMat = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    metalness: 0.7,
    roughness: 0.25,
  });
  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.6,
    roughness: 0.3,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    metalness: 0.7,
    roughness: 0.35,
  });

  const torus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.25, 160, 32),
    tealMat
  );
  heroGroup.add(torus);

  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), purpleMat);
  cube.position.set(-1.8, -0.6, -0.4);
  heroGroup.add(cube);

  const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), pinkMat);
  icosa.position.set(1.7, 0.4, 0.2);
  heroGroup.add(icosa);

  const ringGeo = new THREE.RingGeometry(1.5, 1.9, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    side: THREE.DoubleSide,
    opacity: 0.16,
    transparent: true,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.7;
  heroGroup.add(ring);

  // Small floating particles
  const particleGeo = new THREE.SphereGeometry(0.03, 8, 8);
  const particleMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
  for (let i = 0; i < 45; i++) {
    const p = new THREE.Mesh(particleGeo, particleMat);
    p.position.set(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 6
    );
    heroGroup.add(p);
  }

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseX = x * 0.3;
    mouseY = y * 0.25;
  });

  window.addEventListener("resize", () => {
    if (!heroRenderer) return;
    heroCamera.aspect = wrapper.clientWidth / wrapper.clientHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    heroAnimationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    heroGroup.rotation.y = t * 0.16;
    heroGroup.rotation.x = Math.sin(t * 0.15) * 0.12;

    heroCamera.position.x += (mouseX - heroCamera.position.x) * 0.06;
    heroCamera.position.y += (mouseY - heroCamera.position.y) * 0.06;
    heroCamera.lookAt(heroScene.position);

    heroRenderer.render(heroScene, heroCamera);
  }

  animate();
}


