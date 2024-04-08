const router = require('express').Router();
// Import the blog model from the models folder
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// If a POST request is made to /api/blogs, a new blog is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/blogs/:id, that blog is deleted. 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
