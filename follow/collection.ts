import type {HydratedDocument, Types} from 'mongoose';
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
  static async follow(followingID: Types.ObjectId, followerID: Types.ObjectId): Promise<HydratedDocument<Follow>> {
    const new_follow = new FollowModel({
      toFollow: followingID,
      follower: followerID
    });
    await new_follow.save();
    return new_follow.populate('toFollow', 'follower');
  }

  /**
   * Unfollow another user
   *
   * @param {string} followingID - the id of the user that the user wants to unfollow
   * @param {string} followerID - the id of the user
   * @return {Promise<HydratedDocument<Follow>>} - The removed following
   */
  static async unfollow(followingID: Types.ObjectId, followerID: Types.ObjectId): Promise<boolean> {
    const result = await FollowModel.deleteOne({toFollow: followingID, follower: followerID});
    return result !== null;
  }

  /**
   * Gets all the users that the user is following in the database
   * 
   * @param 
   */
}

export default FollowCollection;