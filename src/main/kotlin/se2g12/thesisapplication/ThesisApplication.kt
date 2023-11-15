package se2g12.thesisapplication

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ThesisApplication

fun main(args: Array<String>) {
	runApplication<ThesisApplication>(*args)
}

