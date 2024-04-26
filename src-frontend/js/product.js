import { executeQuery, sqlQuery } from "./database.js";
let db;
let category;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let dbData = await executeQuery(`
            SELECT * FROM products
        `);
        let dbCategories = await executeQuery(`
            SELECT * FROM category      
        `)

        db = dbData;
        category = dbCategories;
        /*Displaying products in page*/
        db.forEach(element => {
            addRowToTable(element.id, element.quantity, element.name, element.price, element.category)
        });
        /*Display categories in select elements*/
        let categories = document.getElementsByClassName("category");
        for (let i = 0; i < categories.length; i++){
            category.forEach(element => {
                let option = document.createElement("option");
                option.textContent = element.name;
                categories[i].appendChild(option);
            });
        }
    }
    catch (err){ 
        console.error(err) 
    };
})



const dialogForm = document.getElementById("dialogForm");

const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");
const modifyBtn = document.getElementById("modify");


function addRowToTable(id, quantity, name, price, category) {
    let tableBody = document.getElementById("tablebody");
    let row = tableBody.insertRow(); // Append a new row at the end

    // Create and append data cells
    let cellId = row.insertCell();
    let cellQuantity = row.insertCell();
    let cellName = row.insertCell();
    let cellPrice = row.insertCell();
    let cellCategory = row.insertCell();
    let cellActions = row.insertCell(); // Cell for action buttons

    // Assign data to cells
    cellId.innerText = id;
    cellQuantity.innerText = quantity;
    cellName.innerText = name;
    cellPrice.innerText = `${price} $`;
    cellCategory.innerText = category;

    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.className = "action-btn edit";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = function() {
        // Add function to handle edit action
        console.log('Edit action for ID:', id);
    };

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete";
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = function() {
        // Add function to handle delete action
        console.log('Delete action for ID:', id);
    };

    // Append buttons to the actions cell
    cellActions.appendChild(editBtn);
    cellActions.appendChild(deleteBtn);

    // Optional: Apply styles directly if needed (alternative to class-based CSS)
    cellActions.style.textAlign = 'center'; // Center align buttons if CSS class does not exist
}


dialogForm.addEventListener("submit", () => {
    const inputAddProduct = document.querySelectorAll(".custom-inputbox input, .custom-inputbox select");
    
    try {
        sqlQuery(`
        INSERT INTO products (name, price, category) 
        VALUES ('${inputAddProduct[0].value}', ${inputAddProduct[1].value}, '${inputAddProduct[2].value}');`);
        location.reload(false);
    }
    catch (err){ 
        console.error(err); 
    }

})