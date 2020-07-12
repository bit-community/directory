// import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profile } from '../collections';
import { ProfileInterface } from '/imports/api/schema';
import { noAuthError, evaluateAndExecute, isUser, isTaskOwner } from '../helpers/task-utils';

export function removeProfile(this: any, id: string): void {
	check(id, String);
	evaluateAndExecute(isTaskOwner(id)(this.userId) && Profile.remove(id), noAuthError);
}

export function createProfile(this: any, obj: ProfileInterface) {
	check(obj, Object);
	let skillsArr = [];
	skillsArr.push(obj.skills);

	// Make sure the user is logged in before inserting a task
	evaluateAndExecute(
		isUser(this.userId) &&
			Profile.insert({
				...obj,
				skills: skillsArr,
				owner: this.userId,
				createdAt: new Date()
			}),
		noAuthError
	);
}
