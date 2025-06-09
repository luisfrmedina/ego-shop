document.addEventListener("DOMContentLoaded", function () {
  const categoriaBtns = document.querySelectorAll(".categoria-btn");
  const productItems = document.querySelectorAll(".product-item");

  categoriaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
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
