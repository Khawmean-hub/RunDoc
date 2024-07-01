import ihttp from "@/util/http-client"

export const userService = {
    getRole
}


function getRole() {
    return ihttp.get('/api/roles/my-role')
}