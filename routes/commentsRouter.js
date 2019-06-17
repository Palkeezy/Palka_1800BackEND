const router = require('express').Router();

const addNewComment = require('../controllers/comments/addNewComment');
const deleteComment = require('../controllers/comments/deleteComment');
const getAllComments = require('../controllers/comments/getAllComments');

router.post('/:id', addNewComment);
router.delete('/:id', deleteComment);
router.get('/', getAllComments);

module.exports = router;

