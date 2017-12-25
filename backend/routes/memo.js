var express = require('express');
var router = express.Router();

const list = []

/* post users listing. */
router.post('/save', async (req, res, next) => {
    const { title, description } = req.body
    const database = global.database

    if (database) {
        const Memo = database.models.Memo({
            title, description
        })

        const result = await Memo.save()
        if (result) {
            res.json({
                message: '메모 저장을 성공하였습니다.',
                error: false
            })
        } else {
            res.json({
                message: '메모 저장을 실패하였습니다.',
                error: true
            })
        }
    } else {
        res.json({
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
});

router.post('/list', async (req, res, next) => {
    const database = global.database

    if (database) {
        const result = await database.models.Memo.findAll()

        if (result) {
            res.json({
                data: result,
                message: '메모 저장을 성공하였습니다.',
                error: false
            })
        } else {
            res.json({
                data: [],
                message: '메모 불러오기를 실패하였습니다.',
                error: true
            })
        }
    } else {
        res.json({
            data: [],
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
});

module.exports = router;
