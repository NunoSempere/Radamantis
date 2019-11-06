const yourFilePath = "..."
const {createServer} = require("http");
const fs = require('fs');
const qs = require('querystring');

if(yourFilePath=="..."){
    console.log("Please change your filepath!");
}

let server = createServer((request, response) => {
    
    buttonNames = ["diary", "calib", "system", "emotionalMaturity", "listOfProjects", "ABTesting"];
    for(let i=0; i<buttonNames.length; i++){
        requestUrlRead = "/"+buttonNames[i]+"Read"
        requestUrlWrite = "/"+buttonNames[i]+"Write"
        //console.log("RequestUrlWrite =", requestUrlWrite);
        requestFile = yourFilePath+buttonNames[i]+".txt"
        //console.log(requestFile);
        if(request.url===requestUrlRead){
            //console.log("DiaryRead");
            
            fs.readFile(requestFile, function(err, data) {
                response.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
                if(err){
                    throw err;
                } 
                //console.log("SR");
                response.write(data);
                response.end();

            });

        }

    }
    
    if(request.method == "POST"){
        console.log("Request.url =", request.url);
        console.log(request.method);
        //console.log(request.method == "POST");            
        
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            request.on('end', () => {
                var post = qs.parse(body);
                //console.log(post);
                //console.log("post.fileName =\n", post.fileName);
                //console.log("post.fileContents =\n", post.fileContents);

                fs.writeFile(yourFilePath+post.fileName, post.fileContents, (err)=>{ 
                    if( err ) { 
                        throw err; 
                    }
                    console.log("SW");
                }); 

                

                response.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
                response.write('ok');
                response.end();
            });
        
    }
    
    
});

server.listen(8000);
console.log("Listening! (port 8000)");


// Fuck it, create something else just to answer POST requests
