package se2g12.thesisapplication.date

import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter
@Service
class Date {
    private var date:LocalDate?=null

    fun getDate():LocalDate?{
        return date
    }
    fun setDate(dateStr:String):Boolean{
        val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        date = LocalDate.parse(dateStr, formatter)
        return true
    }

}