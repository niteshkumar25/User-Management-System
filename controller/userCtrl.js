const connect = require("../db/connet");

const userCtrl = {

  //Show all users
  homePage: (req, res) => {
    connect.query(
      "SELECT * FROM users WHERE status = 'active'",
      (err, rows) => {
        if (!err) {
          let  removedUser = req.query.removed;
          res.render("home", { rows, removedUser });
        } else {
          console.log(err);
        }
        // console.log(rows);
      }
    );
  },

  //Serach User
  find: (req, res) => {
    let searchTerm = req.body.search;
    connect.query(
      "SELECT * FROM users WHERE first_name LIKE ?",
      ["%" + searchTerm + "%"],
      (err, rows) => {
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        // console.log(rows);
      }
    );
  },

  form: (req, res) => {
    res.render("adduser");
  },

  //ADD User
  adduser: (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    connect.query(
      "INSERT INTO users SET first_name=?, last_name=?, email=?,phone=?,comments=? ",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        if (!err) {
          res.render("adduser", { alert: `User added Sucessfully` });
        } else {
          console.log(err);
        }
        // console.log(rows);
      }
    );
  },

  edit: (req, res) => {
    connect.query(
      "SELECT * FROM users where id =? ",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }
      }
    );
  },

  //Update User
  editsUser: (req, res) => {
    const data = [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone,
      req.body.comments,
      req.params.id,
    ];
    connect.query(
      "UPDATE users SET first_name = ?, last_name=?, email=? ,phone=?, comments=? WHERE id=?",
      data,
      (err, rows) => {
        if (!err) {
          connect.query(
            "SELECT * FROM users where id =? ",
            [req.params.id],
            (err, rows) => {
              if (!err) {
                res.render("edit-user", {
                  rows,
                  alert: `${req.body.first_name} has been Updated`,
                });
              } else {
                console.log(err);
              }
            }
          );
        } else {
          console.log(err);
        }
        // console.log(rows);
      }
    );
  },

  //Delete User
  delete: (req, res) => {
    connect.query(
      "DELETE FROM USERS WHERE id=?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          let  removedUser = encodeURIComponent(`User has been Removed`)
          res.redirect("/?removed= "+  removedUser);
        } else {
          console.log(err);
        }
      }
    );
  },

  //View User
  viewUser: (req, res) => {
    connect.query(
      "SELECT * FROM USERS WHERE id=?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.render("view-user", { rows });
        } else {
          console.log(err);
        }
      }
    );
  },
};

module.exports = userCtrl;
