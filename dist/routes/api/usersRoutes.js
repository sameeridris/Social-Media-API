import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/userControllers';
const usersRouter = Router();
// User routes
usersRouter.route('/')
    .get(getAllUsers) // No overload error
    .post(createUser); // No overload error
usersRouter.route('/:id')
    .get(getUserById) // No overload error
    .put(updateUser) // No overload error
    .delete(deleteUser); // No overload error
// Friend routes
usersRouter.route('/:userId/friends/:friendId')
    .post(addFriend) // No overload error
    .delete(removeFriend); // No overload error
export default usersRouter;
