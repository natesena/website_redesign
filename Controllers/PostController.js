//controllers require the model!
const   
    Post = require('../Models/Posts.js')

module.exports = {
    index: (req,res)=>{
        Post.find(req.query , (err, Posts)=>{
            console.log('Blog Post Index Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Posts})
        })
    },
    create: (req,res)=>{
        Post.create(req.body, (err,newpost)=>{
            console.log('Post Post Create Route Hit')
            console.log("req.body: ", req.body)
            if(err){
                console.log("err: ", err)
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', newpost})
        })
    },
    show: (req,res)=>{
        Post.findById(req.params.id, (err, Post)=>{
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    },
    delete: (req,res)=>{
        Post.findByIdAndRemove(req.params.id, (err,Post)=>{
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    }
}