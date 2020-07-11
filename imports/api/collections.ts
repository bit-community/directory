/**
 * Create a collections file and attach them to a method[defined in lowercase text]
 * This Document can extend Meteor.Collection using Classes and a Constructor to allow us create a Multi-Tenant Architecture
 * for our users, where collection__names would be derived from organization names and access specific dataTables
 * or their own Database Schema. Collections and Publications are the key to interacting with the Authorization layer
 * for Building out a multi tenant arch on top of Meteor & Meteor Mongo
 */

import { ITask, ProfileInterface, ITransaction } from 'imports/api/schema.d';
import { Mongo } from 'meteor/mongo';

export const Profile = new Mongo.Collection<ProfileInterface>('profile');

// == others ==
export const Tasks = new Mongo.Collection<ITask>('tasks');
export const Transactions = new Mongo.Collection<ITransaction>('transactions');
