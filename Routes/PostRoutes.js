const
    PostCTRL = require('../Controllers/PostController.js')
    express = require('express')
    PostRouter = new express.Router()

PostRouter.route('/')
    .get(PostCTRL.index)
    .post(PostCTRL.create)

    // added below
PostRouter.route('/:id')
    .get(PostCTRL.show)
    .patch(PostCTRL.edit)
    .delete(PostCTRL.delete)

module.exports = PostRouter