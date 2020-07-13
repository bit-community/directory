/**
 * A Method File will import a defined Named Function and attach it to a method. Example the Function insertTask is exported from tasks and
 * attached to a *task.insert* method so that all of task.insert will take arguments and results as defined by insertTask.
 *
 * The Method document handles the naming, and so this is where lowercase method names are created and used on the
 * client service to invoke the function used by that method.
 */

import { Meteor } from 'meteor/meteor';
import { createProfile, removeProfile } from './profile';

// Methods for Customer Collection
const profiles = {
  'profile.insert': createProfile,
  'profile.remove': removeProfile,
};

// Destructure methods into the Meteor Method
Meteor.methods({
  ...profiles,
});
