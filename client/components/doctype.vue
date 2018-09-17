<template>
    <span class="html-tag doctype">
        {{ text || slots.default || '' }}
    </span>
</template>

<script>
export default {
    name: 'tag-doctype',

    props: {
        text: {
            type: String,
            default: '<!DOCTYPE html>'
        }
    }
}
</script>

