package se2g12.thesisapplication.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfiguration (private val jwtAuthConverter: JwtAuthConverter) {


    @Bean fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf() { it.disable() }
            .formLogin() { it.disable() }
        http.cors {
            it
            http.authorizeHttpRequests {
                it.requestMatchers("/user/validate/").permitAll()
                    .requestMatchers("/user/signup").anonymous()
                    //.requestMatchers("/user/createExpert").hasRole("Manager")
                    .anyRequest().permitAll()
                http.oauth2ResourceServer(){it.jwt(){it.jwtAuthenticationConverter (jwtAuthConverter)}}
            }
        }
        http.sessionManagement() { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
        return http.build()

    }}
