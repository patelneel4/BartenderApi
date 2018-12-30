const express = require('express');
const router = express.Router();
const LiquidsController = require('../../controller/liquidsController');
const liquidsController = new LiquidsController();

router.post("/create", function(req, res){
    console.log("CREATE");
    var result = liquidsController.create(req.body, req.body)
    .then((data)=> {
        res.end(JSON.stringify(data));
    });
});

router.get("/all", function (req, res) {
    console.log("GET ALL");
    var result = liquidsController.getAll()
        .then((data) => {
            res.end(JSON.stringify(data));
        });
});

router.get("/:id",function(req, res){
    console.log("GET ID");
    var result = liquidsController.getById(req.params.id)
    .then((data)=> {
        res.end(JSON.stringify(data));
    });
});

module.exports = router;