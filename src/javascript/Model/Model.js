import Immutable from 'immutable';

const VERTICAL_MARGIN = 40;
const HORIZONTAL_MARGIN = 100;
const BOX_HEIGHT = 22;
const TEXT_MARGIN = 20;

export default function Model(idea){
    let level = 0;
    let depthModel = {};
    traverse(idea,level,(parent,lev)=>{
        let currentLevel = lev - 1;
        depthModel[currentLevel] = "";
        return parent;
    })
}

function isPrevSiblingOpen(){
    
}

function getPrevSibling(parent, index){
    let children = Object.keys(parent.ideas).map(key => parent.ideas[key]);
    return children[index - 1];
}

function calcualtePositionFromIndex(parentPosition, length, index){
    let order = -1 * (length - index);
    return {
        x: parentPosition.x + HORIZONTAL_MARGIN,
        y: parentPosition.y 
    }
}

function calculateInitialPositions(parent, mindmap, index) {
    if (!parent) {
        mindmap.position = {
            x: 150,
            y: 150
        };
    }
    else{
        mindmap.position = {
            x:parent.x + 50,
            y:parent.y + 50
        }
    }
    if (mindmap.ideas) {
        let children = Object.keys(mindmap.ideas).map(key => mindmap.ideas[key]);
        children.map((child, index) => {
            calculateInitialPositions(mindmap, child, index);
        });
    }
}

//=============================
//========== Old Rendering
//=============================

function traverse(parent,level,fn){
	//return upper sibling and below sibling
    parent = fn(parent,level);
    if(parent.ideas){
        	let children = Object.keys(parent.ideas).map(key => {
        	    parent.ideas[key]["level"] = level;
        	    return parent.ideas[key];
        	});
        	level++;
        	children.map((child) => {
        	    traverse(child, level, fn);
        	});
    }
}

function render(tree) {

    this.tree = tree;
    var x, y;
    var length;
    var mainContainer;
    var box;
    var sText;
    var text;
    var sibling;
    var siblingHeight = 0;
    var arrangement;
    var debugRect;
    this.currentHeight = 0;
    var gPosition = {
        y: 0
    };
    var line;
    var that = this;
    traverse(tree, (mindmapObj, key, parent) => {

        box = this.createBox();
        box.interactive = true;
        mainContainer = new PIXI.Container();
        debugRect = new PIXI.Graphics();

        mindmapObj.mainContainer = mainContainer;
        mindmapObj.box = box;

        sText = mindmapObj.title.slice(0, 10);
        text = this.createText(sText);
        if (text.width > box.width) {
            box.width = text.width;
        }
        else {
            text.y += 10
        }
        //store a reference to the object here to be used when updating the object's position
        box.obj = mindmapObj;
        box.addChild(text);
        mainContainer.addChild(box);

        // events for drag start
        box
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            // events for drag end
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            // events for drag move
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);

        if (parent) {
            
            parent.mainContainer.addChild(mainContainer);
            //get previous sibling
            var count = 0;
            var order;
            parent.ideasArr = [];
            Object.keys(parent.ideas).map((key, index) => {
                parent.ideasArr.push(parent.ideas[key]);
                count++;
            })
            sibling = parent.ideasArr[mindmapObj.order - 1];
            length = count;
            if (sibling) {
                mainContainer.x += HORIZONTAL_MARGIN;
                mainContainer.y = sibling.mainContainer.y + sibling.mainContainer.height + VERTICAL_MARGIN;
            }
            else {
                mainContainer.x += HORIZONTAL_MARGIN;
                //mainContainer.y -= ((-1 * Math.floor(length/2)) + mindmapObj.order);
            }
            //for debugging
            if (mindmapObj.title.indexOf("Concepts") !== -1) {}
            //drawLine
            var po = box.toLocal(mainContainer.position);
            this.drawLine(mainContainer, parent.mainContainer, box, parent.box);
            mindmapObj.line = line;
        }
        else {
            this.rootContainer.addChild(mainContainer);
        }
    })
}
