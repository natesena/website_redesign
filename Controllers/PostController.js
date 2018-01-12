//controllers require the model!
const   
    Post = require('../Models/Posts.js')

module.exports = {
    index: (req,res)=>{
       Post.find({}, (err, Posts)=>{
            console.log('Blog Post Index Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Posts})
        })
    },
    create: (req,res)=>{
        Post.create(req.body, (err,Post)=>{
            console.log('Post Post Create Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    },
    show: (req,res)=>{
        Post.findById(req.params.id, (err, Post)=>{
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    }
}