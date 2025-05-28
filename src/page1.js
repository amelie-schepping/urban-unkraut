const THREE = AFRAME.THREE;

// Hilfsfunktion zum Auslesen des Query-Parameters
function getPlantIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return [...params.keys()][0]; // z. B. "blume1"
}

AFRAME.registerComponent("gltf-with-animation", {
  init: function () {
    const el = this.el;
    const loader = new THREE.GLTFLoader();
    const plantId = getPlantIdFromQuery();

    // Pflanze freischalten
    const unlocked = JSON.parse(localStorage.getItem("unlockedPlants") || "[]");
    if (!unlocked.includes(plantId)) {
      unlocked.push(plantId);
      localStorage.setItem("unlockedPlants", JSON.stringify(unlocked));
      localStorage.setItem("showUnlockPopup", "true");
    }

    // Pflanzendaten aus JSON laden
    fetch("/urban-unkraut/assets/plants.json")
      .then((res) => res.json())
      .then((plants) => {
        const plant = plants.find((p) => p.id === plantId);
        if (!plant) {
          console.warn("Pflanze nicht gefunden:", plantId);
          return;
        }

        // Dynamisch das zugehörige Modell laden
        loader.load(
          plant.model,
          (gltf) => {
            el.setObject3D("mesh", gltf.scene);

            if (gltf.animations && gltf.animations.length > 0) {
              this.mixer = new THREE.AnimationMixer(gltf.scene);
              gltf.animations.forEach((clip) => {
                this.mixer.clipAction(clip).play();
              });
            }

            // Titel anzeigen
            const nameText = document.createElement("a-text");
            nameText.setAttribute("value", plant.name);
            nameText.setAttribute("position", "0.8 0.8 0");
            nameText.setAttribute("color", "#59772f");
            nameText.setAttribute("width", 2);
            nameText.setAttribute("align", "center");
            el.appendChild(nameText);

            // Beschreibung anzeigen
            const descText = document.createElement("a-text");
            descText.setAttribute("value", plant.description);
            descText.setAttribute("position", "0.8 0.6 0");
            descText.setAttribute("color", "#FFFFFF");
            descText.setAttribute("width", 1);
            descText.setAttribute("align", "center");
            descText.setAttribute("baseline", "center");
            el.appendChild(descText);

            // Bild anzeigen
            const image = document.createElement("a-image");
            image.setAttribute("src", plant.image);
            image.setAttribute("position", "0.8 -0.4 0");
            image.setAttribute("width", 1.2);
            image.setAttribute("height", 1.2);
            el.appendChild(image);
          },
          undefined,
          (error) => {
            console.error("Fehler beim Laden des GLB-Modells:", error);
          }
        );
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Pflanzeninfos:", err);
      });
  },

  tick: function (time, deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime / 1000);
    }
  },
});
