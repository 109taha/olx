const cors = require('cors')
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//cors 
app.use(cors({
    origin: '*'
}))

const route = require("./routers/allRouters")
// Use the router middleware
app.use('/', route);



// connect mongodb
const connectToMongoDB = require("./mongoose_connect/mongoose_connect");
connectToMongoDB();

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
});