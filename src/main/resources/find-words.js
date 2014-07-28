var searchTerms = [
    {text:'chain',color:'cyan',size:1},
    {text:'would be',color:'yellow',size:2}/*,
    {text:'cash would allow online payments to be sent directly from one party to another without going through a financial institution digital signatures provide part',color:'red',size:24},
    {text:'but the main benefits',color:'magenta',size:4},
    {text:'as long as',color:'blue',size:3},
    {text:'nodes',color:'green',size:1},
    {text:'majority decision',color:'red',size:2},
    {text:'bitcoin',color:'cyan',size:1}*/
];

if(!String.prototype.trim){  
  String.prototype.trim = function(){  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}

function combineQuadsOfTwoWordsOnTheSameLine(firstWordQuad,lastWordQuad){
		return [[
			firstWordQuad[0][0],firstWordQuad[0][1],
			lastWordQuad[0][2],lastWordQuad[0][3],
			firstWordQuad[0][4],firstWordQuad[0][5],
			lastWordQuad[0][6],lastWordQuad[0][7]
		]];
};

function getQuadrilateralCoordinatesForMultipleWords(start, searchTermQuads, targetBlockQuads){
	var startQuad =  searchTermQuads[start];
	var lastQuad = null;

	if(start==searchTermQuads.length-1){
		targetBlockQuads.push(startQuad);
	}
	
	for(var i=(start+1);i<searchTermQuads.length;i++){
		if (startQuad[0][1]==searchTermQuads[i][0][1]){ // if multiple words are not broken at the end of the line
			lastQuad=searchTermQuads[i];
		}else{
			if(lastQuad!=null){
				targetBlockQuads.push(combineQuadsOfTwoWordsOnTheSameLine(startQuad,lastQuad));
                        }else{
                                targetBlockQuads.push(startQuad);
                        }
			return getQuadrilateralCoordinatesForMultipleWords(i,searchTermQuads,targetBlockQuads);
		}
	}
	if(lastQuad!=null)
	    targetBlockQuads.push(combineQuadsOfTwoWordsOnTheSameLine(startQuad,lastQuad));
        return targetBlockQuads;
}

function highlight(pageNumber,quadrilateralCoordinates,highlightColor){
for (var i=0;i<quadrilateralCoordinates.length;i++){
	annot = this.addAnnot({
                        page: pageNumber,
                        type: "Highlight", // "Underline", "StrikeOut", or "Squiggly"
                        strokeColor: color[highlightColor],
                        quads: quadrilateralCoordinates[i]
                });
				}
};

function findSearchTermQuads(pageNumber,searchTerm,startingPosition,numWordsOnPage){

    if((startingPosition+searchTerm.size)>=numWordsOnPage)
		return null; // Search phrase has more number of words than there are left at the end of the document.
	
	var textSelector='';
	var searchTermQuads = new Array;
	for(var searchTermWordCounter=0;searchTermWordCounter<searchTerm.size;searchTermWordCounter++){
		var currentWordPosition = (startingPosition+searchTermWordCounter);
		textSelector+=this.getPageNthWord(pageNumber,currentWordPosition).toLowerCase()+' ';
		searchTermQuads.push(this.getPageNthWordQuads(pageCounter,currentWordPosition));
	}
	
	if(searchTerm.text.toLowerCase().trim()==textSelector.trim()){
		return getQuadrilateralCoordinatesForMultipleWords(0,searchTermQuads,new Array);
	}else{
		return null;
	}
};

function colorCodeSearchTerms(searchTermsArray, pageNumber){
	var numberOfWordsOnPage = this.getPageNumWords(pageNumber);
	
	for(var wordCounter=0; wordCounter<numberOfWordsOnPage; wordCounter++){
	
	    var thisWord = this.getPageNthWord(pageCounter,wordCounter);
	
		for (var searchTermCounter=0; searchTermCounter<searchTermsArray.length;searchTermCounter++) {
			var searchTerm = searchTermsArray[searchTermCounter];
		//	var start = new Date().getTime();			
			var quads=findSearchTermQuads(pageNumber,searchTerm,wordCounter,numberOfWordsOnPage);
		//	var end = new Date().getTime();
		//	var findSearchTermTime = end - start;
		//	var highlightTime;
			if(quads!=null){
		//		start = new Date().getTime();	
				highlight(pageNumber,quads,searchTerm.color);
		//		end = new Date().getTime();
		//		highlightTime = end - start;
		//		console.println(searchTerm.text+","+highlightTime);
			}
		//	console.println(searchTerm.text+","+findSearchTermTime);
		}
	}
};
		
for (var pageCounter=0; pageCounter<this.numPages; pageCounter++){
	colorCodeSearchTerms(searchTerms, pageCounter);
}
