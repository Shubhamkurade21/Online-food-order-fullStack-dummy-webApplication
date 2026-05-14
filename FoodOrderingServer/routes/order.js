const express = require('express')

const pool = require('../db/pool')
const createResult = require('../utils/result')

const router = express.Router()

router.post('/', async (req, res) => {
    const uid = req.headers.uid
    const { total, items } = req.body
    const sql1 = 'INSERT INTO orders(uid,total) VALUES(?,?)'
    const sql2 = 'INSERT INTO orderdetails(oid,fid,qty) VALUES(?,?,?)'
    try {
        const data = await pool.query(sql1, [uid, total])
        const oid = data[0].insertId
        for (let i of items)
            await pool.query(sql2, [oid, i.fid, i.qty])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

router.get('/', async (req, res) => {
    const uid = req.headers.uid
    const sql = `SELECT oid,total,odate FROM orders WHERE uid = ?`
    try {
        const data = await pool.query(sql, [uid])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

module.exports = router