const express = require('express')
const cors = require('cors')
const app = express()
const database = require('./database')
const dotenv = require('dotenv')
dotenv.config();
const router = require('./routes/index.routes')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port =  process.env.PORT|| 9090;


app.use('/api', router)

database()
    .then(() => {
       console.log("Connected to MongoDB Database") 
       app.listen(port, () =>{
   
         console.log(`Server started on port ${port}`)
    })
    
    
}).catch((error) => {
    console.log('An error occured while connecting with the database')
})
    
    
module.exports = app;