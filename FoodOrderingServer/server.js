const express = require('express')
const cors = require('cors')

//routes
const userRouter = require('./routes/user')
const foodRouter = require('./routes/food')
const orderRouter = require('./routes/order')

//authorization
const authUser = require('./utils/auth')

const app = express()

//middlewares
app.use('/foodImage', express.static('images'))
app.use(cors())
app.use(express.json())
app.use(authUser)
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/order', orderRouter)


app.listen(4000, '127.0.0.1', () => {
    console.log('server started at port 4000')
})