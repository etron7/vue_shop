<template>
    <div class="popup-wrapper" ref="popup_wrapper">
        <div class="popup">
            <div class="popup-header">
                <span class="popup-title">{{popupTitle}}</span>
                <span class="popup-close">
                    <v-icon @click="closePopup">
                        mdi-close-circle
                    </v-icon>
                </span>
            </div>
            <div class="popup-content">
                <slot></slot>
            </div>
            <div class="popup-footer">
                <!-- <v-btn tile color="warning" @click="closePopup">Закрыть</v-btn> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "popup",
    props: {
        popupTitle: {
            type: String,
            default: 'Popup title'
        }
    },
    methods: {
        closePopup() {
            this.$emit('closePopup')
        }
    },
    mounted() {
        // Close modal by background free space
        let ctx = this;
        document.addEventListener('click', function(item) {
            if (item.target === ctx.$refs['popup_wrapper']) {
                ctx.closePopup()
            }
        })
    },
}
</script>

<style>
.popup-wrapper {
    background: rgba(64, 64, 64, 0.445);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
}
.popup {
    padding: 16px;
    position: fixed;
    top: 200px;
    margin: auto;
    right: 0;
    left: 0;
    width: 400px;
    background: white;
    box-shadow: 0 0 10px rgb(111 92 92 / 50%);
    z-index: 3;
}
.popup-header {
    display: flex;
    justify-content: space-between;
    color: teal;
}
.popup-title {
    font-size: 1.5rem;
}
.popup-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mdi-close-circle::before {
    content: "\F0159";
    color: teal;
    cursor: pointer;
    font-size: 2rem
}
</style> 
