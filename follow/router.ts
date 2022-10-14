import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';
import UserCollection from 'user/collection';

const router = express.Router();

/**
 * Get all the users that the user follows
 *
 * @name GET /api/follow
 *
 * @return {FollowResponse[]} - An array of users that are followed by the user with userID
 * @throws {403} - if user is not logged in
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const following = await FollowCollection.findAllFollowing(userId);
    const response = following.map(util.constructFollowResponse);
    res.status(200).json({
      message: 'Here are the users you follow',
      follower: response
    });
  }
);

/**
 * Get all the users that follow the user
 *
 * @name GET /api/follow/followers
 *
 * @return {FollowResponse[]} - an array of user that are following the user
 * @throws {403} - if user is not logged in
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const followers = await FollowCollection.findAllFollowers(userId);
    const response = followers.map(util.constructFollowResponse);
    res.status(200).json({
      message: 'Here are your followers',
      follower: response
    });
  }
);

/**
 * Create a following between users
 *
 * @name POST /api/follow
 *
 * @param {string} user - username of user that will be followed
 * @return {FollowResponse} - The created following
 * @throws {404} - if user is not an exisiting username
 * @throws {403} - if user is not logged in
 * @throws {413} - if the session user already follows user
 *
 */
router.post(
  '/',
  [
    userValidator.isValidUsername,
    followValidator.isAlreadyFollow,
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const targetUser = await UserCollection.findOneByUsername(req.body.user);
    const newFollow = await FollowCollection.follow(targetUser.id, userId);

    res.status(201).json({
      message: `You are now following ${req.body.user as string}`,
      follow: util.constructFollowResponse(newFollow)
    });
  }
);

/**
 * Delete a following between users
 *
 * @name DELETE /api/follow
 *
 * @param {string} user - username of user that will be unfollowing
 * @return {string} - A success message
 * @throws {404} - if user is not an exisiting username
 * @throws {413} - if the session user does not follow the user
 * @throws {403} - if user is not logged in
 *
 */
router.delete(
  '/',
  [
    userValidator.isValidUsername,
    followValidator.isAlreadyUnfollow,
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const targetUser = await UserCollection.findOneByUsername(req.body.user);
    const newFollow = await FollowCollection.unfollow(targetUser.id, userId);

    res.status(201).json({
      message: `You have unfollowed ${req.body.user as string}`
    });
  }
);
