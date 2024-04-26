import { executeUpdate, fetchQuery } from "./modules/database.js";
import { findNameByID, findIdByName } from "./modules/find.js";

let productsDB;
let categoryDB;
// LOAD THE PAGE
document.addEventListener("DOMContentLoaded", async () => {
    try {
        let dbProducts = await fetchQuery(`
            SELECT * FROM products
        `);
        let dbCategories = await fetchQuery(`
            SELECT * FROM category      
        `)

        productsDB = dbProducts;
        categoryDB = dbCategories;

        /*Displaying products in page*/
        productsDB.forEach(element => {
            addRowToTable(element.id, element.quantity, element.name, element.price, element.category)
        });
        /*Display categories in select elements*/
        let categories = document.getElementsByClassName("category");
        for (let i = 0; i < categories.length; i++){
            categoryDB.forEach(category => {
                let option = document.createElement("option");
                option.textContent = category.name;
                categories[i].appendChild(option);
            });
        }
    }
    catch (err){ 
        console.error(err) 
    };
})

// TABLE

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
    row.id = `row${id}`;

    // Assign data to cells
    cellId.innerText = id;
    cellQuantity.innerText = quantity;
    cellName.innerText = name;
    cellPrice.innerText = `${price} $`;
    cellCategory.innerText = category;

    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.id = "editRowBtn";
    editBtn.className = "action-btn edit";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = function() {
        const dialog = document.getElementById("editProduct");
        dialog.showModal();
        document.getElementById("editMessage").innerHTML = `Editando <span style="color: red;">${name}</span>`
        const input = document.querySelectorAll(".edit-input");
        input[0].value = `${id}`
        input[1].value = `${name}`
        input[2].value = `${price}`
        input[3].value = `${findNameByID(categoryDB, category)}`

        const editProductForm = document.getElementById("editProductForm");
        editProductForm.addEventListener("submit", (event) => {
            event.preventDefault();
            executeUpdate(`
            UPDATE products
            SET name = '${input[1].value}', price = ${input[2].value}, category = ${findIdByName(categoryDB, input[3].value)}
            WHERE id = ${id};`);
            
            const elementToActualize = document.getElementById(`row${id}`);
            if (elementToActualize) {
                let column = elementToActualize.children;
                column[2].textContent = input[1].value;
                column[3].textContent = input[2].value;
                column[4].textContent = input[3].value;
                console.log(column)
            }
            dialog.close();
        })
    };

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteRowBtn";
    deleteBtn.className = "action-btn delete";
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = function() {
        // Add function to handle delete action
        const dialog = document.getElementById("areyousure")
        dialog.showModal();
        document.getElementById("removeMessage").innerHTML = `Quieres eliminar <span style="color: red;">${name}</span>?`
        console.log('Delete action for ID:', id);

        const remove = document.getElementById("removeProduct");

        remove.addEventListener("click", () => {
            executeUpdate(`DELETE FROM products WHERE id = ${id};`)
            const elementToRemove = document.getElementById(`row${id}`);
            if (elementToRemove) {
                elementToRemove.remove(); // Remove the element from the DOM
            }
            dialog.close();
        })
    };

    // Append buttons to the actions cell
    cellActions.appendChild(editBtn);
    cellActions.appendChild(deleteBtn);

    // Optional: Apply styles directly if needed (alternative to class-based CSS)
    cellActions.style.textAlign = 'center'; // Center align buttons if CSS class does not exist
}

// DIALOG FORM
const dialogForm = document.getElementById("dialogForm");
const categoryForm = document.getElementById("categoryForm")
dialogForm.addEventListener("submit", () => {
    const inputAddProduct = document.querySelectorAll(".custom-inputbox input, .custom-inputbox select");
    
    try {
        executeUpdate(`
        INSERT INTO products (name, price, category) 
        VALUES ('${inputAddProduct[0].value}',${inputAddProduct[1].value},${findIdByName(categoryDB, inputAddProduct[2].value)});`)
        location.reload();
    }
    catch (err){ 
        console.error(err); 
    }

})

categoryForm.addEventListener("submit", () => {
    const inputAddProduct = document.querySelectorAll(".categoryInput input, .categoryInput select");
    console.log(inputAddProduct[0].value, inputAddProduct[1].value)
    try {
        executeUpdate(`
        INSERT INTO category (name, type) 
        VALUES ('${inputAddProduct[0].value.toLowerCase()}', '${inputAddProduct[1].value.toLowerCase()}');`);
        location.reload();
    }
    catch (err){ 
        console.error(err); 
    }
})

// EDIT AND DELETE BUTTONS