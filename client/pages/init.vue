<template>
    <div class="init-page">
        <form class="init-form">
            <div class="file-upload">
                选择HTML格式文件编辑
                <label class="upload-label">
                    <input 
                        type="file" 
                        draggable="true"
                        @change="fileChange"
                    />
                </label>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'init',

    data(){
        return {

        }
    },

    created(){

    },

    methods: {
        fileChange(event){
            let file = event.target.files[0]
            if(!/\.html?$/.test(file.name)){
                alert('不支持的文件类型！')
                return
            }
            
            this.$store.commit('file', file)
            this.$router.push('/detail')
        },
    },
}
</script>
