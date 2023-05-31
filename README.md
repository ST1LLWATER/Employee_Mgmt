# Employee Management CRUD APIs

### **`Features`**

- [x] Indexed employees names by FullText Index for optimized and fast searches by name.
- [x] Paginated results with skip and limit.
- [x] Proper error handling with error messages to understand issues with ease.
- [x] Proper validations implemented ensure data integrity.

### **`Technologies leveraged`**

- Node.js
- Express.js
- MySQL
- Docker
- Sequelize ORM
- Postman

<br>

# Models

## Employee Model

The `Employee` model represents an employee in the system.

## Table Schema

The `employees` table has the following columns:

- `id` (UUID) - Primary key identifier for the employee.
- `firstName` (STRING) - The first name of the employee.
- `lastName` (STRING) - The last name of the employee.
- `email` (STRING) - The email address of the employee.
- `createdAt` (DATE) - The timestamp of when the employee record was created.
- `updatedAt` (DATE) - The timestamp of when the employee record was last updated.

## Indexes

The `employees` table has the following indexes:

- `email` (UNIQUE) - Ensures uniqueness of email addresses in the table.
- `first_name_last_name_idx` (FULLTEXT) - Allows full-text search on the `first_name` and `last_name` columns.

## Associations

The `Employee` model has a one-to-one association with the `Metadata` model.

- Relationship: One Employee has One Metadata.
- Foreign Key: `employeeId` in the `Metadata` table references the `id` column in the `employees` table.
- Deletion Behavior: When an Employee is deleted, the associated Metadata record is also deleted (CASCADE).

<br>

## Metadata Model

The `Metadata` model represents additional information and details about an employee.

## Schema

| Column Name                           | Data Type | Validation                                                               |
| ------------------------------------- | --------- | ------------------------------------------------------------------------ |
| age                                   | INTEGER   | Required, must be between 18 and 80                                      |
| jobTitle                              | STRING    | Required                                                                 |
| phoneNumber                           | STRING    | Required, valid phone number                                             |
| secondaryEmergencyContactPhoneNumber  | STRING    | Required, valid phone number                                             |
| address                               | STRING    | Required                                                                 |
| city                                  | STRING    | Required                                                                 |
| state                                 | STRING    | Required                                                                 |
| primaryEmergencyContact               | STRING    | Required                                                                 |
| primaryEmergencyContactPhoneNumber    | STRING    | Required, valid phone number                                             |
| primaryEmergencyContactRelationship   | STRING    | Required                                                                 |
| secondaryEmergencyContact             | STRING    | Required                                                                 |
| secondaryEmergencyContactPhoneNumber  | STRING    | Required, valid phone number                                             |
| secondaryEmergencyContactRelationship | STRING    | Required                                                                 |
| createdAt                             | DATE      | Automatically generated, represents the timestamp of record creation     |
| updatedAt                             | DATE      | Automatically generated, represents the timestamp of record modification |

## Associations

The `Metadata` model has a one-to-one association with the `Employee` model and it `BELONGS TO` Employee table.

- Relationship: One Employee has One Metadata.
- Foreign Key: `employeeId` in the `Metadata` table references the `id` column in the `employees` table.
- Deletion Behavior: When an Employee is deleted, the associated Metadata record is also deleted (CASCADE).

# `Employee APIs`

## **Create Employee**

> **POST&nbsp;&nbsp;&nbsp;**`/api/v1/employee/new`

