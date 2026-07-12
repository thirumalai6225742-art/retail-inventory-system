if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href =
    "login.html";

}
let products = JSON.parse(
    localStorage.getItem("products")
) || [];

let editIndex = -1;

displayProducts(products);

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

function addProduct(){

    let name =
    document.getElementById("name").value;

    let price =
    Number(document.getElementById("price").value);

    let stock =
    Number(document.getElementById("stock").value);

    if(name === ""){
        alert("Enter Product Name");
        return;
    }

    let product = {

        name:name,
        price:price,
        stock:stock,

        sold:
        editIndex === -1
        ? 0
        : products[editIndex].sold

    };

    if(editIndex === -1){

        products.push(product);

    }
    else{

        products[editIndex] = product;

        editIndex = -1;

    }

    saveProducts();

    displayProducts(products);

    clearInputs();

}

function clearInputs(){

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";

}

function displayProducts(productArray){

    let table =
    document.getElementById("productTable");

    table.innerHTML = "";

    let totalValue = 0;
    let lowStock = 0;
    let totalRevenue = 0;
    let totalSold = 0;

    let topProduct = "";
    let maxSold = 0;

    for(let i=0;i<productArray.length;i++){

        totalValue +=
        productArray[i].price *
        productArray[i].stock;

        totalRevenue +=
        productArray[i].sold *
        productArray[i].price;

        totalSold +=
        productArray[i].sold;

        if(productArray[i].sold > maxSold){

            maxSold =
            productArray[i].sold;

            topProduct =
            productArray[i].name;

        }

        let status = "Available";

        if(productArray[i].stock < 20){

            status =
            "<span class='low-stock'>Low Stock</span>";

            lowStock++;

        }

        table.innerHTML +=

        "<tr>" +

        "<td>" + productArray[i].name + "</td>" +

        "<td>" + productArray[i].price + "</td>" +

        "<td>" + productArray[i].stock + "</td>" +

        "<td>" + productArray[i].sold + "</td>" +

        "<td>" + status + "</td>" +

        "<td>" +

        "<button class='edit-btn' onclick='editProduct(" + i + ")'>Edit</button>" +

"<button class='delete-btn' onclick='deleteProduct(" + i + ")'>Delete</button>" +

"<button class='sell-btn' onclick='sellProduct(" + i + ")'>Sell</button>" +
        "</td>" +

        "</tr>";

    }

    document.getElementById("totalProducts")
    .innerHTML =
    "Total Products: " + products.length;

    document.getElementById("inventoryValue")
    .innerHTML =
    "Inventory Value: ₹" + totalValue;

    document.getElementById("lowStockCount")
    .innerHTML =
    "Low Stock: " + lowStock;

    document.getElementById("totalRevenue")
    .innerHTML =
    "Total Revenue: ₹" + totalRevenue;

    document.getElementById("totalSold")
    .innerHTML =
    "Total Units Sold: " + totalSold;

    document.getElementById("topProduct")
    .innerHTML =
    "Top Product: " +
    (topProduct === "" ? "None" : topProduct);

    document.getElementById("salesReport")
    .innerHTML =

    "Revenue: ₹" +
    totalRevenue +

    "<br><br>" +

    "Units Sold: " +
    totalSold +

    "<br><br>" +

    "Top Product: " +
    (topProduct === "" ? "None" : topProduct);

}

function deleteProduct(index){

    products.splice(index,1);

    saveProducts();

    displayProducts(products);

}

function editProduct(index){

    editIndex = index;

    document.getElementById("name").value =
    products[index].name;

    document.getElementById("price").value =
    products[index].price;

    document.getElementById("stock").value =
    products[index].stock;

}

function sellProduct(index){

    let quantity =
    Number(prompt("Enter Quantity Sold"));

    if(quantity > products[index].stock){

        alert("Not Enough Stock");

        return;

    }

    products[index].stock -= quantity;

    products[index].sold += quantity;

    saveProducts();

    displayProducts(products);

}

function searchProducts(){

    let searchText =
    document.getElementById("search")
    .value
    .toLowerCase();

    let filteredProducts = [];

    for(let i=0;i<products.length;i++){

        if(
        products[i]
        .name
        .toLowerCase()
        .includes(searchText)
        ){

            filteredProducts.push(products[i]);

        }

    }

    displayProducts(filteredProducts);

}
function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
    "login.html";

}