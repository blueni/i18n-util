import Tag from './html-tag.vue'

export default {
    name: 'html-tag',

    props: {
        file: String,
    },

    render(_h){
        let file = this.file || ''
        let doc = parse5.parse(file)
        let nodes = []
        let noEndTagReg = /br|hr|img|meta|link/
        let notHtmlTagReg = /text|comment|document/
        function _tags(node = {}){
            let childNodes = node.childNodes || []
            childNodes.forEach(item => {
                _tagStart(item)
                nodes.push(item)
                _tags(item)
                _tagEnd(item)
            })
        }

        function _tagStart(node = {}){
            let tag = node.nodeName || node.tagName
            if(notHtmlTagReg.test(tag)){
                return
            }
            nodes.push({
                start: true,
                noEnd: noEndTagReg.test(tag),
                node,
            })
        }

        function _tagEnd(node = {}){
            let tag = node.nodeName || node.tagName
            if(notHtmlTagReg.test(tag) || noEndTagReg.test(tag)){
                return
            }
            nodes.push({
                end: true,
                node,
            })
        }
        _tags(doc)

        // function _tags(node = {}){
        //     let childNodes = node.childNodes || []
        //     return _h(Tag, {
        //         props: {
        //             node,
        //         },
        //     }, childNodes.map(v => _tags(v)))
        // }

        return _h(
            'div', 
            { 
                class: 'html-highlight',
            },
            // [ _tags(this.doc) ],
            nodes.map(node => _h(Tag, {
                props: {
                    node,
                },
            })),
        )
    },
    
}
