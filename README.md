# share-book
Node.js + TypeScript + Prisma ORM + MySQL 
This is an project showcasing how to build a Node.js application with TypeScript, using Prisma ORM for database access with MySQL.

Overview
Node.js - Backend runtime environment
TypeScript - Superset of JavaScript that compiles to plain JavaScript
Prisma - Modern ORM for Node.js & TypeScript
MySQL - Open source relational database
Requirements
Node.js
MySQL database
Getting Started
1.  Clone this repository
<!---->
https://github.com/Aung-Moe-Oo/share-book.git

2.  Install dependencies
<!---->
npm install or yarn

3.  Configure .env file with your MySQL connection URL and credentials
<!---->
DATABASE_URL="mysql://user:root@localhost:3306/sharebook"
SALT_PASS="hellosalt"
JWT_SECRET="hellojwt"

4.  Run migrations to create database tables  
<!---->
npx prisma migrate dev

5.  Generate Prisma Client
<!---->
npx prisma generate

6.  Start the app
<!---->
npm run dev

7.Access the server at http://localhost:8000.

Directory Structure
src/: Contains the application source code.
prisma/: Contains Prisma schema and migration files.
dist/: Transpiled TypeScript code (generated when you run npm run build).
node_modules/: Node.js dependencies (generated when you run npm install or yarn).

Contributing
Contributions are welcome! Please fork the repository and create a pull request.



