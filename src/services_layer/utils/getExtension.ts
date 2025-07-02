function getFileExtension(base64: string): string | null {
    const match = base64.match(/^data:(.+?);base64,/)
    if (!match || match.length < 2) return null

    const mime = match[1]

    const mimeToExt: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "application/pdf": "pdf",
        "image/webp": "webp",
        "text/plain": "txt",
        "application/msword": "doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/vnd.ms-excel": "xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    }

    return mimeToExt[mime] || null
}
export default getFileExtension