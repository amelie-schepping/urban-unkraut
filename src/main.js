// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Styles
import "./style.scss";

// Pop-up "neue Pflanze freigeschaltet"
window.addEventListener("DOMContentLoaded", () => {
  const popupFlag = localStorage.getItem("showUnlockPopup");

  if (popupFlag === "true") {
    const popup = document.querySelector("#unlock-popup");
    if (popup) {
      popup.classList.remove("d-none");
      setTimeout(() => {
        popup.classList.add("d-none");
        localStorage.removeItem("showUnlockPopup"); 
      }, 4000); 
    }
  }
});

// Pflanzen dynamisch laden
fetch("/urban-unkraut/assets/plants.json")
  .then((res) => res.json())
  .then((plants) => {
    const container = document.querySelector(".carousel-inner");
    container.innerHTML = "";

    const unlockedPlants = JSON.parse(
      localStorage.getItem("unlockedPlants") || "[]"
    );

    const chunkSize = 3;
    for (let i = 0; i < plants.length; i += chunkSize) {
      const group = plants.slice(i, i + chunkSize);
      const slide = document.createElement("div");
      slide.classList.add("carousel-item");
      if (i === 0) slide.classList.add("active");

      const row = document.createElement("div");
      row.classList.add("row");

      group.forEach((plant) => {
        const col = document.createElement("div");
        col.classList.add("col-4");

        const img = document.createElement("img");

        // Prüfen ob unlocked
        const isUnlocked = unlockedPlants.includes(plant.id);

        img.src = isUnlocked
          ? plant.image
          : "/urban-unkraut/assets/images/locked_icon.png";
        img.classList.add("d-block", "w-100");
        img.alt = plant.name;

        // Nur klickbar, wenn unlocked
        if (isUnlocked) {
          img.addEventListener("click", () => {
            window.location.href = `/urban-unkraut/page1.html?${plant.id}`;
          });
        }

        col.appendChild(img);
        row.appendChild(col);
      });

      slide.appendChild(row);
      container.appendChild(slide);
    }
  })
  .catch((err) => console.error("Fehler beim Laden der Galerie:", err));
