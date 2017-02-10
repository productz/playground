export default function blog(){
    var mindmap = mindmupParse.toJson(file);
    var pArr = [];
    const unordered = mindmap.ideas;	
    var ordered = mindmupParse.sort(unordered);
    mindmupParse.clean(ordered);
    var finalContent = JSON.stringify(ordered);
    file.contents = new Buffer(finalContent);
}
