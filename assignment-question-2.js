function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    
    let hp = 0;
    let pp = 0;
    let n = htmlContent.length;
    let startInd = 0;
    let endInd = 0;

    plainTextPositions.sort((a, b) => a.start - b.start);
    
    let dummyString = htmlContent;
    
    for (let i=0; i<plainTextPositions.length; i++) {
        const pos = plainTextPositions[i];
        let start = pos.start;
        let end = pos.end+1;
        
        while (hp<n) {
            
            if (pp==start) {
                startInd = hp;
            }
            
            if (pp==end) {
                endInd = hp;
                break;
            }
            
            if (htmlContent[hp]=='<') {
                while (htmlContent[hp]!='>') {
                    hp++;
                }
                hp++;
                continue;
            }
            
            if (hp>0 && pp>0 && htmlContent[hp-1]=='>') {
                pp++;
            }
            
            pp++;
            hp++;
            
        }
    
      let newStart = startInd + i*(13);
      let newEnd = endInd + i*(13);
      dummyString = 
      dummyString.slice(0, newStart) +
      "<mark>" + 
      dummyString.slice(newStart, newEnd) + 
      "</mark>" +
      dummyString.slice(newEnd);
            
    }
    
    console.log(dummyString)
    
}

let htmlContent = "<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing</span></p>";
let plainText = "Hi David Headline: Energix Closes $520 Million Financing";

let plainTextPositions = [{start: 16, end: 22},{start: 0, end: 15}, {start: 50, end: 55}]

highlightHTMLContent(htmlContent, plainText, plainTextPositions);


