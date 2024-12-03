import Thought from '../models/thoughts';
import User from '../models/users';
// GET all thoughts
export const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.status(200).json(thoughts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve thoughts', details: error });
    }
};
// GET a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve thought', details: error });
    }
};
// POST create a new thought
export const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = await Thought.create({ thoughtText, username });
        await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create thought', details: error });
    }
};
// PUT update a thought
export const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update thought', details: error });
    }
};
// DELETE remove a thought
export const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        await User.updateMany({ thoughts: req.params.id }, { $pull: { thoughts: req.params.id } });
        res.status(200).json({ message: 'Thought deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete thought', details: error });
    }
};
// POST add reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add reaction', details: error });
    }
};
// DELETE remove a reaction
export const removeReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.status(200).json(updatedThought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove reaction', details: error });
    }
};
