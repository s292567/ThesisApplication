TEMPLATE FOR RETROSPECTIVE (Team 12)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  7 out of 7
- Total points committed vs. done
  37 out of 37

- Nr of hours planned vs. spent (as a team)
  114 hours 45 minutes  out of hours 110 hours

**Remember**  a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD 

### Detailed statistics

| Story | # Tasks | Points | Hours est.     | Hours actual                     |
|-------|---------|--------|----------------|----------------------------------|
| #0    | 27      | -      | 1 week         | 49 hours                         |
| #12   | 2       | 3      | 7 hours        | 7 hours 15 minutes               |
| #13   | 2       | 8      | 13 hours       | 14 hours 45 minutes              |
| #16   | 3       | 5      | 7 hours 40 min | 4 hours                          |
| #26   | 2       | 5      | 11 hours       | 10 hours  45 minutes             |
| #27   | 3       | 8      | 17 hours       | 17 hour                          |
| #28   | 2       | 5      | 12 hours       | 11 hours 30 minutes              |
| #29   | 1       | 3      | 1 hour         | 10 minutes                       |
6805 113 ore
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)
  - Retrospective Document work
  - Test>80%
  - Code Smells
  - Resolve Issues from Github
  - Sprint Planning
  - Sprint Meeting
  - Final documentation on whole app
- Hours per task (average, standard deviation)  5.33, 5.30
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1  0.04
  
## QUALITY MEASURES 

- Unit Testing:
    - Total hours estimated
      8 hours

    - Total hours spent
      4 hours 30 minutes

    - Nr of automated unit test cases
      117

    - Coverage (if available)
      83.5%

- E2E testing:
    - Total hours estimated
      XXX hours

    - Total hours spent
      XXX hours

- Code review
    - Total hours estimated 1 hr
    - Total hours spent 1 hr
- Technical Debt management:
  - Total hours estimated 8 hr
  - Total hours spent 16 hr
  - Hours estimated for remediation by SonarQube 18hr
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 16h 18m
  - Hours spent on remediation 16h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") 0.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) 0 bugs, 0 Vulnerabilities, 30 code smells
  


## ASSESSMENT

- What caused your errors in estimation (if any)? 
  - Underestimated the time needed for recovering the Technical Debt

- What lessons did you learn (both positive and negative) in this sprint? 
  - Positive:
    - Learning how to handle file upload and their storage
    
  - Negative:
    - 


- Which improvement goals set in the previous retrospective were you able to achieve? 
  - We fixed the Code Smells, going from 186 to 30
  - We completed the first 20 user stories

- Which ones were you not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - 

- One thing you are proud of as a Team!!
  - Distribution of work and communication in the team was great
  - We passed the SonarCloud Quality Gate
