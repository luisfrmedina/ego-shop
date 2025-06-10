document.addEventListener("DOMContentLoaded", function () {
  // CICLO FOREACH PARA MOSTRAR PRODUCTOS
  const productContainer = document.getElementById("productos");

  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      // Por cada producto creamos dinámicamente una card
      data.products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "w-full sm:w-1/2 lg:w-1/4 px-4 mb-8 product-item";
        card.setAttribute("data-category", product.category);

        // Renderizamos los indicadores de colores usando las clases de Tailwind
        let colorsHtml = "";
        if (product.colors && product.colors.length > 0) {
          if (product.colors.length === 1) {
            colorsHtml = `<div class="w-6 h-6 rounded-full ${product.colors[0]}"></div>`;
          } else if (product.colors.length === 2) {
            colorsHtml = `
              <div class="w-6 h-6 rounded-full overflow-hidden">
                <div class="flex w-full h-full">
                  <div class="w-1/2 ${product.colors[0]}"></div>
                  <div class="w-1/2 ${product.colors[1]}"></div>
                </div>
              </div>
            `;
          }
          // Puedes ampliar la lógica si es necesario para mas colores.
        }

        card.innerHTML = `
          <div class="bg-gray-300 p-4 text-center">
            <div class="h-48 flex justify-center items-center">
              <img
                src="${product.img}"
                alt="${product.title}"
                class="mx-auto mb-2 max-w-full h-full object-contain"
              />
            </div>
            <p class="mt-2 font-medium">${product.title}</p>
            <p class="text-lg font-semibold mt-1">REF ${product.price}</p>
            <div class="flex items-center justify-center mt-2 space-x-2">
              <span class="text-sm font-medium">Color:</span>
              ${colorsHtml}
            </div>
          </div>
        `;
        productContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error cargando los productos:", error));

  // DESTACA CATEGORÍA ELEGIDA
  const categoriaBtns = document.querySelectorAll(".categoria-btn");

  categoriaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Obtener la lista actualizada de productos cada vez que se filtra
      const productItems = document.querySelectorAll(".product-item");

      // Quita el resaltado de todos los botones y restaura el color original
      categoriaBtns.forEach((b) => {
        b.classList.remove("bg-[#0E1C4F]", "font-bold");
        b.classList.add("bg-[#03396c]");
      });

      // Resalta el botón clickeado
      btn.classList.remove("bg-[#03396c]");
      btn.classList.add("bg-[#0E1C4F]", "font-bold");

      const category = btn.getAttribute("data-category");

      productItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
