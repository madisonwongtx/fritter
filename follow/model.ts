import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Follow = {
  toFollow: string; // Username of the user to follow
  follower: string; // Username of the user
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowSchema = new Schema({
  // The user's username
  toFollow: {
    type: String,
    required: true,
    ref: 'User'
  },
  follower: {
    type: String,
    required: true,
    ref: 'User'
  }
});

const FollowModel = model<Follow>('Follow', FollowSchema);
export default FollowModel;

