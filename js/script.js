async function loadProducts() {
  try {
    const response = await fetch("natural_oils_sample.json");
    const products = await response.json();
    const container = document.getElementById("product-container");
    const searchBox = document.getElementById("search-box");

    function displayProducts(list) {
      container.innerHTML = "";
      if (list.length === 0) {
        container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h3 class="text-muted">لا توجد نتائج</h3>
                    </div>
                `;
        return;
      }

      list.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3 mb-4";
        col.innerHTML = `
                    <div class="card h-100 border-0 shadow-sm product-card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name_ar}">
                        <div class="card-body">
                            <h5 class="card-title text-success">${product.name_ar}</h5>
                            <p class="card-text text-muted small">${product.name_en}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-dark">${product.id}</span>
                                <span class="text-warning">${product.assay}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                            <button class="btn btn-sm btn-success w-100">إضافة إلى السلة</button>
                        </div>
                    </div>
                `;
        container.appendChild(col);
      });
    }

    if (searchBox) {
      searchBox.addEventListener("input", () => {
        const keyword = searchBox.value.trim().toLowerCase();
        const filtered = products.filter(
          (p) =>
            p.name_ar.toLowerCase().includes(keyword) ||
            p.name_en.toLowerCase().includes(keyword) ||
            p.id.toLowerCase().includes(keyword)
        );
        displayProducts(filtered);
      });
    }

    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    const container = document.getElementById("product-container");
    container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h3 class="text-danger">حدث خطأ في تحميل المنتجات</h3>
                <p class="text-muted">الرجاء المحاولة لاحقاً</p>
            </div>
        `;
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
