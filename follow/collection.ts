import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import type {Follow} from './model';
import FollowModel from './model';

class FollowCollection {
  /**
   * Follow another user
   *
   * @param {string} followingID - the id of the user that the user wants to follow
   * @param {string} followerID - the id of the user
   * @return {Promise<HydratedDocument<Follow>>} - The new following
   */
  static async follow(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const targetFollow = await UserCollection.findOneByUserId(followingID);
    const user = await UserCollection.findOneByUserId(followerID);
    const new_follow = new FollowModel({
      toFollow: targetFollow,
      follower: user
    });
    await new_follow.save();
    return new_follow;
  }

  /**
   * Unfollow another user
   *
   * @param {string} followingID - the id of the user that the user wants to unfollow
   * @param {string} followerID - the id of the user
   * @return {Promise<Boolean>} - true if the following relationship has been deleted, false otherwise
   */
  static async unfollow(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<boolean> {
    const targetUnfollow = await UserCollection.findOneByUserId(followingID);
    const user = await UserCollection.findOneByUserId(followerID);
    const result = await FollowModel.deleteOne({toFollow: targetUnfollow, follower: user});
    return result !== null;
  }

  /**
   * Gets all the users that the user is following in the database
   *
   * @param {string} userId - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that the user is following
   */
  static async findAllFollowing(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId); // Finds user object
    return FollowModel.find({follower: user}).populate('toFollow');
  }

  /**
   * Gets all the users that are following the user in the database
   *
   * @param {string} userId - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that follows the user
   */
  static async findAllFollowers(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId);
    return FollowModel.find({toFollow: user}).populate('follower');
  }

  /**
   * Gets the following pair
   *
   * @param {string} followingID - the id of the user that the user wants to unfollow
   * @param {string} followerID - the id of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all the users that hte user is following
   */
  static async findOne(followingID: Types.ObjectId | string, followerID: Types.ObjectId | string): Promise<HydratedDocument<Follow>> | undefined {
    const user = await UserCollection.findOneByUserId(followerID);
    const following = await UserCollection.findOneByUserId(followingID);
    return FollowModel.findOne({toFollow: following, follower: user});
  }
}

export default FollowCollection;
