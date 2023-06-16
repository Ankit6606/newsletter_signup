const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { error } = require("console");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));  //Static is used to include the CSS and images file attached to the HTML page 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.ename;
    const data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                } 
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url =  "https://us21.api.mailchimp.com/3.0/lists/ff0f8ad853";
    const options = {
        method:"POST",
        auth: "firewall53:583be14d0eef08a5220ae751481cf1e6-us21"
    }
    const request = https.request(url,options,function(response){
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
        res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })

    })
    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT||3000,function(req,res){
    console.log("Server is running at port 3000");
})

// API key
// 583be14d0eef08a5220ae751481cf1e6-us21
// list id
// ff0f8ad853 