function getPath($el){
    if(typeof $el === 'object'){
        let currentElSelector = getAttrib($el),
        parentSelector = getParentSelector($el.parentElement).reverse().join(' ');

        function getAttrib($el) {
            let attributeArray = [$el.tagName];

            for (const attribName in $el.getAttributeNames()) {
                if($el.getAttributeNames()[attribName] === 'id'){

                    return `#${$el.getAttribute($el.getAttributeNames()[attribName])}`;

                }else if($el.getAttributeNames()[attribName] === 'class'){

                    let classStr = ''
                    $el.getAttribute($el.getAttributeNames()[attribName]).split(' ').forEach(className => {
                        if(!!className) classStr += '.'+className
                    });
                    attributeArray.push(classStr);

                }
            }

            return attributeArray.join('');
        };

        function getParentSelector($el, parentSelector = []){
            let parentSelectorStr = getAttrib($el)
            parentSelector.push(parentSelectorStr)
            if($el.parentElement){
                parentSelector = getParentSelector($el.parentElement, parentSelector)
            }
            return parentSelector
        }

        function checkUnique(selector) {
            return document.querySelectorAll(selector).length === 1;
        };

        return parentSelector + ' ' + currentElSelector;
    }else{
        return 'На вход был подан не Element DOM модели.'
    }
}

getPath($0)


