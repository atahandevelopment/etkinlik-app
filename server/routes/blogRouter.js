import express from 'express';
import Blog from '../Models/Blog.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const blogData = req.body;
        const createBlog = await Blog.create(blogData);
        return res.status(201).json({success: true, data: createBlog});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({success: true, data: blogs});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = req.body;
        const editedBlog = await Blog.findByIdAndUpdate({_id: id}, blogData);
        return res.status(200).json({success: true, data: editedBlog});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete({_id: id});
        return res.status(200).json({success: true, data: deletedBlog});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


export default router;