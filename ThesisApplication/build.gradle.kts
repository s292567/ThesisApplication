import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.1.5"
	id("io.spring.dependency-management") version "1.1.3"
	id ("com.google.cloud.tools.jib") version "3.3.1"
	id("org.sonarqube") version "4.4.1.3373"
	jacoco

	kotlin("jvm") version "1.8.22"
	kotlin("plugin.spring") version "1.8.22"
	kotlin("plugin.jpa") version "1.8.22"



}

group = "SE2-G12"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {

	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.keycloak:keycloak-admin-client:21.0.1")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")

	implementation ("org.springframework.boot:spring-boot-starter-oauth2-client")
	implementation("org.springframework.boot:spring-boot-starter-mail:3.0.4")

	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation ("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("org.postgresql:postgresql")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("io.mockk:mockk:1.13.8")
	testImplementation("com.ninja-squad:springmockk:4.0.2")
	testImplementation ("com.h2database:h2:2.1.214")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

jib{
	container{
		ports= mutableListOf("8081")
	}
	to{image="s292567/g12-2024-final"}
}
jacoco {
	toolVersion="0.8.7"
	reportsDirectory = file("${project.projectDir}/testReports")
}
tasks.test{
	finalizedBy("jacocoTestReport")
}
tasks.jacocoTestReport {
	reports {
		xml.required = true
		html.required = true
	}
}
sonar {
	properties {
		property ("sonar.coverage.jacoco.xmlReportPaths", "testReports/test/jacocoTestReport.xml")
		property("sonar.projectKey", "s292567_ThesisApplication")
		property("sonar.organization", "s292567")
		property("sonar.host.url", "https://sonarcloud.io")
	}
}