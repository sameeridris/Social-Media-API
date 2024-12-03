import { Request, Response } from 'express';
import User from '../models/users';
import Thought from '../models/thoughts';

// GET all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts friends');
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST create new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// PUT update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE user and associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST add friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};
