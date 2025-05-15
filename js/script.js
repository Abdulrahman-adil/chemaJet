import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 1. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDur0lP8dyY7Rmv40TS8BMtTe1DOdb44zw",
  authDomain: "chemajet-store-f872f.firebaseapp.com",
  projectId: "chemajet-store-f872f",
  storageBucket: "chemajet-store-f872f.appspot.com",
  messagingSenderId: "984454162444",
  appId: "1:984454162444:web:e5a49ca4a7c9bebeec2629",
  measurementId: "G-SYHPQFZFR3",
};

// 2. Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. المنتجات
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
    sort: 5,
    productName: "ward Oil",
    description: "مياه الورد الطبيعيه",
    img: "./img/ward.jpeg",
  },
];

// 4. دالة لإضافة المنتجات الجديدة فقط
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
        await addDoc(collection(db, "products"), product); // لازم await هنا
        console.log(`✅ أُضيف المنتج الجديد: ${product.productName}`);
      } catch (error) {
        console.error(`❌ خطأ عند إضافة المنتج: ${product.productName}`, error);
      }
    } else {
      console.log(`⚠️ المنتج موجود بالفعل: ${product.productName}`);
    }
  }
}

// 5. دالة عرض المنتجات
async function displayProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // تنظف الأول

  const snapshot = await getDocs(collection(db, "products"));
  snapshot.forEach((doc) => {
    const product = doc.data();
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.productName}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">${product.description}</p>
                        <p class="product-price">0 جنيه</p>

            <p class="card-text text-muted">ID: ${doc.id}</p>
            <a href="https://wa.me/201234567890" target="_blank" class="order-btn">اطلب الآن</a>

          </div>
        </div>
      </div>
    `;
  });
}
// add products
let AddProducts = document.getElementById("add-product");
AddProducts.addEventListener("click", async () => {
  await addNewProductsOnly(products);
  await displayProducts();
});
window.onload = displayProducts();

// 6. تنفيذ العمليات بعد تحميل الصفحة
// window.addEventListener("DOMContentLoaded", async () => {
//   await addNewProductsOnly(products);
//   await displayProducts();
// });
