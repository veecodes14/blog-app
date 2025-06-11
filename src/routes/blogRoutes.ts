import { createBlog } from '../controllers/blogController';
import { getAllBlogs } from '../controllers/blogController';
import { deleteBlog } from '../controllers/blogController';
import { updateBlog } from '../controllers/blogController';
import express from 'express';

const router = express.Router();

// routes

router.post('/', createBlog);

router.get('/', getAllBlogs);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);



export default router;