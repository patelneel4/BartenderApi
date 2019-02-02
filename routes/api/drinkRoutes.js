const express = require('express');
const router = express.Router();
const DrinksController = require('../../controller/drinksController');
const drinksController = new DrinksController();

router.post("/create", function (req, res) {
    console.log("CREATE");
    var result = drinksController.create(req.body)
        .then((data) => {
            res.end(JSON.stringify(data));
        });
});

router.get("/all", function (req, res) {
    console.log("GET ALL");
    var result = drinksController.getAll()
        .then((drinks) => {
            res.end(JSON.stringify(drinks));
        })
});

router.get("/:id", function (req, res) {
    console.log("GET DRINK ID:" +req.params.id);
    var result = drinksController.getById(req.params.id)
        .then((drink) => {
            res.end(JSON.stringify(drink));
        })
});



module.exports = router;