const KEY_EXPENSE_MAP = {
    'Description':'Category'
};

// CSV-Entry -> Expense
export default function({
    entry,
    Expense
}){
    if(isChase(Object.keys(entry))){
        return Object.keys(entry).map(key =>{
            
        });
    }
    else if(isCapitalOne(Object.keys(entry))){
        return Object.keys(entry).map(key =>{
        
        });
    }
}

function isChase(keys){
    
}

function isCapitalOne(){
    
}