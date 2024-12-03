import { RequestHandler } from 'express';
import User from '../models/users';
import Thought from '../models/thoughts';

// GET all users
export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find().populate('thoughts friends');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users', details: error });
    }
};

// GET single user by ID
export const getUserById: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user', details: error });
    }
};

// POST create new user
export const createUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', details: error });
    }
};

// PUT update user
export const updateUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error });
    }
};

// DELETE user and associated thoughts
export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error });
    }
};

// POST add friend
export const addFriend: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add friend', details: error });
    }
};

// DELETE remove friend
export const removeFriend: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove friend', details: error });
    }
};
