<template>
    <span @click="clickHandle" class="html-tag" :class="{'html-text-tag': !!text.trim()}"><slot /></span>
</template>

<script>
export default {
    name: 'i18n-tag',

    data(){
        return {
            text: '',
        }
    },

    computed: {
        file(){
            return this.$store.state.file
        },
        translates(){
            return this.$store.state.translates
        },
        json(){
            return this.$store.state.json
        },
        langs(){
            return this.$store.state.langs
        },
        currentLang(){
            return this.$store.state.currentLang
        },
    },

    mounted(){
        this.text = (this.$slots.default[0].text || '').trim()
    },

    methods: {
        clickHandle(){
            let translates = this.translates.slice()
            let text = this.text
            let item
            if(!text){
                return
            }
            for(let i=0;i<translates.length;i++){
                item = translates[i]
                if(item.text === text){
                    this.$store.commit('currentText', text)
                    return
                }
            }
            let i18nData = {
                text,
                edit: true,
                prop: text,
            }
            let langs = this.langs
            let currentLang = this.currentLang
            langs.sort((a, b) => {
                return a === currentLang ? -1 :
                        b === currentLang ? 1 :
                        0
            }).forEach(lang => {
                if(lang === currentLang){
                    i18nData[lang] = text
                }else{
                    i18nData[lang] = ''
                }
            })
            translates.push(i18nData)
            this.$store.commit('translates', translates)
            this.$store.commit('currentText', text)
        }
    }

}
</script>
