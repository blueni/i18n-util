<script>
import I18nTag from './i18n-tag.vue'

export default {
    name: 'html-tag',

    props: {
        node: {
            type: Object,
            default: () => ({}),
        },
    },

    render(_h){
        let node = this.node
        let { start, end, noEnd } = node
        if(start || end){
            node = node.node
        }
        let nodeAttrs = node.attrs || []
        let attrs = {}
        nodeAttrs.forEach(attr => {
            attrs[attr.name] = attr.value
        })
        let childNodes = []
        let nodeName = node.nodeName
        let isTextTag = nodeName === '#text'

        if(start){
            childNodes.push(`<${nodeName}${nodeAttrs.map(v => ' ' + v.name + '="' + v.value + '"').join('')}${noEnd === true ? ' /' : ''}>`)
        }else if(end){
            childNodes.push(`</${nodeName}>`)
        }else if(isTextTag){
            childNodes.push(node.value)
        }
        childNodes.push(this.$slots.default)

        if(isTextTag){
            return _h(I18nTag, childNodes)
        }

        return _h('span', {
            class: {
                'html-tag': true,
                'html-text-tag': isTextTag,
                'html-tag-start': start,
                'html-tag-end': end,
            },
            attrs,
        }, childNodes)
    },

}
</script>
