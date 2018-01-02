var express = require('express');
var router = express.Router();

const list = []

/* post users listing. */
router.post('/save', async (req, res, next) => {
    const database = global.database
    const { title, description, no } = req.body

    if (database) {
        let result = null
        const { models } = database

        if (no === -1) {
            const Memo = models.Memo({
                title, description
            })
    
            result = await Memo.save()
        } else {
            const query = { no }

            result = await models.Memo.update(query, {
                title, 
                description,
                updated_at: new Date()
            })
        }

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

router.post('/delete', async (req, res, next) => {
    const { no } = req.body
    const database = global.database

    if (database) {
        let result = null
        const { models } = database

        if (no === -1) {
            result = await models.Memo.remove()
        } else {
            const query = { no }

            result = await models.Memo.update(query, {
                del: true,
                deleted_at: new Date()
            })
        }

        if (result) {
            res.json({
                message: '메모 삭제를 성공하였습니다.',
                error: false
            })
        } else {
            res.json({
                message: '메모 삭제를 실패하였습니다.',
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
