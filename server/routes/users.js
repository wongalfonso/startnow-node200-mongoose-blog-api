const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    });
});

router.get("/:id", (req, res) => {
  User
    .findById(req.params.id)
    .then(users => {
      if (!users) res.status(404).send();
        res.status(200).json(users);
    }).catch(err => res.status(404))
});

router.post("/", (req, res) => {
  let newUser = new User(req.body)
  newUser
    .save()
    .then(users => res.status(201).json(users))
    .catch(err => res.status(500).send("bad post"));
});

router.put("/:id", (req, res) => {
  User
    .findByIdAndUpdate(req.params.id)
    .then(users => {
      if (!users) res.status(404).send();
      res.status(204).json(users);
    }). catch(err => res.status(500).send("bad put"));
})

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(users => {
      if (!users) res.status(404).send();
        res.status(200).json(users);
    }).catch(err => res.status(500).send("bad delete"))
});

module.exports = router;
