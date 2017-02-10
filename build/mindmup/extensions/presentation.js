export default function presentation(file){
    var mindmap = mindmupParse.toJson(file);
    var pArr = [];
    const unordered = mindmap.ideas;	
    var ordered = mindmupParse.sort(unordered);
    var currentIndex = 0;
    ordered.forEach((obj,index)=>{
        mindmupParse.flatten(obj.ideas,pArr);
        obj = mindmupParse.processItem(obj,index);
        if(index == 0){
            pArr.splice(0,0,obj);
            currentIndex = pArr.length;
        }
        else{
            pArr.splice(currentIndex,0,obj);
            currentIndex = pArr.length;
        }
    })
    var finalContent = mindmupParse.toHTML(pArr);
    file.contents = new Buffer(finalContent);
}
