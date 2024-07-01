import ihttp from "@/util/http-client"

export const fcmTokenService = {
    subscribe
}


function subscribe({
    device_id,
    token
}: any) {
    return ihttp.post(`/api/fcm-tokens/subscribe`, {
        device_id,
        token
    })
}