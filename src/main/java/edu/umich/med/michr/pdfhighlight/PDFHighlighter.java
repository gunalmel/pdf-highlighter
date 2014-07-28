package edu.umich.med.michr.pdfhighlight;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Scanner;

import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.interactive.action.type.PDActionJavaScript;

public class PDFHighlighter {

	private static String SOURCE_PDF_FILE="test.pdf";
	private static String TARGET_PDF_FILE="test-highlighted.pdf";
	private static String JS_FILE="find-words.js";
	
	private static String SOURCE_PDF_FILE_PATH;
	private static String TARGET_PDF_FILE_PATH;
	private static String JS_FILE_PATH;
	
	/**
	 * PDF file to be highlighted has to be in src/main/resources folder.
	 * To run in Gradle: 
	 * 		"gradle -q" :(interactive, pdf input and output names are asked in GUI prompt)
	 * 		"gradle -PpdfFiles=test.pdf,test-highlighted.pdf": (non-interactive)
	 * 		Output files will be generated under build/recources/main folder under the java project root.
	 * To run in eclipse:
	 *      In eclipse gradle plugin is needed. The classpath is the output bin folder so make sure the project is cleaned eclipse project browser is refreshed so that eclipse can find pdf and js files in the src/main/resources directory.
	 *      When running in eclipse (right click on PDFHighlighter.java in project browser or in code window then pick "Run As"->"Java Application" then in console window you will be asked input and output pdf files for js(highlighter) injection.
	 *      The output files will be under bin directory under project root.
	 */
	private static ClassLoader classLoader= PDFHighlighter.class.getClassLoader();
	
	public static void main(String[] args) throws IOException, COSVisitorException, URISyntaxException {
		
		collectFileNames(args);// default pdf file names and js file name is defined in build.gradle file as well as in static variables and should match for the app to run consistently in both eclipse, command line and gradle 
	    
		PDDocument doc = PDDocument.load(SOURCE_PDF_FILE_PATH);
		
		String jsCode= new String(Files.readAllBytes(Paths.get(JS_FILE_PATH)));
		PDActionJavaScript javascript = new PDActionJavaScript(jsCode);
	
		doc.getDocumentCatalog().setOpenAction(javascript);
		
		doc.save(TARGET_PDF_FILE_PATH);
		doc.close();
	}
	
	private static String getFilePath(String fileName){
		return classLoader.getResource(fileName).getPath();
	}

	private static void getUserInputFromCommandLine(){
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter source pdf file name (default:"+SOURCE_PDF_FILE+"): ");
		String source= sc.nextLine();
		SOURCE_PDF_FILE=!source.equals("")?source:SOURCE_PDF_FILE;
		
		System.out.println("Enter target pdf file name (default:"+TARGET_PDF_FILE+"): ");
		String target= sc.nextLine();
		TARGET_PDF_FILE=!target.equals("")?target:TARGET_PDF_FILE;
		sc.close();
	}
	
	private static void collectFileNames(String[] args){
		try{
	    	getUserInputFromCommandLine();
	    }catch(Exception ex){
	    	SOURCE_PDF_FILE=args[0];
	    	TARGET_PDF_FILE=args[1];
	    }
		
		 SOURCE_PDF_FILE_PATH = getFilePath(SOURCE_PDF_FILE);
		 TARGET_PDF_FILE_PATH = SOURCE_PDF_FILE_PATH.substring(0,SOURCE_PDF_FILE_PATH.lastIndexOf(File.separator)+1)+TARGET_PDF_FILE;
		 JS_FILE_PATH = getFilePath(JS_FILE);
	}

}
