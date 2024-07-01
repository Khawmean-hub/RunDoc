import ihttp from "@/util/http-client"

export const documentTemplateService = {
    create,
    list,
    get
}

function create(data: any) {
    return ihttp.post('/api/document-templates', data)
}
function get(id:string){
    return ihttp.get(`/api/document-templates/${id}`)
}

function list() {
    return ihttp.get('/api/document-templates/my-templates')
}