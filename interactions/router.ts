import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import InteractionCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as interactionValidator from '../interactions/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all of the posts that the current session user has interacted with
 *
 * @name GET /api/interactions
 *
 * @return {InteractionResponse[]} - An array of interactions created by the current session user
 * @throws {403} - if the user is not logged in
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const interactions = await InteractionCollection.getInteractions(userId);
    const response = interactions.map(util.constructInteractionResponse);
    res.status(200).json({
      message: 'Here are your interactions',
      result: response
    });
  }
);

/**
 * Creates a new interaction
 *
 * @name POST /api/interactions
 *
 * @param {string} freetId - the id of the freet to interact with
 * @param {string} interaction_type - the type of interaction
 * @return {InteractionResponse} - The created interaction object
 * @throws {403} - if the user is not logged in
 * @throws {400} - if the freet does not exist
 * @throws {401} - if the interaction not valid/allowed interaction
 * @throws {413} - if the user has already interacted with this post
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExistsBody,
    interactionValidator.isValidInteraction,
    interactionValidator.isInteractionDoesNotExist
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    console.log(userId);
    const interaction = await InteractionCollection.addInteraction(req.body.interaction_type, req.body.freetId, userId);

    res.status(201).json({
      message: 'You have added your interaction!',
      output: util.constructInteractionResponse(interaction)
    });
  }
);

/**
 * Updates an interaction
 *
 * @name PUT /api/interactions
 *
 * @param {string} freetId - the id of the freet to interact with
 * @param {string} interaction_type - the type of interaction
 * @return {InteractionResponse} - The created interaction object
 * @throws {403} - if the user is not logged in
 * @throws {400} - if the freet does not exist
 * @throws {401} - if the interaction not valid/allowed interaction
 * @throws {413} - if the user has not interacted with this post
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExistsBody,
    interactionValidator.isValidInteraction,
    interactionValidator.isAlreadyExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const interaction = await InteractionCollection.changeInteraction(req.body.interaction_type, req.body.freetId, userId);

    res.status(201).json({
      message: 'You have updated your interaction',
      output: util.constructInteractionResponse(interaction)
    });
  }
);

/**
 * Deletes an interaction
 *
 * @name DELETE api/interactions
 *
 * @param {string} freetId - the id of the freet to interact with
 * @return {string} - A success message
 * @throws {403} - if the user is not logged in
 * @throws {400} - if the freet does not exist
 * @throws {413} - if the user has not interacted with this post
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExistsBody,
    interactionValidator.canDelete
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const interaction = await InteractionCollection.deleteInteraction(req.body.freetId, userId);

    res.status(201).json({
      message: 'You have deleted your interaction'
    });
  }
);

export {router as interactionRouter};