`Request Body`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "age": 24,
  "employeeFullName": "John Doe",
  "jobTitle": "Software Engineer",
  "phoneNumber": "0000000000",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "primaryEmergencyContact": "Jane Doe",
  "primaryEmergencyContactPhoneNumber": "1111111111",
  "primaryEmergencyContactRelationship": "Spouse",
  "secondaryEmergencyContact": "John Doe",
  "secondaryEmergencyContactPhoneNumber": "2222222222",
  "secondaryEmergencyContactRelationship": "Sibling"
}
```

`Response Json`

```json
{
  "success": true,
  "data": {
    "id": "20473cd7-475b-4382-8d8d-87b91aaf9722",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com"
  }
}
```

### **`Validations`**

- [x] Email must be unique.

`When Omitted:`

```json
{
  "success": false,
  "error": "Email already exists"
}
```

- [x] All fields are required.

`All validations are done in model in /model/Employee.js file`

<br>

# **Get Employees**

> **GET&nbsp;&nbsp;&nbsp;**`/api/v1/employee?skip=0&lim=10`

`Request Query Params (URL Params)`

```json
{
  "skip": 0,
  "lim": 10
}
```

`Response Json`

```json
{
  "success": true,
  "data": [
    {
      "id": "20473cd7-475b-4382-8d8d-87b91aaf9722",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com"
    },
    {
      "id": "9bdb63b7-27d8-425b-81ca-bbe1366c81e7",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@example.com"
    }
  ]
}
```

<br>

### **`Measures`**

- [x] If no skip and limits are provided, it will return all the employees.

<br>

# **Get Employee By Id**

> **GET&nbsp;&nbsp;&nbsp;**`/api/v1/employee/:id`

`Example Request URL`

> `/api/v1/employee/20473cd7-475b-4382-8d8d-87b91aaf9722`

```json
{
  "success": true,
  "data": {
    "id": "20473cd7-475b-4382-8d8d-87b91aaf9722",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "Metadatum": {
      "id": 1,
      "age": 0,
      "jobTitle": "Software Engineer",
      "phoneNumber": "0000000000",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "primaryEmergencyContact": "Jane Doe",
      "primaryEmergencyContactPhoneNumber": "1111111111",
      "primaryEmergencyContactRelationship": "Spouse",
      "secondaryEmergencyContact": "John Doe",
      "secondaryEmergencyContactPhoneNumber": "2222222222",
      "secondaryEmergencyContactRelationship": "Sibling",
      "createdAt": "2023-05-31T14:02:31.000Z",
      "updatedAt": "2023-05-31T14:02:31.000Z",
      "employeeId": "20473cd7-475b-4382-8d8d-87b91aaf9722"
    }
  }
}
```

<br>

# **Search Employees By Name**

> **GET&nbsp;&nbsp;&nbsp;**`/api/v1/employee/search`

`Request Body`

```json
{
  "name": "Jane"
}
```

`Response Json`

```json
{
  "success": true,
  "data": [
    {
      "id": "9bdb63b7-27d8-425b-81ca-bbe1366c81e7",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@example.com"
    }
  ]
}
```

### **`Features`**

- [x] Fulltext index search on first name and last name resulting in ultra-fast response time.
- [x] Search is case-insensitive.
- [x] Search is done on both first name and last name or even fullname.

<br>

# **Update Employee**

> **PATCH&nbsp;&nbsp;&nbsp;**`/api/v1/employee/:id`

`Example Request URL`
`/api/v1/employee/20473cd7-475b-4382-8d8d-87b91aaf9722`

`Request Body`

```json
{
  "firstName": "John"
}
```

`Response Json`

```json
{
  "success": true,
  "message": "Employee updated successfully"
}
```

<br>
**Update Employee Metadata**

> **PATCH&nbsp;&nbsp;&nbsp;**`/api/v1/employee/:id`

`Example Request URL`
`/api/v1/employee/metadata/20473cd7-475b-4382-8d8d-87b91aaf9722`

`Request Body`

```json
{
  "age": 27
}
```

`Success Response Json`

```json
{
  "success": true,
  "message": "Employee updated successfully"
}
```

<br>

**Delete Employee**

> **DELETE&nbsp;&nbsp;&nbsp;**`/api/v1/employee/:id`

`Example Request URL`
`/api/v1/employee/metadata/20473cd7-475b-4382-8d8d-87b91aaf9722`

`Success Response Json`

```json
{
  "success": true,
  "message": "Employee deleted"
}
```

# Thank You
