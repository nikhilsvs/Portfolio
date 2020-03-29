const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

const dotenv=require("dotenv");
dotenv.config();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect(process.env.MONGO_URI,
                {useNewUrlParser:true,
                 useUnifiedTopology:true})
                .then(()=>console.log("DB Connected"));

mongoose.connection.on("error",err=>{
    
    console.log("Error Occured");
});
var message=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    desc:String
    
});

var msg=mongoose.model("msg",message);


app.get("/",function(req,res){
    res.render("landing");
});
app.get("/info",function(req,res){
    res.render("KnowMore");
});
app.post("/new",function(req,res){
     msg.create(req.body.message,function(err,newmsg){
        
        if(err){
            console.log("Error occured");
        }
        else{
            res.redirect("/info#contact");
            console.log(newmsg);
        }
    });
});
app.listen(process.env.PORT,process.env.IP);
/*process.env.PORT,process.env.IP-->*/