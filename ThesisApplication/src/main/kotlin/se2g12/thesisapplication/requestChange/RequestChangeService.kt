package se2g12.thesisapplication.requestChange

import se2g12.thesisapplication.request.Request

interface RequestChangeService {
    fun addRequestChange(request: Request, info: String)
}