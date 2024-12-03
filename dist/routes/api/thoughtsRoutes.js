import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction, } from '../../controllers/thoughtControllers';
const thoughtsRouter = Router();
// Thought routes
thoughtsRouter.route('/')
    .get(getAllThoughts)
    .post(createThought);
thoughtsRouter.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
// Reaction routes
thoughtsRouter.route('/:thoughtId/reactions')
    .post(addReaction);
thoughtsRouter.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);
export default thoughtsRouter;
