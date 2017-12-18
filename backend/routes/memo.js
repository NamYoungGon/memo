var express = require('express');
var router = express.Router();

const list = []

/* post users listing. */
router.post('/save', function(req, res, next) {
    const { title, description } = req.body

    list.push({
        title,
        description
    })

    res.json(list)
});

router.post('/list', function(req, res, next) {
    const { title, description } = req.body
    
    res.json(list)
});

module.exports = router;
