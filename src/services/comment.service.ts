import ihttp from "@/util/http-client"

export const commentService = {
    getCommentsByLevel,
    postComment
}

function getCommentsByLevel(level_id: string) {
    return ihttp.get(`/api/comments/document-level/${level_id}`)
}
function postComment({
    documentLevelId,
    content
}: any) {
    return ihttp.post(`/api/comments?documentLevelId=${documentLevelId}&content=${content}`)
}