<template>
<div class="desktop-popup">
    <div class="close-popup" @click="$emit('close', false)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> 
    </div>
    <div class="popup-title">
        <text>Получить архив записи</text>
    </div>
    <div class="popup-inputs">
        <div class="form-control">
            <input v-model="getArchiveForm.email" id="email" type="text" required />
            <label for="email">Email</label>
        </div>
        <div class="form-control">
            <input v-model="getArchiveForm.phone" id="phone" type="text" required />
            <label for="phone">Телефон</label>
        </div>
        <div class="form-control">
            <input v-model="getArchiveForm.address" id="address" type="text" required />
            <label for="address">Адрес</label>
        </div>
        <textarea v-model="getArchiveForm.comment" placeholder="Комментарий"></textarea>
        <text>Нажимая кнопку «Отправить заявку», вы соглашаетесь с <a href="https://k-telecom.org/politika-konfidentsialnosti/">Условиями обработки персональных данных</a></text>
    </div>
    <div class="popup-button" @click="send_form()">
        <text>Отправить заявку</text>
    </div>
</div>
<div class="popup-shadow" @click="$emit('close', false)"></div>
</template>
<script>
export default{
    props:['address_input'],
    data(){
        return{
            getArchiveForm:{
                email: '',
                phone: '',
                address: this.address_input,
                comment: ''
            }
        }
    },
    methods:{
        send_form(){
            console.log(this.getArchiveForm);
        }
    }
}
</script>
<style lang="scss" scoped>
.popup-shadow{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.20);
    width: 100vw;
    height: 100vh;
    z-index: 7;
}
.desktop-popup{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    width: 485px;
    background-color: white;
    padding: 40px 32px;
    border-radius: 16px;
    box-shadow: 0px 2px 8px 0px rgba(66, 66, 70, 0.12);
    .close-popup{
        position: absolute;
        width: 24px;
        height: 24px;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
    .popup-title{
        text-align: center;
        text{
            color: var(--card-title-color);
            font-size: var(--font-24-to-rem);
            font-weight: 700;
        }
    }
    .popup-inputs{
        margin-top: 24px;
        margin-bottom: 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: var(--font-14-to-rem);
        .form-control{
            position: relative;
            label{
                display: block;
                position: absolute;
                left: 15px;
                top: 15px;
                color: var(--placeholder-color);
                -webkit-transition: .2s;
                transition: .2s;
                opacity: .6;
                font-weight: var(--font-12-to-rem);
            }
            input{
                border-radius: 10px;
                border: 1px solid var(--input-border-color);
                background-color: white;
                padding: 16px;
                width: 93%;
                &:focus{
                    outline: none;
                }
                &:valid + label,
                &:focus + label{
                    top: 0;
                    font-size: var(--font-12-to-rem);
                    color: var(--placeholder-color);
                }
            }
        }
        textarea{
            border-radius: 10px;
            border: 1px solid var(--input-border-color);
            background-color: white;
            padding: 8px 16px;
            resize: none;
            height: 88px;
            &:focus{
                outline: none;
            }
            &::placeholder{
                color: var(--placeholder-color);
                font-size: var(--font-14-to-rem);
            }
        }
        text{
            color: rgba(45, 45, 45, 0.50);
            line-height: 18px;
            a{
                color: var(--colors-link);
                text-decoration: underline;
            }
        }
    }
    .popup-button{
        background-color: var(--card-button-background);
        border-radius: 10px;
        padding: 16px;
        text-align: center;
        &:hover{
            cursor: pointer;
            background: var(--card-button-background-hover);
        }
        &:active{
            background: var(--card-button-background-active);
        }
        text{
            font-size: 1rem;
            font-weight: 600;
            color: white;
        }
    }
}
</style>