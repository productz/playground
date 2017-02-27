"use strict";
const fs = require('fs');

fs.readFile('./data/mindmup/Self.site.json', (err, data) => {
  if (err) throw err;
  
  let skills = JSON.parse(data);
  
  let blog = skills;
  toBlog(blog);
  
  let marky = toMarkdown(blog);
  
  fs.writeFile('./src/javascript/data-blog.json',JSON.stringify(blog.ideas["1"].ideas["Concepts"]));
  fs.writeFile('./src/javascript/data.md',marky);
});


/**
 * 
 * Convert the map to different formats
 * 
**/

function toMarkdown(concepts){
    let marky;
    traverseWith(concepts,function(node){
        if(node.ideas){
            Object.keys(node.ideas).map((key)=>{
                marky += `#${node.ideas[key].title}`;
            });
        }
        return node;
    });
    return marky;
}

function toPresentation(concepts){

}

function toBlog(concepts){
    traverseWith(concepts,function(node){
        if(node.ideas){
            addTitleAsProp(node);
        }
        return node;
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

function addTitleAsProp(node){
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