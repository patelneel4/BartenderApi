const express = require('express');
const router = express.Router();
const PumpsController = require('../../controller/pumpsController');
const pumpsController = new PumpsController();

router.post("/create", function (req, res) {
    console.log("CREATE");
    var result = pumpsController.create(req.body)
        .then((pump) => {
            res.end(JSON.stringify(pump));
        });
});

router.post("/update", function (req, res) {
    console.log("UPDATE");
    var result = pumpsController.update(req.body)
        .then((pump) => {
            res.end(JSON.stringify(pump));
        });
});

router.get("/all", function (req, res) {
    console.log("GET ALL");
    var result = pumpsController.getAll()
        .then((pumps) => {
            res.end(JSON.stringify(pumps));
        })
});

router.get("/:id", function (req, res) {
    console.log("GET ID");
    var result = pumpsController.getById(req.params.id)
        .then((drink) => {
            res.end(JSON.stringify(drink));
        })
});



module.exports = router;