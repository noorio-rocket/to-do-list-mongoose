//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemSchema = {
  name : String
};

const Item = mongoose.model("Item", itemSchema);


const item1 = new Item({
  name : "Eh el 7alawa de"
});

const item2 = new Item({
  name : "Eh el ta3ama de"
});

const item3 = new Item({
  name : "Mafeesh kda bsara7a"
});

const items = [item1,item2,item3];


app.get("/", function(req, res) {
Item.find({},(err,results)=>{
  if (results.length === 0)
  {
    Item.insertMany(items,(err)=>{
      if(err)
      {
        console.log(err)
      }
      else{
        console.log("Items added to the database");
      }
  });
  res.redirect('/');
  }
  else
  {
    results.forEach((item)=>{
      console.log(item.name);
    });
  }
  res.render("list", {listTitle: 'Today', newListItems: results});
});


});
// const day = date.getDate();
  

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
