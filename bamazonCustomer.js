//All the dependencies
let inq = require("inquirer");
let mysql = require("mysql");

//Creates connection to MySQL
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "",
    database: "bamazon"
});

//Connects to MySQL and database
connection.connect(function(err){
    if (err) throw err;
    start();
});

//Welcomes client and asks if they would like to look at available products
function start(){
    console.log("******************************************")
    console.log("-----*-*-*  WELCOME TO BAMAZON  *-*-*-----");
    console.log("******************************************");
    inq.prompt(
        {
            name: "available",
            type: "confirm",
            message: "Would you like to look at our available products?"
        }
    ).then(function(answer){
        if (answer.available){
            showProducts();
        } else {
            exit();
        }
    });
}

//Shows all available products to the client
function showProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("\nAll Available Products\n");

        for (let i = 0; i<res.length; i++){
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------------------------------------------");
        }
        promptUser();
    });
}


//Prompts user for their course of action
function promptUser(){
    inq.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID number of the item you would like to purchase",
            validate: function(value){
                if (value <= 0 || value > 10 || isNaN(value)){
                    console.log("\nPlease enter a valid ID number\n")
                } else {
                    return true;
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value){
                if (isNaN(value)){
                    console.log("\nPlease enter a valid number\n");
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer){
        let itemID = answer.id;
        let itemQuantity = answer.quantity;

        connection.query("SELECT * FROM products WHERE ?",{
            item_id: answer.id
        }, function(err, res){
            if (itemQuantity > res[0].stock_quantity){
                console.log("Insufficient quantity");
                promptUser();
            }
            else{
                console.log("Your purchase will go through");
            }
        checkout();
        });    
    });
}

function checkout(){
    inq.prompt(
        {
            name: "checkout",
            type: "confirm", 
            message: "Would you like to checkout?"
        }
    ).then(function(total){
        if (total.checkout){
            
        } else {
            buyMore();
        }
    });
}

function buyMore(){
    inq.prompt(
        {
            name: "more",
            type: "confirm", 
            message: "Would you like to buy more items?"
        }
    ).then(function(more){
        if (more.buyMore){
            showProducts();
        } else {
            exit();
        }
    });
}

function exit(){
    console.log("Thank you for shopping at Bamazon");
    connection.end();
}