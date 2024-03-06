const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

router.put('/like/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const { userId } = req.body;
      const post = await Post.findById(postId);
      let updatedLikes;
      if (post.likes.includes(userId)) {
        updatedLikes = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
      } else {
        updatedLikes = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true });
      }
      res.status(200).json(updatedLikes);
    } catch (error) {
      console.error("Error updating likes:", error);
      res.status(500).json({ error: "Failed to update likes" });
    }
  });

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       console.log(req);
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/", async (req, res) => {
    const { search } = req.query;
  
    try {
      const searchFilter = search
        ? { title: { $regex: search, $options: "i" } }
        : {};
  
      const posts = await Post.find(searchFilter);
        console.log(posts)
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/filter', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5; // Default limit is 10 if not specified
      const startIndex = parseInt(req.query.startIndex) || 0; // Default startIndex is 0 if not specified
  
      const data = await Post.find().skip(startIndex).limit(limit).toArray();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router