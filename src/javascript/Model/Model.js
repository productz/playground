import Immutable from 'immutable';

const VERTICAL_MARGIN = 40;
const HORIZONTAL_MARGIN = 100;
const BOX_HEIGHT = 22;
const TEXT_MARGIN = 20;

export function calculateInitialPositions(mindmap,parent) {
    if (!parent) {
        mindmap.position = {
            x: 150,
            y: 150
        };
    }
    if (mindmap.ideas) {
        let children = Object.keys(mindmap.ideas).map(key => mindmap.ideas[key]);
        children.map((child, index) => {
            calculateInitialPositions(child, mindmap);
        });
    }
}

export function calculatePositions(mindmap, parent) {
}

export function updatePosition(idea) {

}
