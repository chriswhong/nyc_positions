nyc_positions
=============

Scraper for NYC full-time employee position data from the Supporting Schedules Budget Docs

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
The resulting output.csv is ready for analysis!  

```
agencyId,agencyName,uoaId,uoaName,line,description,payBank,titleCode,minRate,maxRate,numPositions,annualRate,
002,Mayoralty,020,Office of the Mayor-PS,1100,Mayor,D 002,12995,45758,225000,1,225000
002,Mayoralty,020,Office of the Mayor-PS,1106,Deputy Mayor,D 002,12940,49492,212614,1,212614
002,Mayoralty,020,Office of the Mayor-PS,1161,Assistant to the Mayor,D 002,13209,49492,212614,2,340000
002,Mayoralty,020,Office of the Mayor-PS,1163,Assistant to the Mayor,D 002,06508,49492,212614,3,412614
002,Mayoralty,020,Office of the Mayor-PS,1172,Assistant to the Deputy M,D 002,05278,49492,212614,6,1046611
...
```
