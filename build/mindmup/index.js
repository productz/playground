"use strict";
const fs = require('fs');
let concepts;

fs.readFile('./data/mindmup/Self.site.json', (err, data) => {
  if (err) throw err;
  let skills = JSON.parse(data);
  concepts = skills.ideas["1"].ideas["1"];
  //toBlog(concepts);
  toMarkdown(concepts);
  fs.writeFile('./src/javascript/data-test.json',JSON.stringify(concepts));
});


/**
 * 
 * Convert the map to different formats
 * 
**/

function toMarkdown(concepts){
    let level = 0;
    traverseWith(concepts,function(node){
        console.log(node);
        return node;
    })
}

function toPresentation(concepts){

}

function toBlog(concepts){
    traverseWith(concepts,function(node){
        return addTitleAsIndex(node);
    });
}

function toDb(ideas){
    
}

/**
 * 
 * Add all keys as an entry to allow us to query data easily
 * Example: I have a list of skills and one of them is Angular,
 * I can query for Skills -> Angular by accessing idea['Angular'].ideas['Angular-router'].ideas ...
 *
**/

function addTitleAsIndex(node){
  return Object.keys(node.ideas).map((key)=>{
    node.ideas[node.ideas[key].title] = node.ideas[key];
  })
}

function traverseWith(node,fn){
    Object.keys(node.ideas).map((key)=> {
        let newIdeas = fn(node.ideas[key]);
        node.ideas[key] = newIdeas;
        if(newIdeas.ideas){
           return traverseWith(newIdeas,fn);
        }
    })   
}