// import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profile } from '../collections';
import { noAuthError, evaluateAndExecute, isUser } from '../helpers/utils';
export function removeProfile(id) {
    check(id, String);
    evaluateAndExecute(isUser(this.userId) && Profile.remove(id), noAuthError);
}
export function createProfile(obj) {
    check(obj, Object);
    let skillsArr = [];
    skillsArr.push(obj.skills);
    // Make sure the user is logged in before inserting a task
    evaluateAndExecute(isUser(this.userId) &&
        Profile.insert({
            ...obj,
            skills: skillsArr,
            owner: this.userId,
            createdAt: new Date(),
        }), noAuthError);
}
