const THREE = AFRAME.THREE; // Nutze die gleiche THREE-Version wie A-Frame

// eigene A-Frame-Komponente zur Modellplatzierung und Animation
AFRAME.registerComponent("gltf-with-animation", {
  init: function () {
    const el = this.el; // Referenz auf das <a-entity>, das diese Komponente verwendet
    const loader = new THREE.GLTFLoader(); // Loader für GLB-/GLTF-Dateien

    // Modell laden
    loader.load(
      "/urban-unkraut/assets/models/plant_outdoors.glb",
      (gltf) => {
        // geladenes Modell als visuelles Objekt des <a-entity>
        el.setObject3D("mesh", gltf.scene);

        // Animation mit AnimationMixer starten
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error) => {
        console.error("Fehler beim Laden des GLB-Modells:", error);
      }
    );

    // Text-Entity direkt neben dem Modell
    // const text = document.createElement("a-text");
    // text.setAttribute("value", "Das Leberbluemchen"); // Textinhalt
    // text.setAttribute("position", "0.8 0.8 0"); // X=0.5 → rechts, Y=0.3 → Höhe
    // text.setAttribute("color", "#FFFFF"); // Textfarbe
    // text.setAttribute("width", 2); // Skalierung der Schriftgröße
    // text.setAttribute("align", "center"); // Zentrierter Text

    // el.appendChild(text);

    // const text2 = document.createElement("a-text");
    // text2.setAttribute(
    //   "value",
    //   "Das Leberblümchen übersteht den Winter mit Überdauerungsknospen, die sich unmittelbar an der Erdoberfläche in den Blattachseln und im Schutz der überdauernden Blätter befinden und gehört deshalb zu den wintergrünen Hemikryptophyten. "
    // );
    // text2.setAttribute("position", "0.8 0.6 0"); // leicht davor
    // text2.setAttribute("color", "#FFFFFF");
    // text2.setAttribute("width", 1);
    // text2.setAttribute("align", "center");
    // text2.setAttribute("baseline", "center");
    // el.appendChild(text2);
  },

  tick: function (time, deltaTime) {
    // Pro Frame: falls ein AnimationMixer aktiv ist, aktualisiere ihn mit Zeitdifferenz
    if (this.mixer) {
      this.mixer.update(deltaTime / 1000); // deltaTime ist in Millisekunden, deshalb /1000
    }
  },
});
