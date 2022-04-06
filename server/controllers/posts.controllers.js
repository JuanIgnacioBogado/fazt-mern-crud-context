import fs from 'fs-extra';
import Post from '../models/Post.js';
import {deleteImage, uploadImage} from '../libs/cloudinary.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch ({message}) {
        console.log(message);
        return res.status(500).json({message});
    }
};

export const createPost = async (req, res) => {
    try {
        const {title, description} = req.body;
        let image = {};
        if (req.files?.image) {
            const {secure_url, public_id} = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: secure_url,
                public_id
            };
        }

        const post = new Post({title, description, image});
        await post.save();
        res.json(post);
    } catch ({message}) {
        console.log('message', message);
        return res.status(500).json({message});
    }
};

export const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
        if (!post) return res.sendStatus(404);
        res.json(post);
    } catch ({message}) {
        console.log(message);
        return res.status(500).json({message});
    }
};

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) return res.sendStatus(404);

        if (post.image.public_id) {
            await deleteImage(post.image.public_id);
        }
        res.sendStatus(204);
    } catch ({message}) {
        console.log(error);
        return res.status(500).json({message});
    }
};

export const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) return res.sendStatus(404);
        res.json(post);
    } catch ({message}) {
        console.log(message);
        return res.status(500).json({message});
    }
};