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

router.post("/update", function (req, res) {
    console.log("UPDATE");
    var result = drinksController.update(req.body)
        .then((data) => {
            res.end(JSON.stringify(data));
        });
});

router.delete("/delete/:id", function(req, res){
    console.log("DELETE ID");
    var result = drinksController.delete(req.params.id)
    .then((data)=> {
        res.end(JSON.stringify(data));
    });
});

router.post("/addDrinkToQueue/:id", function(req, res){
    console.log("ADDED DRINK TO QUEUE");
    var result = drinksController.addDrinkToQueue(req.params.id)
    .then((data)=> {
        res.end(JSON.stringify(data));
    });
});

router.delete("/deleteDrinkFromQueue/:id", function(req, res){
    console.log("DELETED DRINK FROM QUEUE");
    var result = drinksController.deleteDrinkFromQueue(req.params.id)
    .then((data)=> {
        res.end(JSON.stringify(data));
    });
});

router.get("/all/getDrinksQueue", function (req, res) {
    console.log("GET ALL");
    var result = drinksController.getDrinksQueue()
        .then((drinks) => {
            res.end(JSON.stringify(drinks));
        })
});



module.exports = router;