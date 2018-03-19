var mongoose = require("mongoose");

var commentSchema = mongoose.schema({
	text: String,
	author: String
});

module.exports = mongoose.model("Comment", commentSchema);