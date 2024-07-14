import ihttp from "@/util/http-client"

export const userService = {
    getRole,
    listUser
}


function listUser() {
    return ihttp.get('/api/admin/users')
}
function getRole() {
    return ihttp.get('/api/roles/my-role')
}