import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from 'user/collection';
import FollowCollection from '../follow/collection';

/**
 * Checks if a user with userA already follows another user UserB in req.params
 */
const isAlreadyFollow = async (req: Request, res: Response, next: NextFunction) => {
  const validUser = Types.ObjectId.isValid(req.session.userId);
  const user = await UserCollection.findOneByUserId(req.session.userId);
  const target = await UserCollection.findOneByUsername(req.body.user);
  const validTarget = Types.ObjectId.isValid(target.id);
  const relationship = (validUser && validTarget) ? await FollowCollection.findOne(target.id, user.id) : '';
  if (!target) {
    res.status(404).json({
      error: {
        userDoesNotExist: 'The user you are trying to follow does not exist.'
      }
    });
    return;
  }

  if (relationship) {
    res.status(413).json({
      error: {
        alreadyFollow: 'You already follow this user.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a user with userA already follows another user UserB in req.params
 */
const isAlreadyUnfollow = async (req: Request, res: Response, next: NextFunction) => {
  const validUser = Types.ObjectId.isValid(req.session.userId);
  const user = await UserCollection.findOneByUserId(req.session.userId);
  const target = await UserCollection.findOneByUsername(req.body.user);
  const validTarget = Types.ObjectId.isValid(target.id);
  const relationship = (validUser && validTarget) ? await FollowCollection.findOne(target.id, user.id) : '';

  if (!validTarget) {
    res.status(404).json({
      error: {
        userDoesNotExist: 'The user you are trying to unfollow does not exist.'
      }
    });
    return;
  }

  if (!relationship) {
    res.status(413).json({
      error: {
        alreadyUnfollow: 'You do not follow this user.'
      }
    });
    return;
  }

  next();
};

export {
  isAlreadyFollow,
  isAlreadyUnfollow
};
