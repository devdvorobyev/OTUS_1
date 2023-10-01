const obj1 = {
    a: {
        b: 1,
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: 1,
    },
};

let deepEqual = (sourceObject, destinationObject, notValidPath = '$') => {

    var equalFlag = true,
        notEqualPath = notValidPath,
        resultObject = {};

    for (const key in sourceObject) {
        /* Проверка по типам +  самих значений*/
        if(typeof sourceObject[key] != 'object' && !Array.isArray(sourceObject[key]) ){

            if(sourceObject[key] != destinationObject[key]){

                notEqualPath += '.' + key;
                return { equalFlag:false, notEqualPath }

            }else if(Array.isArray(sourceObject) && sourceObject[key] == sourceObject.length){

                return { equalFlag, notEqualPath }

            }else if(!Array.isArray(sourceObject) && typeof sourceObject == 'object'){

                return { equalFlag, notEqualPath }

            }
            
        /* Проверка вложенных объектов */
        }else if(typeof sourceObject[key] == 'object' && typeof destinationObject[key] == 'object'){

            Object.assign(resultObject,deepEqual(sourceObject[key], destinationObject[key], notEqualPath + '.' + key));
            return resultObject

        }else{

            return { equalFlag:false, notEqualPath }

        }
    }
}

const { equalFlag, notEqualPath } = deepEqual(obj1, obj2);

equalFlag ?  console.log('OK') : console.log(`Error: ${notEqualPath}`);