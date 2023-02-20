import express from "express";
import mongoose from "mongoose";

const port = process.env.PORT || 3001
const server = express()

server.use(express.json())

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected', () => {
    console.log('DB:CONNECTED')
    server.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
})