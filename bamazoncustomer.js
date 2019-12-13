var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
    head: ['Item ID', 'Item', 'Price', 'Qnty'],
    colWidths: [20, 40, 15, 15]
});


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bs@175513",
    database: "Bamazon"
});

var FgWhite = "\x1b[0m";
var FgCyan = "\x1b[36m";
var FgGreen = "\x1b[32m";
var FgMagenta = "\x1b[35m";

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

goShopping();

function goShopping() {
    connection.query('SELECT * FROM Products', function (err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].price.toFixed(2), res[i].stock_quantity])
        }
        console.log(table.toString());

        inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "What would you like to buy?",
            choices: function (value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    var chosenItem = res[i];
                }
            }
            var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);
            var pSales = parseFloat(chosenItem.product_name).toFixed(2);
            if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                console.log(`${FgCyan} Insufficient quantity! ${FgWhite}`);
                repeat();
            }
            else {
                var Total = (parseFloat(answer.quantity) * chosenItem.price).toFixed(2);
                var pTotal = (parseFloat(Total) + parseFloat(pSales)).toFixed(2);
                var query = connection.query("UPDATE Products SET ?, ? WHERE ?", [{ stock_quantity: updateStock }, { product_name: pTotal }, { item_id: chosenItem.item_id }], function (err, res) {
                    if (err) throw err;
                    console.log(`${FgCyan} Purchase successful! ${FgWhite}`);
                    console.log("Your total is $ " + FgGreen + Total);
                    repeat();
                });
            }

        });

    });

}

function repeat() {
    inquirer.prompt({
        name: "repurchase",
        type: "list",
        choices: ["Yes", "No"],
        message: "Would you like to purchase another item?"
    }).then(function (answer) {
        if (answer.repurchase == "Yes") {
            goShopping();
        }
        else {
            console.log(`${FgMagenta} Thanks for shopping with us. Have a great day! ${FgWhite}`)
            connection.end();
        }
    });
}