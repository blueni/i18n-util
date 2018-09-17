import DocType from './doctype.vue'
import HtmlTag from './html-doc'

let installed = false
export default {
    install(Vue){
        if(installed){
            return
        }
        installed = true

        Vue.component('html-doctype', DocType)
        Vue.component('html-tag', HtmlTag)
    }
}
