const express = require("express")
const router = express.Router()
const request = require('request');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost:3306/woli', 
     user:'root', 
     password: 'toor',
     connectionLimit: 2
});
pool.getConnection()
    .then(conn => {
      console.log('connected!');
      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });


router.use(logger)

router.get("/update", (req, res) => {
  console.log('in update');

  request('https://openexchangerates.org/api/latest.json?app_id=e9b9340335f7401cb4611d6e976bc0ac', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(res);
  });



  // console.log(req.query.name)
  // res.send("User List")
})

// router.get("/new", (req, res) => {
//   res.render("users/new")
// })

// router.post("/", (req, res) => {
//   const isValid = false
//   if (isValid) {
//     users.push({ firstName: req.body.firstName })
//     res.redirect(`/users/${users.length - 1}`)
//   } else {
//     console.log("Error")
//     res.render("users/new", { firstName: req.body.firstName })
//   }
// })

// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log(req.user)
//     res.send(`Get User With ID ${req.params.id}`)
//   })
//   .put((req, res) => {
//     res.send(`Update User With ID ${req.params.id}`)
//   })
//   .delete((req, res) => {
//     res.send(`Delete User With ID ${req.params.id}`)
//   })

// const users = [{ name: "Kyle" }, { name: "Sally" }]
// router.param("id", (req, res, next, id) => {
//   req.user = users[id]
//   next()
// })

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router
