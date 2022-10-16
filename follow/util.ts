import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Follow} from '../follow/model';

type FollowResponse = {
  toFollow: string;
  follower: string;
};

/**
 * Transform a raw Follow object from the database into an object with all the
 * information needed by the frontend
 *
 * @param {HydratedDocument<Follow>} follow - A following relationship
 * @returns {FollowResponse} - The follow object formatted for the front end
 */
const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
  const followCopy: Follow = {
    ...follow.toObject({
      versionKey: false
    })
  };
  // console.log(followCopy.toFollow.username);
  return {
    toFollow: followCopy.toFollow.username,
    follower: followCopy.follower.username
  };
};

export {
  constructFollowResponse
};
