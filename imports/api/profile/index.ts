// import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { Profile } from '../collections'
import { ProfileInterface } from '/imports/api/schema'
import { noAuthError, evaluateAndExecute, isUser } from '../helpers/utils'

export function removeProfile(this: any, id: string): void {
  check(id, String)
  evaluateAndExecute(isUser(this.userId) && Profile.remove(id), noAuthError)
}

export function createProfile(this: any, obj: ProfileInterface) {
  check(obj, Object)

  // Make sure the user is logged in before inserting a task
  evaluateAndExecute(
    isUser(this.userId) &&
      Profile.insert({
        ...obj,
        owner: this.userId,
        createdAt: new Date(),
      }),
    noAuthError
  )
}
