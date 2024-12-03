import { Request, Response } from 'express';
import Thought from '../models/thoughts';
import User from '../models/users';

// GET all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST create new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// PUT update thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json({ message: 'Thought deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST add reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE remove reaction
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};
