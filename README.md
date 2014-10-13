nyc_positions
=============

Scraper for NYC full-time employee position data from the Supporting Schedules Budget Docs (A [BetaNYC](http://www.betanyc.us) Joint)

Start with the [Supporting Schedules FY15 Budget PDF](http://www.nyc.gov/html/omb/downloads/pdf/ss6_14.pdf)

Since it's locked, use something like Apple Preview to print/export it to another PDF (the output PDF will not be locked)

Use pdftotxt to convert it to a txt file

```
>pdftotxt -layout supportingSchedules.pdf
```
Install node modules, then run scrape.js to parse the resulting txt file
```
>npm install
>node scrape.js supportingSchedules.txt
```
The resulting output.csv is ready for analysis!  The first record is Bill DeBlasio!  Curiously, the minimum salary for the mayor of New York City is 45,758.

```
agencyId,agencyName,uoaId,uoaName,objectId,objectName,line,description,payBank,titleCode,minRate,maxRate,numPositions,annualRate
002,Mayoralty,020,Office of the Mayor-PS,001,Full Year Positions,1100,Mayor,D 002,12995,45758,225000,1,225000
002,Mayoralty,020,Office of the Mayor-PS,001,Full Year Positions,1106,Deputy Mayor,D 002,12940,49492,212614,1,212614
002,Mayoralty,020,Office of the Mayor-PS,001,Full Year Positions,1161,Assistant to the Mayor,D 002,13209,49492,212614,2,340000
002,Mayoralty,020,Office of the Mayor-PS,001,Full Year Positions,1163,Assistant to the Mayor,D 002,06508,49492,212614,3,412614
002,Mayoralty,020,Office of the Mayor-PS,001,Full Year Positions,1172,Assistant to the Deputy M,D 002,05278,49492,212614,6,1046611
...
```
Some notes:  Each row in output.csv represents one job title

A job title can have many authorized positions.  For example, the line below represents the job title "Teacher", which has 47,434 positions.  The total annual spend for all of these Teacher positions is $3,570,332,102, averaging to $75,269.47 annual salary per teacher.
```
agencyId,agencyName,uoaId,uoaName,line,description,payBank,titleCode,minRate,maxRate,numPositions,annualRate
040,Department of Education,401,Ge Instr & Sch Leadership - PS,3001,Teacher,Q 740,TRTRQ,43214,130064,47434,3570332102
```
