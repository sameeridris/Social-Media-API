import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} from '../../controllers/userControllers';

const router = Router();

// User routes
router.route('/')
    .get(getAllUsers) // No overload error
    .post(createUser); // No overload error

router.route('/:id')
    .get(getUserById) // No overload error
    .put(updateUser) // No overload error
    .delete(deleteUser); // No overload error

// Friend routes
router.route('/:userId/friends/:friendId')
    .post(addFriend) // No overload error
    .delete(removeFriend); // No overload error

export default router;

