async function loadProducts() {
  const response = await fetch("data.json");
  const products = await response.json();

  const container = document.getElementById("product-container");
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                    <h3>${product.name_ar}</h3>
                    <p><strong>الاسم :</strong> ${product.name_en}</p>
                    <p><strong>النسبة:</strong> ${product.assay}</p>
                    <p><strong>الكود:</strong> ${product.id}</p>
                `;
    container.appendChild(card);
  });
}

loadProducts();
