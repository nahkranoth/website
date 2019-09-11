var fs = require('fs');

function splitOnSpace(input){
    var values = [];
    var attributes = input.split(' ');

    for(var j=0;j<attributes.length;j++){
        var val = attributes[j];
        if(!isTypeChar(val)){
            values.push(val);
        }
    }
    return values;
}

function spiltOnTilde(input){
    var values = [];
    var spaceSplit = splitOnSpace(input);
    for(var k=0;k<spaceSplit.length;k++) {
        var attributes = spaceSplit[k].split('/');
        for(var j=0;j<attributes.length;j++){
            var val = attributes[j];
            values.push(val);
        }
    }
    return values;
}

function isTypeChar(line){
    return !(line.charAt(0) !== "f" && line.charAt(0) !== "v" && line.charAt(0) !== "vn" && line.charAt(0) !== "vt");
}

function make(){
    var data = {verts:[],indices:[],texcoords:[],normals:[]};

    readFiles("./comet.obj", (file, content) => {


        var lines = content.split('\n');

        var indices = [];
        var verts = [];
        var normals = [];
        var texcoords = [];

        for(var i=0;i<lines.length;i++){
            var line = lines[i];
            line = line.replace(/(\r\n|\n|\r)/gm, ""); //sanatize strings
            if(!isTypeChar(line)){
                console.log("not recognized, continue");
                continue;
            }
            if(line.charAt(0) == "vn"){
                console.log("??");
            }
            switch(line.charAt(0)){
                case "f"://size 1
                    indices = indices.concat(spiltOnTilde(line));
                    break;
                case "v"://size 3
                    switch(line.charAt(1)){
                        case " ":
                            verts = verts.concat(splitOnSpace(line));
                            break;
                        case "n":
                            normals = normals.concat(splitOnSpace(line));
                            break;
                        case "t"://size 2
                            texcoords = texcoords.concat(splitOnSpace(line));
                            break;
                    }
                    break;
                default:
                    console.log("error no type, this should not happen do to earlier sanitation");
                    break;
            }

        }

        data.indices = indices;
        data.normals = normals;
        data.texcoords = texcoords;
        data.verts = verts;

        


    }, (error) => {console.log(error);})
}

function readFiles(filepath, onFileContent, onError) {
    fs.readFile(filepath, 'utf-8', function(err, content) {
        if (err) {
            onError(err);
            return;
        }
        onFileContent(filepath, content);
    });
}

make();