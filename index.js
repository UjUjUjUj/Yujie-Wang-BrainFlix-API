const express = require('express')
const app =express()
const videosRoutes = require('./routes/videos')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/videos', videosRoutes)



const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`server listening on port${PORT}`);
})