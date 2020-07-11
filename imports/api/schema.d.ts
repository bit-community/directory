import { Meteor } from 'meteor/meteor';
/**
 * Write Schema for Pulse and pulse related models
 * These are Typescript interfaces are intend to relay the expected collection schema in meteor
 */

// ========= SUB COLLECTIONS FOR SCHEMA DENORMALIZATION ===============================================

export interface ICommsChannel {
	_id: string;
	name: string;
	medium: string;
	logo?: string;
	createdAt: Date;
	lastUpdated: Date;
	gateway?: string; // This could be the api endpoint or any auth parameter for users, the question mark means it can be optional
}

export interface IGuarantor {
	_id: string;
	_pk: string;
	email: string;
	address: string;
	phone: string;
	createdAt: Date;
	lastUpdated: Date;
}

export interface ICurrency {
	code: 'GHC' | 'NGN' | 'USD'; //can be Enum
	symbol: string;
	name: string;
}

export interface ILocation {
	country: string;
	countryCode: string;
	state: string;
	stateCode: string;
	address?: string;
	currency: ICurrency;
}

// ========================================== END NORMALIZATION TABLE ================================

export interface ICustomer {
	_id: string;
	_pk: string;
	name: string;
	email: string;
	altEmail?: string;
	phone: string;
	altPhone?: number;
	address: string;
	inDebt: boolean;
	createdAt: Date;
	lastUpdated: Date;
	guarantor: Array<IGuarantor>;
}

export interface ProfileInterface {
	fullName: string;
	emailAddress: string;
	countryOfResidence: string;
	cityOrState: string;
	profilePhoto: string;
	professionalTitle: string;
	professionalBio: string;
	yearsOfExperience: string;
	skills: string[];
	websiteUrl: string;
	instagramProfile: string;
	twitterProfile: string;
	facebookProfile: string;
	projects: string[];
	mentorshipConsent: boolean;
	waiverOfLiability: boolean;
	createdAt: Date;
	owner: string | undefined;
	username: string | undefined;
}

/**
 * Interface for the Users Profile
 */

export interface IUser {
	_id: string;
	email: string;
	phone: string;
	name: string;
	verified: boolean;
	createdAt: Date;
	lastUpdated: Date;
	countryCode: string;
	currencyCode: string;
	profile: {
		workspace: {
			_id: string;
			name: string;
			type: 'organization' | 'individual';
		};
		location: ILocation;
		organization: {
			name: string;
			country: string;
			address: string;
			state: string;
			currency: ICurrency;
		};
		subscription: {
			type: string; // preferably an ENUM will be used here
			_pk: string; // the subscription PK is a unique identifier, we may stick to ID
		};
		wallet: {
			balance: string;
			cleared: boolean;
			lastUpdated: Date;
		};
	};
}

export interface ITask {
	_id?: string;
	text: string;
	createdAt: Date;
	owner: string;
	ownerName: string;
}

/**
 * These interfaces would manage the models that align with the record feature
 */

export interface ITransaction {
	_id: string;
	currency: ICurrency;
	createdAt: Date;
	owner: Meteor.User | undefined;
	customerId: string;
	userId: string;
}

export interface IPaymentPlan {
	_id: string;
}
export interface IAgreementPlan {
	_id: string;
}

export interface IAgreementTemplate extends IAgreementPlan {
	createdAt: Date;
	lastUpdated: Date;
}

export interface IPaymentTemplate extends IPaymentPlan {
	createdAt: Date;
	lastUpdated: Date;
}
