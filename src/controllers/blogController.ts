import { Request, Response, NextFunction } from 'express';
import { Blog } from '../models/blogModel';

// POST/api/blogs

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, author } = req.body as {title: string; content: string; author: string;};

        if (!title || title.trim().length === 0 ) {
            res.status(403).json({message: 'Title cannot be empty'})
        };

        if (!content || content.trim().length === 0 ) {
            res.status(403).json({message: 'Content cannot be empty'})
        };

        if (!author || author.trim().length === 0) {
            res.status(403).json({message: 'Author name cannot be blank'})
        };


        // create new blog post
        const blog = await Blog.create({ title, content, author });

        // return created blog post with a 201 created status
        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
};

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1}).limit(10);
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try  {
        const id: string = req.params.id;
         
        // delete post
        const deletedblog = await Blog.findByIdAndDelete(id);

        if (!deletedblog) {
            res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const updateData = req.body;

        // update post
        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBlog) {
            res.status(404).json({ message: 'Blog not found'});
    }

        res.status(200).json({ message: 'Blog updated successfully', updatedBlog});
    } catch (error) {
        next(error)
    }
};
