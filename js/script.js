import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// import { db } from "./firebase-connection.js"; // تأكد من مسار الاتصال بـ Firebase

// 1. firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDur0lP8dyY7Rmv40TS8BMtTe1DOdb44zw",
  authDomain: "chemajet-store-f872f.firebaseapp.com",
  projectId: "chemajet-store-f872f",
  storageBucket: "chemajet-store-f872f.appspot.com",
  messagingSenderId: "984454162444",
  appId: "1:984454162444:web:e5a49ca4a7c9bebeec2629",
  measurementId: "G-SYHPQFZFR3",
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Get Firestore
const db = getFirestore(app);

// 4. Load and display products
const container = document.getElementById("product-container");

async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot((doc) => {
    const product = doc.data();
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${
      product.name_ar
    }">
          <div class="card-body text-center">
            <h5 class="card-title">${product.name_ar}</h5>
            <p class="card-text">${product.name_en}</p>
            <p class="card-text">النسبة: ${product.assay}</p>
            <p class="card-text">الكود: ${doc.id}</p>
            <p class="card-text fw-bold text-success">السعر: ${
              product.price ?? "غير محدد"
            } جنيه</p>
          </div>
        </div>
      </div>
    `;
  });
}
loadProducts();

//=================
// import {
//   collection,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// import { db } from "./firebase-connection.js"; // تأكد من مسار الاتصال بـ Firebase

let products = [
  {
    sort: 1,
    productName: "Product 1",
    description: "test 2",
    img: "./img/logo",
  },
  {
    sort: 2,
    productName: "Product 2",
    description: "test 2",
    img: "./img/logo",
  },
];

async function addMultipleProducts(products) {
  if (!Array.isArray(products)) {
    console.error("❌ المدخلات يجب أن تكون مصفوفة من المنتجات");
    return;
  }

  for (const product of products) {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      console.log(
        `✅ تم إضافة المنتج "${product.name_ar}" بنجاح (ID: ${docRef.id})`
      );
    } catch (error) {
      console.error(`❌ خطأ أثناء إضافة المنتج "${product.name_ar}":`, error);
    }
  }
}
console.log("test");
addMultipleProducts(products);

// // this products.json
// // loadProducts();
// import { db } from "./firebase-connection.js";

// // 3. تحميل البيانات من ملف JSON محلي
// async function loadJSONData() {
//   const response = await fetch("./products.json"); // تأكد من أن الملف في نفس المسار
//   const data = await response.json();
//   return data;
// }

// // 4. رفع البيانات إلى Firebase
// async function uploadProductsToFirebase(productsData) {
//   for (let product of productsData) {
//     try {
//       await addDoc(collection(db, "products"), product);
//       console.log("تم رفع المنتج بنجاح:", product.name_ar);
//     } catch (e) {
//       console.error("خطأ في رفع المنتج:", product.name_ar, e);
//     }
//   }
// }

// // 5. دمج تحميل البيانات مع الرفع
// async function syncProductsWithFirebase() {
//   const products = await loadJSONData();
//   await uploadProductsToFirebase(products);
// }

// // 6. استدعاء الدالة لرفع البيانات
// syncProductsWithFirebase();
