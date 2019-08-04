# Bamazon

 This an application that takes in orders from customers and deplete stock from the store's inventory.  It is called Bamazon, an Amazon-like storefront created with MySQL. This application basically takes in orders, prints out the client request and updates the inventory of the stock which is purchased. 

 A number of variables and functions were created using Node.js and MySQL. 

 MySQL:

 A Database called Bamazon was created in MySQL and in it a table called "products" was created to automatically update the ItemId, Product name, Price and the Stock Qunatity. 

 Attached is a link giving detailed illustration of the database created in MySQL:
 <img width="1410" alt="Screenshot MySQL i" src="https://user-images.githubusercontent.com/36799420/62430583-7b60f680-b6ec-11e9-94bb-667deaa376e7.png">

 Node.js:

 A Node application called "bamazonCustomer.js" was created to run available items for sale, itemId, itemPrice and Products available for sale. This application will then prompt users with two messages;

 i.) The ID of the product they will like to buy

 ```js
 function displayTableData(dbData) {
    inquirer.prompt([
        {
            name: 'itemId',
            type: 'input',
            message: 'Enter the item id of product you want to buy : '
        },
```

ii.) The second message should ask how many units of the product they would like to buy.

```js
 function displayTableData(dbData) {
    inquirer.prompt([
    
        {
            name: 'qty',
            type: 'input',
            message: 'Enter the item quatnity : '
        }
 ```

 To validate the customers order, this application checks if the store has enough of the product to meet the customer's request, to acheive this a rReduceInventory function was written;
 
 ```js
 function ReduceInventory(dbItem, quantity) {
    var sqlStr = `UPDATE products
                    SET stock_quantity = stock_quantity - ?
                    WHERE item_id = ?`;
    
```
If the store doesn't have enough stock this application will log this phrase "Insufficient quantity!," with a switch statement.

```js
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

```


 






