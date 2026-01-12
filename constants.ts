
import type { Language, CodeExample } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
    { id: 'sql', name: 'SQL' },
    { id: 'powerfx', name: 'Power Apps (Power Fx)' },
    { id: 'mendix', name: 'Mendix (XPath / OQL / Microflow)' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'ezhil', name: 'Tamil (Ezhil)' },
];

export const CODE_EXAMPLES: CodeExample[] = [
    { langId: 'sql', name: 'SQL', code: "SELECT\n    p.ProductID,\n    p.Name AS ProductName,\n    c.Name AS CategoryName\nFROM\n    Production.Product AS p\nINNER JOIN\n    Production.ProductSubcategory AS ps ON p.ProductSubcategoryID = ps.ProductSubcategoryID\nINNER JOIN\n    Production.ProductCategory AS c ON ps.ProductCategoryID = c.ProductCategoryID\nWHERE\n    p.ListPrice > 50.00\nORDER BY\n    p.ListPrice DESC;" },
    { langId: 'powerfx', name: 'Power Fx', code: 'Filter(\n    Accounts,\n    \'Account Name\' = "Contoso",\n    Status = \'Status (Accounts)\'.Active\n)' },
    { langId: 'mendix', name: 'Mendix (XPath)', code: "//Sales.Customer[Name = 'John Doe'][IsActive = true()]" },
    { langId: 'mendix', name: 'Microflow (Consulta)', code: `// This is a textual representation of a Mendix Microflow.
// It finds a customer and shows a message based on their status.

BEGIN
  INPUT customerName : String

  // Retrieve the customer from the database
  customerObject = RETRIEVE Customer FROM Database WHERE Name = customerName

  // Check if the customer exists and is active
  IF customerObject != EMPTY AND customerObject/IsActive = TRUE THEN
    // Show a success message
    SHOW MESSAGE "Info" "Customer " + customerObject/Name + " is active."
  ELSE
    // Show an error or warning message
    SHOW MESSAGE "Warning" "Customer not found or is inactive."
  END IF
END` },
    { langId: 'mendix', name: 'Microflow (Criação)', code: `// This is a textual representation of a Mendix Microflow.
// This Microflow creates a new Order for a given Customer.

BEGIN
  INPUT customerObject : Customer

  // Create a new Order object in memory
  newOrder = CREATE Order

  // Set the attributes of the new order
  SET newOrder/OrderDate = [%CurrentDateTime%]
  SET newOrder/Status = 'Pending'

  // Associate the new order with the input customer
  SET ASSOCIATION newOrder/Order_Customer = customerObject

  // Commit the new order to the database
  COMMIT newOrder

  // Show a confirmation message
  SHOW MESSAGE "Info" "New order created successfully."
END` },
    { langId: 'mendix', name: 'Microflow (Atualização)', code: `// This is a textual representation of a Mendix Microflow.
// This Microflow updates the status of an existing Order.

BEGIN
  INPUT orderObject : Order
  INPUT newStatus : String

  // Change the Status attribute of the order
  SET orderObject/Status = newStatus

  // Commit the changes to the database
  COMMIT orderObject

  // Show a confirmation message
  SHOW MESSAGE "Info" "Order status updated to " + newStatus
END` },
    { langId: 'mendix', name: 'Microflow (Exclusão)', code: `// This is a textual representation of a Mendix Microflow.
// This Microflow deletes a specific Order.

BEGIN
  INPUT orderObject : Order

  // Delete the provided order object from the database
  DELETE orderObject

  // Show a confirmation message
  SHOW MESSAGE "Info" "Order has been successfully deleted."
END` },
    { langId: 'mendix', name: 'Microflow (Loop)', code: `// This is a textual representation of a Mendix Microflow.
// This Microflow calculates the total price of all items in an order.

BEGIN
  INPUT orderObject : Order

  // Initialize a variable to hold the total price
  totalPrice = 0.0

  // Retrieve all OrderLine items associated with the order
  orderLines = RETRIEVE OrderLine FROM Database WHERE OrderLine_Order = orderObject

  // Loop through each order line
  LOOP over orderLines
    // Add the price of the current line item to the total
    totalPrice = totalPrice + current_orderLine/Price
  END LOOP

  // Update the total price on the order object
  SET orderObject/TotalPrice = totalPrice
  COMMIT orderObject

  // Return the calculated total price
  RETURN totalPrice
END` },
    { langId: 'mendix', name: 'OQL (Consulta)', code: 'SELECT Name FROM MyFirstModule.Customer WHERE Age > 18' },
    { langId: 'mendix', name: 'OQL (Join)', code: "SELECT c.Name, a.City FROM Sales.Customer AS c JOIN c/Sales.Customer_Address/Sales.Address AS a WHERE a.State = 'CA'" },
    { langId: 'javascript', name: 'JavaScript', code: "async function getUsers() {\n  const response = await fetch('https://api.example.com/users');\n  const data = await response.json();\n  return data.filter(user => user.isActive);\n}" },
    { langId: 'python', name: 'Python', code: "def greet(name):\n    \"\"\"This function greets the person passed in as a parameter.\"\"\"\n    print(f\"Hello, {name}!\")\n\ngreet('World')" },
    { langId: 'typescript', name: 'TypeScript', code: "interface User {\n  id: number;\n  name: string;\n}\n\nconst getUserName = (user: User): string => {\n  return user.name;\n};" },
    { langId: 'java', name: 'Java', code: "import java.util.ArrayList;\nimport java.util.List;\n\npublic class HelloWorld {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>();\n        items.add(\"Java\");\n        System.out.println(\"Hello, \" + items.get(0));\n    }\n}" },
    { langId: 'csharp', name: 'C#', code: "using System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}" },
    { langId: 'go', name: 'Go', code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"Hello, World!\"\n    fmt.Println(message)\n}" },
    { langId: 'rust', name: 'Rust', code: "fn main() {\n    let message = \"Hello, world!\";\n    println!(\"{}\", message);\n}" },
    { langId: 'ezhil', name: 'Tamil (Ezhil)', code: 'பதிப்பி "வணக்கம் உலகம்"' },
];