const obj1 = {
    a: {
<<<<<<< HEAD
        b: [1,3,4,5,6],
=======
        b: 1,
>>>>>>> c557cf1 (Доработал функцию)
    },
};
const obj2 = {
    a: {
        b: [1,2,3,4,5],
    },
};
const obj3 = {
    a: {
<<<<<<< HEAD
        b: {
            c: {
                d: {
                    e: ['',3,4,4,4]
                },
            },
        },
    },
};

const obj4 = {
    a: {
        b: {
            c: {
                d: {
                    e: ['',3,5,4,4]
                },
            },
        },
    },
};

=======
        b: 1,
    },
};

>>>>>>> c557cf1 (Доработал функцию)
let deepEqual = (sourceObject, destinationObject, notValidPath = '$') => {

    var equalFlag = true,
        notEqualPath = notValidPath,
        resultObject = {},
        arrayCount = 0;

    for (const key in sourceObject) {
        /* Проверка по типам +  самих значений*/
        arrayCount++;
        if(sourceObject.hasOwnProperty(key) && destinationObject.hasOwnProperty(key)){
            if(typeof sourceObject[key] !== 'object' && !Array.isArray(sourceObject[key]) ){
                if(sourceObject[key] !== destinationObject[key]){
    
                    notEqualPath += '.' + key;
                    return { equalFlag:false, notEqualPath }
    
                }else if(Array.isArray(sourceObject) && arrayCount === sourceObject.length){
                    return { equalFlag, notEqualPath }
                }

            /* Проверка вложенных объектов */
            }else if(typeof sourceObject[key] === typeof destinationObject[key]){
    
                Object.assign(resultObject, deepEqual(sourceObject[key], destinationObject[key], notEqualPath + '.' + key));
                return resultObject
    
            }else{
    
                return { equalFlag:false, notEqualPath }
    
            }   
        }else{
            return { equalFlag:false, notEqualPath }
        }
    }
}

const { equalFlag, notEqualPath } = deepEqual(obj3, obj4);

equalFlag ?  console.log('OK') : console.log(`Error: ${notEqualPath}`);
