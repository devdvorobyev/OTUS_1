const obj1 = {
    a: {
        b: {
            c: {
                d: 2
            }
        },
    },
};
const obj2 = {
    a: {
        b: 2,
    },
};
const obj3 = {
    a: {
        b: {
            c: {
                d: 1
            }
        },
    },
};


const obj5 = {
    a: [1,2,3,4,5]
};
const obj6 = {
    a: [1,2,3,4,5]
};


/**
 * ! Необходимо разработать функцию deepEqual, которая будет проводить глубокое сравнение между переданными объектами actual и expected. Под глубоким сравнением понимается то, что собственные свойства дочерних объектов также рекурсивно сравниваются. Если объекты не идентичны, вывести ошибку с путем до неидентичного свойства (например, используя нотацию JSON Path - $.store.book.author). Идеальную функцию сравнения написать невозможно, поэтому постарайтесь реализовать самые важные моменты
 * @param Рекурсия останавливается, когда найдено отличие
 * @param Сравниваются собственные итерируемые свойства, без учета прототипа
 * @param Важно реализовать сравнение примитивных свойств, итерирование массивов и объектов
 *
 **/


let deepEqual = (sourceObject, destinationObject, notValidPath = '$') => {
    console.log('Source %s destination %s',sourceObject,destinationObject);
    var equalFlag = true,
        notEqualPath = notValidPath;
    for (const key in sourceObject) {
        /* Проверка по типам +  самих значений*/
        if(typeof sourceObject[key] != 'object' && !Array.isArray(sourceObject[key]) ){

            if(sourceObject[key] != destinationObject [key]){
                console.log('Value not identical %s != %s',sourceObject[key] ,destinationObject [key]);
                notEqualPath += '.'+ key;
                return { equalFlag:false, notEqualPath:notEqualPath }
            }
            
        /* Проверка вложенных объектов */
        }else if(typeof sourceObject[key] == 'object' && typeof destinationObject[key] == 'object'){

            var { equalFlag = true, notEqualPath = '' } = deepEqual(sourceObject[key], destinationObject[key], notEqualPath += '.' + key);

        }else{
            console.log('Actual object type (%s) != expect type (%s)',typeof sourceObject[key], typeof destinationObject[key])
        }
    }
    equalFlag ? console.log('OK') : console.log('Object not equal. Path: %s', notEqualPath);
    return

}

deepEqual(obj1, obj3)