// I think this might be redundant- unless router files are supposed to also break down into components at different "fork" points in the path
//either way I've set  this up and put it to work in clothing items for the time being until told otherwise
//e.g. "/items" is considered one branch or "node," while "items/.../likes" is considered a novel endpoint or node
//the below probably works and is definitely a pattern for if/when routing becomes MUCH more complicated
//I dunno man

const router = require("express").Router();

const { addLike, removeLike } = require("../controllers/likes");

router.put("/items/:itemId/likes", addLike);

router.delete("/items/:itemId/likes", removeLike);

module.exports = router;
