import { executeQuery, sqlQuery } from "./database.js";

const submitbtn = document.getElementById("addsale");
const addproductbtn = document.getElementById("addproduct");

let allProducts = {

}

async function productName(productID){
    let result = await executeQuery(`SELECT name FROM products WHERE id = ${productID}`)
    console.log(result);
    return result;
}

function addRowToTable(quantity, cost, productID) {
    let tableBody = document.getElementById("tablebody");
    let row = tableBody.insertRow(); // Append a new row at the end

    let cell1 = row.insertCell(); // Append a new cell for quantity
    let cell2 = row.insertCell(); // Append a new cell for name
    let cell3 = row.insertCell(); // Append a new cell for cost
    let cell4 = row.insertCell(); // Append a new cell for subtotal

    allProducts[productID] = quantity;

    cell1.innerText = allProducts[productID];
    cell2.innerText = productID;
    cell3.innerText = `$${cost}`;
    cell4.innerText = `$${allProducts[productID] * cost}`;
}

addproductbtn.addEventListener("click", () => {
    const date = document.getElementById("datePicker").value;
    const dolar = document.getElementById("dolar").value;
    const productID = document.getElementById("productid").value;
    const quantity =  document.getElementById("quantity").value;

    addRowToTable(quantity, dolar, productID);

    sqlQuery(`INSERT INTO products (name) VALUES ("messi")`);


    
})

