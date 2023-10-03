let sourceObject = {
    "name": 1,
    "items": [{
            "name": 2,
            "items": [{ "name": 3 }, { "name": 4 }]
        }, {
            "name": 5,
            "items": [{ "name": 6 }]
        }]
};

let printHierarchyObj = (obj, level = 1) => {
    /* 
        Оставлю тут :)
        |
        ┠
        ┗
        ━
    */
    
    console.log( level > 1  ? level == 2 ? '┠' + '━'  + obj.name : '|' + ' '.repeat( level - 2 ) + '┗' + '━' + obj.name : obj.name );
    if ( obj.items ) {
        obj.items.forEach(element => {
            printHierarchyObj(element, level + 1)
        });
    }else{
        return
    }
};

printHierarchyObj(sourceObject)