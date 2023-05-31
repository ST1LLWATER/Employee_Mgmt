# Invoice-App-Backend APIs

### **`Features`**

- [x] Indexed fields for faster access on frequently required fields.
- [x] Optimized searches by Aggregate queries for better performance, flexibility and making it easy to understand by anyone due to pipeline processing nature of it.
- [x] Edge Case Handling for Search Requirements.
- [x] Proper validations at schema level to ensure data integrity.
- [x] Proper error messages to understand issues with ease.
- [x] Docker-compose for smooth deployments when required.

## `Account API`

## **Create Account**

> **POST&nbsp;&nbsp;&nbsp;**`http://localhost:3000/api/createaccount`

`Request Body`

```json
{
  "name": "John Doe",
  "balances": [
    { "year": "2022-23", "balance": 5000 },
    { "year": "2023-24", "balance": 7000 },
    { "year": "2024-25", "balance": 9000 }
  ]
}
```

`Response Json`

```json
{
  "account": {
    "name": "Callisto Protocol",
    "balances": [
      {
        "year": "2022-23",
        "balance": 5000
      },
      {
        "year": "2023-24",
        "balance": 7000
      },
      {
        "year": "2024-25",
        "balance": 9000
      }
    ],
    "_id": "6417edd45322c80a8e92654d",
    "__v": 0
  }
}
```

User needs to provide name and balances of three years as specified in assignment.

### **`Validations`**

- [x] Must provide balances from 2022 till 2025.

`When Omitted:`

```json
{
  "error": [
    "You should provide three financial year balances from 2022 i.e 2022-23, 2023-24, 2024-25."
  ]
}
```

- [x] All fields are required.

`All validations are done in schema in /model/Account.js file`

<br>
<hr>
<br>

# `Invoice APIs`

# **Create Invoice**

> **POST&nbsp;&nbsp;&nbsp;**`http://localhost:3000/api/createinvoice`

`Request Body`

```json
{
  "date": "2023-03-20",
  "customerId": "6416dbba64da1f4387d257e9",
  "accountArray": [
    {
      "accountId": "6416d9052d909fb650d2b596",
      "amount": 100
    },
    {
      "accountId": "6416dbba64da1f4387d257e9",
      "amount": 100
    }
  ],
  "totalAmount": 200,
  "invoiceNumber": "INV-2023-06",
  "year": "2023-24"
}
```

`Response Json`

```json
{
  "invoice": {
    "date": "2022-03-20T00:00:00.000Z",
    "customerId": "6417f20b37d02e3f0b2d4c2a",
    "accountArray": [
      {
        "accountId": "6417f1ff37d02e3f0b2d4c28",
        "amount": 100
      },
      {
        "accountId": "6417f20b37d02e3f0b2d4c2a",
        "amount": 100
      }
    ],
    "totalAmount": 200,
    "invoiceNumber": "INV-2023-02",
    "year": "2023-24",
    "_id": "6417f34e37d02e3f0b2d4c39",
    "createdAt": "2023-03-20T05:46:54.072Z",
    "updatedAt": "2023-03-20T05:46:54.072Z",
    "__v": 0
  }
}
```

<br>

### **`Validations`**

- [x] All fields are compulsory

- [x] Total of amount in AccountArray should be equal to Total Amount.

`When Sum Doesn't Match:`

```json
{
  "error": [
    "Total of amount in accountArray should be equal to Total Amount Provided."
  ]
}
```

- [x] Account array should have at least one object.

`When No Objects Is Passed In Account Array:`

```json
{
  "error": ["Account array should have at least one data."]
}
```

- [x] All accountId should be present in DB.

`When Customer ID Doenst Exist:`

```json
{
  "error": ["Specified customer does not exist. (Customer ID not found)"]
}
```

`When Account ID in Account Array Doenst Exist:`

```json
{
  "error": [
    "Account ID specified in account array does not exist. (Account ID not found)"
  ]
}
```

- [x] Same invoice number should not be already present for the same year.

`When same number invoice exists for same year:`

```json
{
  "error": ["Invoice number already exists for the same year."]
}
```

- [x] After saving entry, the amount in all accounts in accountarray should be incremented with the respective amount for the concerned year for the account id provided.

`All validations are done in schema in /model/Invoice.js file`

<br>
<hr>
<br>

# **List Invoices**

> **POST&nbsp;&nbsp;&nbsp;**`http://localhost:3000/api/invoicelist`

### **`Features`**

- [x] Indexed User Names, Invoice Numbers & Amounts for optimized and fast searches
- [x] Not passing skip defaults to 0
- [x] Not passing limit defaults to 10
- [x] Not passing search, returns all invoices
- [x] Populated customer id with names on response for smoother integration

`Request Body`

| Field  | Type    | Required | Description                 |
| ------ | ------- | -------- | --------------------------- |
| skip   | integer | Yes      | Skip results for pagination |
| limit  | integer | Yes      | Limit result amount         |
| search | string  | Yes      | Search Field                |

```json
{
  "skip": 0,
  "limit": 10,
  "search": "Ak"
}
```

`Response Json`

```json
[
  {
    "_id": "64181f4dfd0b8ae43f6d181c",
    "customerId": "64181efffd0b8ae43f6d1804",
    "createdAt": "createdAt",
    "date": "2022-03-20T00:00:00.000Z",
    "accountArray": [
      {
        "accountId": {
          "_id": "64181f0dfd0b8ae43f6d1806",
          "name": "Akash"
        },
        "amount": 300
      },
      {
        "accountId": {
          "_id": "64181f0dfd0b8ae43f6d1806",
          "name": "Akash"
        },
        "amount": 300
      }
    ],
    "invoiceNumber": "INV-2023-03",
    "totalAmount": 600,
    "year": "2023-24"
  }
]
```

### **`Validations`**

- [x] Searches By Invoice Number

- [x] Case insesitive fuzzy invoice search by user's names belonging to IDs in Account Array.

**_For Eg: If Customer's Name is John, Searching Joh Will also return the invoice, this is fuzzy search implementation.
The searched field can be subset of user's name too._**

- [x] Search by amount of invoice (totalAmount field).

  - [x] Partially Matched Search By Both Amount in Account Array & Total Amount
  - [x] Searching 200 also returns invocies with 2000, 20001.
  - [x] Searching 200.00 matches 200.
  - [x] Searching by fractions is possible too like 200.50. (Covered Edge Case Created For Matching 200.00 with 200)

# Thank You
