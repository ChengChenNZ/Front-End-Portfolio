var express = reqiure("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyParser = reqiure("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride = require("methodOverride");

mongoose.connect("mongoodb://localhost/blog_app");
app.use(bodyParser.urlencoded({extende: true}));
app.use(expressSanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

var blogSchema = new mongoose.blogSchema({
	title: String,
	body: String,
	image: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else {
			res.render("index", {blogs: []});
		}
	})
});

app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitizer(req.body.blog.body);
	var formData = req.body.blog;
	Blog.create(formData, function(err, newBlog){
		console.log(newBlog);
		if(err){
			res.render("new");
		}else {
			res.redirect(".blogs");
		}
	});
});


app.get("/blogs/:id", function(req, res){
	Blog.findById(req.param.id, function(err, blog){
		if(err){
			res.redirect("/");
		}else {
			res.render("show", {blog: blog});
		}
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.param.id, function(err, blog){
		if(err){
			console.log(err);
			res.redirect("/");
		}else {
			res.render("edit", {blog: blog});
		}
	});
});

app.put("/blogs/:id", function(req,res){
	Blog.findByIdAndUpdate(req.param.id, req.body.blog, function(err,blog){
		if(err){
			console.blog(err);
		}else {
			var showUrl = "/blogs/" + blog._id;
			res.redirect(showUrl);
		}
	});
});

app.delete("/blogs/:id", function(req, res){
	Blog.findById(req.param.id, function(err, blog){
	if(err){
		console.log(err);
	}else {
		blog.remove();
		res.redirect("/blogs");
	}	
	});
});

app.listen(process.env.PORT, process.env.IP);







