const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../db/pool')
const createResult = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body
    const sql = `INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)`
    try {
        const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS)
        const data = await pool.query(sql, [name, email, hashedPassword, phone])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const sql = `SELECT * FROM users WHERE email = ?`
    try {
        const data = await pool.query(sql, [email])
        const sql_data = data[0][0]
        if (sql_data) {
            const status = await bcrypt.compare(password, sql_data.password)
            if (status) {
                const payload = {
                    uid: sql_data.uid,
                }
                const token = jwt.sign(payload, config.SECRET)

                const user = {
                    token,
                    phone: sql_data.phone
                }
                res.send(createResult(user))
            }
            else
                res.send(createResult(null, 'Invalid Password'))
        } else
            res.send(createResult(null, 'Invalid Email'))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

router.get('/', async (req, res) => {
    const uid = req.headers.uid
    const sql = `SELECT name,email,phone FROM users WHERE uid = ?`
    try {
        const data = await pool.query(sql, [uid])
        res.send(createResult(data[0][0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

router.put('/', async (req, res) => {
    const { phone } = req.body
    const uid = req.headers.uid
    const sql = `UPDATE users SET phone = ? WHERE uid = ?`
    try {
        const data = await pool.query(sql, [phone, uid])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

router.delete('/', async (req, res) => {
    const uid = req.headers.uid
    const sql = `DELETE FROM users WHERE uid = ?`
    try {
        const data = await pool.query(sql, [uid])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

module.exports = router