var express 	= require("express"),
	app     	= express(),
	bodyParser  = require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment    	= require("./models/comment"),
	seeDB 		= require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/",function(res, res){
	res.render("landing");
});

//Index show all campgrounds
app.get("/campgrounds",function(req,res){
	//get all campground from DB
	campground.find({}, function(err, allCampgrounds){
		if(){
			console.log(err);
		}else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

//create - add new campground to DB
app.post("/campgrounds", function(req, res){
	//get data from and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampGround = {name: name, image: image, description: desc}
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//new - show from to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

//show - shows more info about one campground
app.get("/campgrounds/: id", function(req, res){
	// find the campground woth provided ID
	CampgroundfindById(req.param.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else {
			console.log(foundCampground)
			//render show template with that campground
			res.render("campground/show", {campground: foundCampground});
		}
	});
});

//================
//COMMENTS ROUTES
//================

app.get("campgrounds/: id/comments/new", function(req, res){
	//find campground by id 
	Campground.findById(req.param.id, function(err, campground){
		if(err){
			console.log(err);
		}else {
			res.render("comments/new", {campground: campground});
		}
	})
});


app.post("/campground/:id/comments", function(req,res){
	//lookup campground using ID
	campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect(/campgrounds);
		}else {
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err);
				}else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campground' + campground._id);
				}
			});
		}
	});
});

//create new comment
//connect ne commetn to campground
//redirect campground show page

app.listen(process.envPORT, process.env.IP, function(){
	console.log("The YelpCamp server has started");
});