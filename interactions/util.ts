import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Interaction} from '../interactions/model';

type InteractionResponse = {
  user: string;
  freetContent: string;
  interaction_type: string;
  date: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Interaction object from the database into an object with
 * all information needed by the front end
 *
 * @param {HydratedDocument<Interaction>} interaction - an interaction
 * @returns {InteractionResponse} - The interaction object formatted for the frontend
 */
const constructInteractionResponse = (interaction: HydratedDocument<Interaction>): InteractionResponse => {
  const interactionCopy: Interaction = {
    ...interaction.toObject({
      versionKey: false
    })
  };

  return {
    user: interaction.user.username,
    freetContent: interaction.freet.content,
    interaction_type: interaction.interaction,
    date: formatDate(interaction.date)
  };
};

export {
  constructInteractionResponse
};

