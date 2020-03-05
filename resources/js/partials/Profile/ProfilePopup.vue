<template>
    <SimpleModal title="Profile" @modal-close="$emit('modal-close')">
        <div>modal data</div>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '~/modals/SimpleModal'
    export default {
        name: "ProfilePopup",
        components: {SimpleModal}
    }
</script>

<style scoped>

</style>
