<template>
    <div class="detail-page">
        <div class="source-area">
            <pre v-if="file">
                <html-doctype></html-doctype>
                <html-tag :file="reader"></html-tag>
            </pre>
        </div>

        <div class="target-area">
            <ul>
                <li 
                    class="translate-tag" 
                    :class="{edit: item.edit}" 
                    v-for="(item, index) in translates" 
                    :key="index"                    
                >
                    <template v-if="!!item.edit && currentText === item.text">
                        <input class="data-prop" type="text" placeholder="属性名" v-model="item.prop" />
                        <textarea v-for="(lang, key) in langs" :key="key" v-model="item[lang]" :placeholder="lang"></textarea>
                    </template>

                    <template v-else>
                        <span @click.stop="deleteTranslate(item)" class="del-translate">&times;</span>
                        <span @click="itemClick(item)" class="translate-source" :title="item.text">{{ item.text }}</span>
                    </template>
                </li>
            </ul>
        </div>

        <div class="bottom-tool">
            <button @click="toJson" class="to-json">生成JSON文件</button>
        </div>
    </div>
</template>

<script>
import FileSaver from 'file-saver'

export default {
    name: 'detail',

    data(){
        return {
            reader: null,
        }
    },

    computed: {
        file(){
            return this.$store.state.file
        },
        translates(){
            return this.$store.state.translates
        },
        currentText(){
            return this.$store.state.currentText
        },
        json(){
            return this.$store.state.json
        },
        langs(){
            return this.$store.state.langs
        },
    },

    created(){
        if(!this.file){
            this.$router.replace('/')
            return
        }
        let reader = new FileReader
        reader.readAsText(this.file)
        reader.addEventListener('loadend', (ev) => {
            this.reader = ev.target.result
        })
    },

    methods: {
        itemClick(item){
            let currentText = this.currentText
            if(currentText === item.text){
                item.edit = !item.edit
                return
            }
            
            this.$store.commit('currentText', item.text)
            item.edit = true            
        },

        deleteTranslate(trans){
            let translates = this.translates.slice()
            let item
            let text = trans.text
            for(let i=0;i<translates.length;i++){
                item = translates[i]
                if(item.text === text){
                    translates.splice(i, 1)
                    this.$store.commit('translates', translates)
                    return
                }
            }
        },

        toJson(){
            let translates = this.translates
            let json = {}
            let langs = this.langs
            let file = this.file
            langs.forEach(lang => {
                let langData = (json[lang] = {})
                translates.forEach(item => {
                    langData[item.prop] = item[lang]
                })
            })
            let filename = file.name.replace(/\.[^\.]+$/, '')
            filename += '-i18n.json'
            let blob = new Blob([JSON.stringify(json, null, 4)], {type: 'text/plain;charset=utf-8'})
            FileSaver.saveAs(blob, filename)
        },
    },

}
</script>
