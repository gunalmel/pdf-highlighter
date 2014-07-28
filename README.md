pdf-highlighter
===============

This project is an experiment to build a JAVA program that will let the user specify search terms and assign colors to search terms to highlight them in a pdf file.

In this first pass the application is injecting a Acrobat JS file(find-words.js) into the input pdf file (using PDFBOX) that will be executed upon opening the file in Acrobat Reader. The search terms and corresponding highlight colors are specified as JSON object in the beginning of that file. It performs an in-elegant primitive search in the pdf file and higlights the search terms.

The performance is pretty bad at the moment. It takes quite a while for Adobe Reader to execute js upon opening the file when more than couple search terms are specified. Either js search needs to be improved. I do not think much can be gained in terms of performance by improving search logic. However, directly using libraries such as PDFBox perf gain might be more significant.

The js file deals with the following

1. Iterate over all words in pdf file and compare them with the search terms.
2. Get the quadrilateral coordinates of the box containing matching words in pdf and call annotate command to highlight the box that encompasses the word(s) in search term.
3. If the search term is multiple words and those words are matched in pdf on different lines e.g.: Search term is "my white cat" and the search term is broken into two lines such that "my" appears at the end of 1st line, "white cat" appears on the 2nd line. Then, when highlighting there should be 2 sets of quadrilateral coordinates identified for that search term. One for the highlight box that will have "my", and one for "white cat"

If anyone knows a better way of doing this I would appreciate the help very much. Thx!

To Run
======

Before running the app, you can change search terms by editing find-words.js file. 

You can run the project using gradle script in the project root without having to download gradle:

$projectDir> ./gradlew -q runSimple

Gradle will display 2 GUI prompts to ask for the names of pdf input file and pdf output file (highlighted) which should be in the class path. (projectDir/src/main/resources) You can also run it in non-interactive mode by:

$projectDir> ./gradlew -q -PpdfFiles=test.pdf,test-highlighted.pdf

You can build an executable distribution pack by:

$projectDir> ./gradlew clean distZip

That will allow you to have zipped ditribution file under build/distribution directory. When zip file is extracted, bin(pdf input file should be in here) folder will have script files that will allow you to run the app as java console application:

$projectDir/build/distributions/pdf-highlight-1.0/bin> ./pdf-highlight

After running the app you can find the js injected pdf file at the same path as the input pdf file. Opening it in Adobe Reader on Mac and Windows platforms executes the js and colors the search terms in the file.
