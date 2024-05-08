import { fetchQuery } from "./modules/database.js";

let productDB;

const productID = document.getElementById('productID');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');




document.addEventListener("DOMContentLoaded", async () => {
    productDB = await fetchQuery(`SELECT * FROM products;`);
})

productID.addEventListener("input", () => {
    let productFound = productDB.find(product => product.id == parseInt(productID.value, 10));
    if (productFound){
        productName.value = productFound.name;
        productPrice.value = productFound.price.toString();
    }
    else {
        productName.value = `ID: ${productID.value} no existe`;
        productPrice.value = '';
    }
})