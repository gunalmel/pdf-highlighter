pdf-highlighter
===============

This project is an experiment to build a JAVA program that will let the user specify search terms, assign highlight colors to search terms to highlight the search terms with corresponding highlight colors in a pdf file.

In this first pass the application is injecting a Acrobat JS file into pdf file (using PDFBOX) that will be executed upon opening the file in Acrobat Reader. It performs an in-elegant primitive search in the pdf file and higlights the search terms. 

The performance is pretty bad at the moment. It takes quite a while for Adobe Reader to execute js upon opening the file when more than couple search terms are specified. Either js search needs to be improved (I do not think much can be gained in terms of performance buy who knows) or pdf should be searched and highlighted using compiled libraries instead of js.

To Run
======

You can run the project using gradle script in the project root without having to download gradle:

./gradlew -q runSimple

Gradle will display 2 GUI prompts to ask for the names of pdf input file and pdf output file (highlighted) which should be in the class path. (projectDir/src/main/resources) You can also run it in non-interactive mode by:

./gradlew -q PpdfFiles=test.pdf,test-highlighted.pdf

You can build an executable distribution pack by:

./gradlew clean distZip

That will allow you to have zipped ditribution file in which bin(pdf input file should be in here) folder will have script files that will allow you to run the app as java console application:

./pdf-highlight
