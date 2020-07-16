/**
 * Workspace middleware copied from the wekan repository
 * methods like (hasAdmin) look like hooks in a Mongo Collection. Check back at the repository for reference
 */
export const allowIsWorkspaceAdmin = function (userId, workspace) {
    return workspace && workspace.hasAdmin(userId);
};
export const allowIsWorkspaceMember = function (userId, workspace) {
    return workspace && workspace.hasMember(userId);
};
// export const allowIsAnyWorkspaceMember = function(userId, workspaces) {
// 	return _.some(workspaces, (workspace) => {
// 		return workspace && workspace.hasMember(userId);
// 	});
// };
export const allowIsWorkspaceMemberCommentOnly = function (userId, workspace) {
    return workspace && workspace.hasMember(userId) && !workspace.hasCommentOnly(userId);
};
export const allowIsWorkspaceMemberNoComments = function (userId, workspace) {
    return workspace && workspace.hasMember(userId) && !workspace.hasNoComments(userId);
};
export const allowIsWorkspaceMemberByCard = function (userId, card) {
    const workspace = card.workspace();
    return workspace && workspace.hasMember(userId);
};
