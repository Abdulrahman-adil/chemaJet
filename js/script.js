import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDur0lP8dyY7Rmv40TS8BMtTe1DOdb44zw",
  authDomain: "chemajet-store-f872f.firebaseapp.com",
  projectId: "chemajet-store-f872f",
  storageBucket: "chemajet-store-f872f.appspot.com",
  messagingSenderId: "984454162444",
  appId: "1:984454162444:web:e5a49ca4a7c9bebeec2629",
  measurementId: "G-SYHPQFZFR3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    sort: 1,
    productName: "Almond",
    description: "منتج لوز ممتاز",
    img: "./img/almond-mor.jpg",
  },
  {
    sort: 2,
    productName: "Rose Oil",
    description: "زيت الورد الطبيعي",
    img: "./img/rose-oil.jpg",
  },
  {
    sort: 3,
    productName: "Argan-Oil",
    description: "زيت الارجان الطبيعي",
    img: "./img/argan.jpg",
  },
  {
    sort: 4,
    productName: "Mint Oil",
    description: "زيت نعناع",
    img: "./img/-ment.jpg",
  },
  {
    sort: 5,
    productName: "stronela Oil",
    description: "زيت السترونيلا",
    img: "./img/stronela-oil.jpg",
  },
  {
    sort: 6,
    productName: "ward Oil",
    description: "مياه الورد الطبيعيه",
    img: "./img/ward.jpeg",
  },
];

// دالة الإضافة
async function addNewProductsOnly(products) {
  const existingProducts = await getDocs(collection(db, "products"));
  const existingNames = [];

  existingProducts.forEach((doc) => {
    const data = doc.data();
    if (data.productName) {
      existingNames.push(data.productName.toLowerCase().trim());
    }
  });

  for (const product of products) {
    const nameKey = product.productName.toLowerCase().trim();
    if (!existingNames.includes(nameKey)) {
      try {
        await addDoc(collection(db, "products"), product);
        console.log(`✅ أُضيف المنتج: ${product.productName}`);
      } catch (error) {
        console.error(`❌ خطأ في الإضافة: ${product.productName}`, error);
      }
    } else {
      console.log(`⚠️ المنتج موجود مسبقًا: ${product.productName}`);
    }
  }
}

// عرض المنتجات
let allProducts = [];
async function displayProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));
  allProducts = [];
  snapshot.forEach((doc) => {
    const product = doc.data();
    product.id = doc.id;
    allProducts.push(product);
  });

  renderProjects(allProducts);
}

// display products
function renderProjects(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  products.forEach((product) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.productName}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">${product.description}</p>
            <p class="product-price">0 جنيه</p>
            <p class="card-text text-muted">ID: ${product.id}</p>
            <a href="https://wa.me/201234567890" target="_blank" class="order-btn">اطلب الآن</a>
          </div>
        </div>
      </div>
    `;
  });
}

// search
let search = document.getElementById("search-box");
search.addEventListener("input", function () {
  let searchValue = this.value.toLowerCase();
  let productsFiltered = allProducts.filter((product) => {
    return (
      product.productName.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
  });
  renderProjects(productsFiltered);
});

// display products on load
window.addEventListener("DOMContentLoaded", () => {
  //Add button for test
  let AddProducts = document.getElementById("add-product");
  AddProducts.addEventListener("click", async () => {
    await addNewProductsOnly(products);
    await displayProducts();
  });
  displayProducts();
});
