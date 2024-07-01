import ihttp from "@/util/http-client"

export const notificationService = {
    getLatest
}

function getLatest() {
    return ihttp.get('/api/notifications/')
}