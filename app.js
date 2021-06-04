const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
//express server 
const app = express();
// Server configuration

app.set("views", path.join(__dirname, "views"));
//creating an express router 
const router = express.Router();

// config middlewares 
//serve static files in express
app.use(express.static(path.join(__dirname, "public"))); //then e.g. this will work http://localhost:3000/images/firefox-icon.png
app.use(express.urlencoded({ extended: false })); // use the middleware “express.urlencoded()” so that request.body retrieves the posted values

// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "apptest.db");
console.log("Database full path - " + db_name);
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

// Creating Vaccination table (userID, Name, Surname)
const sql_create = `CREATE TABLE IF NOT EXISTS Vaccination (
  Vaccination_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR(100) NOT NULL,
  Surname VARCHAR(100) NOT NULL,
  VaccineDate VARCHAR(100) NOT NULL,
  VaccineName VARCHAR(100) NOT NULL,
  VaccinePlace VARCHAR(100) NOT NULL
);`;
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Vaccination' table");

  // Database seeding
  const sql_insert = `INSERT INTO Vaccination (Name, Surname,VaccineDate,VaccineName,VaccinePlace) VALUES
  ("John", "Doe","2021/03/05","Astra","CPT"),
  ("Bill", "Gates", "2021/03/05","Astra","CPT");`;
  db.run(sql_insert, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of 2 vaccination records");
  });
});

// GET /
router.get("/", function (req, res) {
  const sql = "SELECT * FROM Vaccination";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("rows - " + rows.length);
    //__dirname resolves to your project folder.
    res.render(__dirname + "/views/index.ejs", {
      status: "No status",
      users: rows,
    });

    //The sendfile method, on the other hand, simply sends a given file to the client, regardless of the type and contents of the file.
    //render allows processing of variables but requires use of a templating engine e.g. name
    //  res.sendFile(
    //    path.join(__dirname + "/views/index.html")
    //  );
  });
});

// GET /about
router.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

/// POST /
router.post("/", function (req, res) {
  const user = [req.body.fname, req.body.lname];
  console.log("Submitted name: " + req.body.fname);
  console.log("Submitted surname: " + req.body.lname);
  console.log("Submitted date: " + req.body.vdate);
  console.log("Submitted vaccine name: " + req.body.vname);
  console.log("Submitted vaccine place: " + req.body.vplace);
  const sql = "INSERT INTO Vaccination (Name, Surname, VaccineDate,VaccineName,VaccinePlace) VALUES (?,?)";
  db.run(sql, user, (err) => {
    // if (err) ...
    res.render(__dirname + "/views/index.ejs", { status: "Saved to DB" });
    //res.redirect("/");
  });
});

//add the router
app.use("/", router);

// Starting the server
app.listen(3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});
