// Three Js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

// Szene, Kamera und Renderer initialisieren
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

const arButton = ARButton.createButton(renderer, {
  requiredFeatures: ["hit-test"],
});

// Button in Container einfügen
document.getElementById("ar-button-container").appendChild(arButton);

// Warte 1 Frame, damit Three.js durch ist – dann Inhalt setzen
requestAnimationFrame(() => {
  arButton.innerHTML = `<i class="bi bi-camera me-2"></i> AR starten`;
  arButton.removeAttribute("style");
  arButton.classList.add("btn", "btn-dark", "m-3");
  arButton.id = "ARButton";
});

// Licht
scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 1));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(2, 4, 1);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// Modellvariablen
let mixer = null;
let flowerModel = null;
const clock = new THREE.Clock();
let modelPlaced = false; // merken ob Modell platziert ist

// Reticle (Zielkreis)
const reticleGeometry = new THREE.RingGeometry(0.1, 0.12, 32).rotateX(
  -Math.PI / 2
);
const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0xaec289 });
const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
reticle.visible = false;
scene.add(reticle);

// Modell laden (unsichtbar bis Fläche erkannt)
const loader = new GLTFLoader();
loader.load(
  "/assets/models/leberbluemchen.glb",
  function (gltf) {
    flowerModel = gltf.scene;
    flowerModel.scale.set(0.2, 0.2, 0.2); // Größe anpassen
    flowerModel.rotation.y = Math.PI; // Modell drehen
    flowerModel.visible = false; // erst sichtbar nach Platzierung
    scene.add(flowerModel);

    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(flowerModel);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }
  },
  undefined,
  function (error) {
    console.error("Fehler beim Laden des Modells:", error);
  }
);

// Hit-Test Setup
let hitTestSource = null;
let hitTestSourceRequested = false;

// Animations- und Render-Schleife
function animate() {
  renderer.setAnimationLoop((timestamp, frame) => {
    const delta = clock.getDelta(); // vergangene Zeit seit letztem Frame
    if (mixer) mixer.update(delta); // Animation fortsetzen

    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      const session = renderer.xr.getSession();

      // Hit-Test Quelle finden
      if (!hitTestSourceRequested) {
        session.requestReferenceSpace("viewer").then((refSpace) => {
          session.requestHitTestSource({ space: refSpace }).then((source) => {
            hitTestSource = source;
          });
        });

        // Wenn AR-Session endet, alles zurücksetzen
        session.addEventListener("end", () => {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      // Wenn Fläche erkannt wurde und das Modell noch nicht platziert ist
      if (hitTestSource && !modelPlaced) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);
        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          const pose = hit.getPose(referenceSpace);

          // Reticle anzeigen an der gefundenen Position
          reticle.visible = true;
          reticle.position.set(
            pose.transform.position.x,
            pose.transform.position.y,
            pose.transform.position.z
          );

          // Wenn der User tippt, platziere das Modell
          renderer.domElement.addEventListener(
            "click",
            () => {
              if (!modelPlaced) {
                flowerModel.visible = true;
                flowerModel.position.copy(reticle.position);
                modelPlaced = true;
                reticle.visible = false;

                // Hit-Test deaktivieren
                if (hitTestSource) {
                  hitTestSource.cancel();
                  hitTestSource = null;
                }
              }
            },
            { once: true }
          ); // Nur einmal klicken
        } else {
          reticle.visible = false; // Keine Fläche erkannt
        }
      }
    }

    renderer.render(scene, camera);
  });
}

animate();
