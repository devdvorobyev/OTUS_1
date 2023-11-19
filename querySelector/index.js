function getPath($el){
    if(typeof $el === 'object'){
        let currentElSelector = getAttrib($el),
        parentSelector = getParentSelector($el.parentElement).reverse().join(' > ');
        console.log(getParentSelector($el.parentElement));

        function getAttrib($el) {
            let attributeArray = [$el.tagName];

            if(!!$el.getAttributeNames()['id']){

                return `#${$el.getAttribute($el.getAttributeNames()['id'])}`;

            }else{
                if( $el.previousSibling !== null){
                    const elProperty = {
                        tagName: $el.tagName,
                        index: 1
                    }
                    getNthChild( $el, elProperty );
                    if( elProperty.index > 1 ) attributeArray.push(`:nth-child(${ elProperty.index })`)
                }
            }

            return attributeArray.join('');
        };

        function getNthChild($htmlEl, sourceObject){
            if( $htmlEl.previousSibling ){
                if( $htmlEl.previousSibling.tagName === sourceObject.tagName ) sourceObject.index += 1;
                getNthChild($htmlEl.previousSibling, sourceObject);
            }
            return;
        }

        function getParentSelector($el, parentSelector = []){
            let parentSelectorStr = getAttrib($el)
            parentSelector.push(parentSelectorStr)
            if($el.parentElement){
                parentSelector = getParentSelector($el.parentElement, parentSelector)
            }
            return parentSelector
        }

        return parentSelector + ' > ' + currentElSelector;
    }else{
        return 'На вход был подан не Element DOM модели.'
    }
}

getPath($0)


