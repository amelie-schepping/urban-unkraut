// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Styles
import "./style.scss";

// src/main.js

fetch("/urban-unkraut/assets/plants.json")
  .then((res) => res.json())
  .then((plants) => {
    const container = document.querySelector(".carousel-inner");
    container.innerHTML = ""; // Leeren

    // Gruppiere Pflanzen in Dreiergruppen für Slides
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
        img.src = plant.image;
        img.classList.add("d-block", "w-100");
        img.alt = plant.name;

        // Optional: klickbare Bilder verlinken auf AR-Ansicht
        img.addEventListener("click", () => {
          window.location.href = `/urban-unkraut/page1.html?${plant.id}`;
        });

        col.appendChild(img);
        row.appendChild(col);
      });

      slide.appendChild(row);
      container.appendChild(slide);
    }
  })
  .catch((err) => console.error("Fehler beim Laden der Galerie:", err));
