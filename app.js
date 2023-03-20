const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require  ("https");

const app = express(); 
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email

    const data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]};

    const jsonData = JSON.stringify(data);   
    const url = "https://us21.api.mailchimp.com/3.0/lists/2cfe1acd49";

    const options = {
        method: "post",
        auth: "mdasfaan:07a913be3fb38040d05bbfccd640936a-us21"
    }

    const request = https.request(url, options, (responce) => {
        
    if (responce.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

        responce.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on Port 3000")
});



// Mailchimp Api Key
// 9817bf159cffbb9f9907a2c3426083b3-us21

// Customer ID
// 2cfe1acd49
