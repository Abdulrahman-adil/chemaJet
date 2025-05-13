// import {
//   collection,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// import { db } from "./firebase-connection.js"; // تأكد من مسار الاتصال بـ Firebase

// let products = [
//   {
//     sort: 1,
//     productName: "Product 1",
//     description: "test 2",
//     img: "./img/logo",
//   },
//   {
//     sort: 2,
//     productName: "Product 2",
//     description: "test 2",
//     img: "./img/logo",
//   },
// ];

// async function addMultipleProducts(products) {
//   if (!Array.isArray(products)) {
//     console.error("❌ المدخلات يجب أن تكون مصفوفة من المنتجات");
//     return;
//   }

//   for (const product of products) {
//     try {
//       const docRef = await addDoc(collection(db, "products"), product);
//       console.log(
//         `✅ تم إضافة المنتج "${product.name_ar}" بنجاح (ID: ${docRef.id})`
//       );
//     } catch (error) {
//       console.error(`❌ خطأ أثناء إضافة المنتج "${product.name_ar}":`, error);
//     }
//   }
// }
// console.log("test");
// addMultipleProducts(products);
