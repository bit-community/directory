/**
 * This file will manage all the route config for the project and will map routes through the routes.tsx file
 * Where we can map a route according to name and use across all our pages to avoid breaks in route changes.
 */
const path = {
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
        resetPasswordRoute: '/auth/reset-password',
    },
};
export default path;
