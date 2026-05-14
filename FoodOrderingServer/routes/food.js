const fs = require('fs/promises')
const express = require('express')
const multer = require('multer')

const createResult = require('../utils/result')
const pool = require('../db/pool')

const router = express.Router()
const upload = multer({ dest: 'images' })

router.get('/menu', async (req, res) => {
    const sql = `SELECT * FROM food`
    try {
        const data = await pool.query(sql)
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})

// add a food item
router.post('/', upload.single('image'), async (req, res) => {
    const { name, description, price } = req.body
    const file = req.file
    const sql = `INSERT INTO food(name,description,price,image) VALUES(?,?,?,?)`
    try {
        await fs.rename(file.path, 'images/' + file.originalname)
        const data = await pool.query(sql, [name, description, price, file.originalname])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }

})

// update the food item
router.put('/', (req, res) => {

})

// delete the food item
router.delete('/:fid', (req, res) => {

})


module.exports = router