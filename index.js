
// To generate random data
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DEMO',
    password: "root321"
});

// let q = "SHOW TABLES";

// Inserting new data manually
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [
//     ["123a", "123_newusera", "abca@gmail.com", "abca"],
//     ["123b", "123_newuserb", "abcb@gmail.com", "abcb"],
// ];


let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}

// Inert data in bulk using faker

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let data = [];

// for (let i = 1; i <= 50; i++) {
//     data.push(getRandomUser()); // 50 fake user data

// Home route
app.get("/", ( req, res ) => {
    let q = "SELECT count(*) FROM user";
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", { count });
        })
    } catch (err) {
        console.log(err); 
        res.send("Some err in DB");   
    }
});

//  Show Users
app.get("/user", ( req, res ) => {
    let q = "SELECT * FROM user";
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
            res.render("showusers.ejs", { users });
        })
    } catch (err) {
        console.log(err); 
        res.send("Some err in DB");   
    }
});

app.listen("8080", () => {
    console.log("server is listening to port 8080")
});
