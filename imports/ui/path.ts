/**
 * This file will manage all the route config for the project and will map routes through the routes.tsx file
 * Where we can map a route according to name and use across all our pages to avoid breaks in route changes.
 */

// To create a route 1. Create a Path here - 2. Link this path to a component in routes.tsx and use the path name everywhere

type TPath = string;

export interface IPath {
	root: TPath;
	wizard: TPath;
	onboarding: TPath;
	preview: TPath;
	profile: TPath;
	baddie: TPath;
	account: TPath;
	auth: {
		loginRoute: string;
		signupRoute: string;
		logoutRoute: string;
		resetPasswordRoute: string;
	};
	workspace?: {
		transaction: string;
		customerView: string;
		createCustomer: string;
		createTransaction: string;
	};
}

const path: IPath = {
	root: '/',
	wizard: '/wizard',
	onboarding: '/onboarding',
	preview: '/preview',
	profile: '/profile',
	account: '/account',
	baddie: '/baddie',
	auth: {
		loginRoute: '/auth/login',
		signupRoute: '/auth/signup',
		logoutRoute: '/auth/logout',
		resetPasswordRoute: '/auth/reset-password'
	}
	// workspace: {
	// 	transaction: '/transaction',
	// 	customerView: '/customer',
	// 	createCustomer: '/create-customer',
	// 	createTransaction: '/create-transaction'
	// }
};

export default path;
