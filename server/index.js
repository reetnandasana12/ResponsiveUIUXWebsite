
const express = require("express");
const app = express();
const PORT = 6006
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.get("/", cors(), (req, res) => {
    console.log("you are in default");
    res.send(user);
});

app.use(
    cors({
        origin: true,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

const user = []


app.post("/register", (req, res) => {    
    console.log(req.body)
    user.push({id:(user.length+1),...req.body})
    res.send(user);
});

app.get("/isLogin", (req, res) => {
    console.log(req)
    console.log("1")   
     console.log(req.body)
    console.log("2")
    const data = user.find(req.body)
    console.log("3")

    res.send(data);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});