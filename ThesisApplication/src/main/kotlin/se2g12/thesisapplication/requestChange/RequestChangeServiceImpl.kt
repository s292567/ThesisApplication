package se2g12.thesisapplication.requestChange

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import se2g12.thesisapplication.request.Request

@Service
@Transactional
class RequestChangeServiceImpl(private val repository: RequestChangeRepository): RequestChangeService {
    override fun addRequestChange(request: Request, info: String) {
        val newRequestChange = RequestChange(request, info)
        repository.save(newRequestChange)
    }
}