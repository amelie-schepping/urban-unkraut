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

        if (isUnlocked) {
          img.addEventListener("click", () => {
            showPlantModal(plant);
          });
          img.style.cursor = "pointer";
        } else {
          img.style.cursor = "not-allowed";
          img.addEventListener("click", () => {
            const lockedModal = new bootstrap.Modal(
              document.getElementById("lockedPlantModal")
            );
            lockedModal.show();
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

function showPlantModal(plant) {
  const modalTitle = document.getElementById("plantModalLabel");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalLink = document.getElementById("modalLink");

  modalTitle.textContent = plant.name;
  modalImage.src = plant.image;
  modalImage.alt = plant.name;
  modalDescription.textContent =
    plant.description || "Beschreibung folgt bald.";
  modalLink.href = `/urban-unkraut/page1.html?${plant.id}`;

  const modal = new bootstrap.Modal(document.getElementById("plantModal"));
  modal.show();
}

// Pflanzen für Library (libary.html) anzeigen
document.addEventListener("DOMContentLoaded", () => {
  const unlocked = JSON.parse(localStorage.getItem("unlockedPlants") || "[]");
  const libraryContainer = document.getElementById("library");

  fetch("/urban-unkraut/assets/plants.json")
    .then((res) => res.json())
    .then((plants) => {
      plants.forEach((plant) => {
        const isUnlocked = unlocked.includes(plant.id);

        const col = document.createElement("div");
        col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

        const card = document.createElement("div");
        card.className = "card shadow-sm";
        card.id = plant.id;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body text-center";
        cardBody.style.minHeight = "260px";

        const title = document.createElement("h5");
        title.className = "card-title mt-2";
        title.textContent = isUnlocked ? plant.name : "";

        const img = document.createElement("img");
        img.className = "img-fluid w-100";
        img.src = isUnlocked
          ? plant.image
          : "/urban-unkraut/assets/images/locked_icon.png";
        img.alt = isUnlocked ? plant.name : "Gesperrt";

        if (isUnlocked) {
          card.addEventListener("click", () => showPlantModal(plant));
          card.style.cursor = "pointer";
        } else {
          card.style.cursor = "not-allowed";
          card.addEventListener("click", () => {
            const lockedModal = new bootstrap.Modal(
              document.getElementById("lockedModal")
            );
            lockedModal.show();
          });
        }

        cardBody.appendChild(title);
        cardBody.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        libraryContainer.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Pflanzen:", err);
    });
});
