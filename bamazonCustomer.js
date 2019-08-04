var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    LoadDatabase();
});

function LoadDatabase() {
    let queryString = 'SELECT * FROM products';
    connection.query(queryString, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.table(res);
        displayTableData(res)
    })
}

function GetItem(dbData, id, quantity) {
    for (var i = 0; i < dbData.length; i++) {
        if (dbData[i].item_id === parseInt(id)) {
            if (dbData[i].stock_quantity >= parseInt(quantity)) {
                return dbData[i]
            }
            return "INS"
        }
    }
    return "DNE"
}

function ReduceInventory(dbItem, quantity) {
    var sqlStr = `UPDATE products
                    SET stock_quantity = stock_quantity - ?
                    WHERE item_id = ?`;
    var sqlData = [quantity, dbItem.item_id];

    connection.query(sqlStr, sqlData, function (err, result) {
        if (err) throw err;

        console.log('Your order is placed');
        console.log('Your total Purchase price : ' + dbItem.price * parseInt(quantity));
    })
}

function displayTableData(dbData) {
    inquirer.prompt([
        {
            name: 'itemId',
            type: 'input',
            message: 'Enter the item id of product you want to buy : '
        },
        {
            name: 'qty',
            type: 'input',
            message: 'Enter the item quatnity : '
        }
    ]).then(function (data) {
        console.log('You have entered : ' + data.itemId);
        console.log('Quantity : ' + data.qty);

        var item = GetItem(dbData, data.itemId, data.qty);

        switch (item) {
            case "DNE":
                console.log("Does not exist");
                displayTableData(dbData)
                break;
            case "INS":
                displayTableData(dbData)
                console.log("Insuficient quanity")
                break;
            default:
                ReduceInventory(item, data.qty)
        }

        // let qtyQuery = 'SELECT * FROM products where item_id=' + data.itemId;
        // connection.query(qtyQuery,function(err,result){
        //     if(result[0].stock_quantity>data.qty){
        //         console.log('Your order is placed');
        //         console.log('Your total Purchase price : ' + result[0].price * data.qty);
        //         let newQty = result[0].stock_quantity - data.qty;
        //         let updateQuery = 'UPDATE products SET  stock_quantity=? WHERE item_id=?';
        //         connection.query(updateQuery,[newQty,data.itemId],function(err,data){
        //             if(err){
        //                 console.log(err);
        //             }
        //             console.log('Table updated');
        //         });
        //         connection.end();
        //     }else{
        //         console.log('Out of stock');
        //     }
        // });

    });
}
