package se2g12.thesisapplication

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
class ThesisApplication

fun main(args: Array<String>) {
	runApplication<ThesisApplication>(*args)
}

