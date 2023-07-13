const express = require("express");
const { getWeatherDetails } = require("./controllers/getWeatherDetails");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv")
app.use(express.json());
dotenv.config()

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running..")
})

app.post('/getWeather', getWeatherDetails)

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log("Hey App has started Listening")
})