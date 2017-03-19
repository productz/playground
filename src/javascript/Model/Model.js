import Immutable from 'immutable';
import {observable, computed, autorun, action, reaction} from 'mobx';

const VERTICAL_MARGIN = 40;
const HORIZONTAL_MARGIN = 100;
const BOX_HEIGHT = 22;
const TEXT_MARGIN = 20;

export default class Model{
    
    tree;
    depthModel;
    
    constructor(tree,depthModel){
        this.tree = tree;
        this.depthModel = {};
    }
    
    createDepthModel(){
        let level = -1;
        traverse(this.tree,level,(child,parent,lev)=>{
            
            if (!this.depthModel[lev]) {
                this.depthModel[lev] = 0;
            }
            
            if(!parent.position){
                parent.position = {
                    x:30,
                    y:30
                }
            }
            let childArr = Object.keys(parent.ideas).map(key=>parent.ideas[key]);
            let index = childArr.indexOf(child);
            let sibling = childArr[index-1];
            if(sibling && sibling.ideas){
                let siblingChildArr = Object.keys(sibling.ideas).map(key=>sibling.ideas[key]);
                let siblingHeight =  siblingChildArr.length * VERTICAL_MARGIN;
                child.position = {
                    x:parent.position.x + HORIZONTAL_MARGIN,
                    y:sibling.position.y + siblingHeight + VERTICAL_MARGIN
                }
                this.depthModel[lev] = child.position.y;
            }
            else{
                child.position = {
                    x:parent.position.x + HORIZONTAL_MARGIN,
                    y:parent.position.y
                }
            }
            return child;
        });
    }
}

function traverse(node, lev, fn) {
    lev++;
    if (node.ideas) {
        return Object.keys(node.ideas).map((key) => {
            let child = node.ideas[key];
            child.level = lev;
            child = fn(child, node, lev);
            traverse(child, lev, fn);
        });
    }
}

//=============================
//========== Old Rendering
//=============================

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
