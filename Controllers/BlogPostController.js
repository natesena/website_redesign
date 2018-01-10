//controllers require the model!
const   
    BlogPost = require('../Models/BlogPosts.js')

module.exports = {
    index: (req,res)=>{
        BlogPost.find({}, (err, BlogPosts)=>{
            console.log('Blog Post Index Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', BlogPosts})
        })
    },
    create: (req,res)=>{
        BlogPost.create(req.body, (err,BlogPost)=>{
            console.log('Blog Post Post Create Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', BlogPost})
        })
    }
}