class FileUploadError extends Error {
    constructor(tier:'DELETE'|'UPLOAD',type:'FILE' | 'IMAGE', fileName:string){
        const tiering = tier == 'DELETE'?'delet':'upload'
        const typeing = type == 'IMAGE'?'image(s)':'file(s)'
        super(`failed to ${tiering} ${typeing}, ${fileName}`)
    }
}

export default FileUploadError