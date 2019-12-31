const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser({ extended: true }));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/004a8a625f",
    method: "POST",
    headers: {
      Authorization: "nikhilsk 561a40f35fdfa4bb16c4f4ed6d4dc67d-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/faliure.html");
    } else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else {
        res.sendFile(__dirname + "/faliure.html");
      }
    }
  });
});

app.post("/faliure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});

// 561a40f35fdfa4bb16c4f4ed6d4dc67d-us4

// 004a8a625f
