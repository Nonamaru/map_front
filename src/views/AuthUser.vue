<template>
<div class="container">
    <div class="desktop-auth-content">
        <div class="logo">
            <img src="@/assets/logo.svg" />
        </div>
        <div class="header">
            <text class="header-title">Авторизация</text>
            <text class="header-description">Авторизируйтесь, чтобы просматривать камеры</text>
        </div>
        <div class="inputs">
            <div class="form-control">
                <input id="email" type="text" v-model="loginUser.login" required />
                <label for="email">Номер договора</label>
            </div>
            <div class="form-control">
                <input 
                    id="password" 
                    :type="pass" 
                    v-model="loginUser.password" 
                    required 
                    @keydown.enter="authUser()"
                />
                <label for="phone">Пароль</label>
                <svg v-if="pass == 'password'" @click="pass = 'text'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.95245 4.2436C9.29113 4.19353 9.64051 4.16667 10.0003 4.16667C14.2545 4.16667 17.0461 7.9207 17.9839 9.40569C18.0974 9.58542 18.1542 9.67528 18.1859 9.81389C18.2098 9.91799 18.2098 10.0822 18.1859 10.1863C18.1541 10.3249 18.097 10.4154 17.9827 10.5963C17.7328 10.9918 17.3518 11.5476 16.8471 12.1504M5.6036 5.59586C3.80187 6.81808 2.57871 8.51615 2.01759 9.4044C1.90357 9.58489 1.84656 9.67514 1.81478 9.81373C1.79091 9.91783 1.7909 10.082 1.81476 10.1861C1.84652 10.3247 1.90328 10.4146 2.01678 10.5943C2.95462 12.0793 5.74618 15.8333 10.0003 15.8333C11.7157 15.8333 13.1932 15.223 14.4073 14.3972M2.50035 2.5L17.5003 17.5M8.23258 8.23223C7.78017 8.68464 7.50035 9.30964 7.50035 10C7.50035 11.3807 8.61963 12.5 10.0003 12.5C10.6907 12.5 11.3157 12.2202 11.7681 11.7678" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-if="pass == 'text'" @click="pass = 'password'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01677 10.5944C1.90328 10.4147 1.84654 10.3248 1.81477 10.1863C1.79091 10.0822 1.79091 9.918 1.81477 9.8139C1.84654 9.67532 1.90328 9.58547 2.01677 9.40577C2.95461 7.92078 5.74617 4.16675 10.0003 4.16675C14.2545 4.16675 17.0461 7.92078 17.9839 9.40577C18.0974 9.58547 18.1541 9.67532 18.1859 9.8139C18.2098 9.918 18.2098 10.0822 18.1859 10.1863C18.1541 10.3248 18.0974 10.4147 17.9839 10.5944C17.0461 12.0794 14.2545 15.8334 10.0003 15.8334C5.74617 15.8334 2.95461 12.0794 2.01677 10.5944Z" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.0003 12.5001C11.381 12.5001 12.5003 11.3808 12.5003 10.0001C12.5003 8.61937 11.381 7.50008 10.0003 7.50008C8.61962 7.50008 7.50034 8.61937 7.50034 10.0001C7.50034 11.3808 8.61962 12.5001 10.0003 12.5001Z" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
            </div>
        </div>
        <div class="login-button" @click="authUser()">
            <text>Войти</text>
        </div>
    </div>
    <div class="mobile-auth-content">
        <div class="logo">
            <img src="@/assets/logo.svg" />
        </div>
        <div class="header">
            <text class="header-title">Авторизация</text>
            <text class="header-description">Авторизируйтесь, чтобы просматривать камеры</text>
        </div>
        <div class="inputs">
            <div class="form-control">
                <input id="email" type="text" v-model="loginUser.login" required />
                <label for="email">Номер договора</label>
            </div>
            <div class="form-control">
                <input 
                    id="password" 
                    :type="pass" 
                    v-model="loginUser.password" 
                    required 
                />
                <label for="phone">Пароль</label>
                <svg v-if="pass == 'password'" @click="pass = 'text'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.95245 4.2436C9.29113 4.19353 9.64051 4.16667 10.0003 4.16667C14.2545 4.16667 17.0461 7.9207 17.9839 9.40569C18.0974 9.58542 18.1542 9.67528 18.1859 9.81389C18.2098 9.91799 18.2098 10.0822 18.1859 10.1863C18.1541 10.3249 18.097 10.4154 17.9827 10.5963C17.7328 10.9918 17.3518 11.5476 16.8471 12.1504M5.6036 5.59586C3.80187 6.81808 2.57871 8.51615 2.01759 9.4044C1.90357 9.58489 1.84656 9.67514 1.81478 9.81373C1.79091 9.91783 1.7909 10.082 1.81476 10.1861C1.84652 10.3247 1.90328 10.4146 2.01678 10.5943C2.95462 12.0793 5.74618 15.8333 10.0003 15.8333C11.7157 15.8333 13.1932 15.223 14.4073 14.3972M2.50035 2.5L17.5003 17.5M8.23258 8.23223C7.78017 8.68464 7.50035 9.30964 7.50035 10C7.50035 11.3807 8.61963 12.5 10.0003 12.5C10.6907 12.5 11.3157 12.2202 11.7681 11.7678" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-if="pass == 'text'" @click="pass = 'password'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01677 10.5944C1.90328 10.4147 1.84654 10.3248 1.81477 10.1863C1.79091 10.0822 1.79091 9.918 1.81477 9.8139C1.84654 9.67532 1.90328 9.58547 2.01677 9.40577C2.95461 7.92078 5.74617 4.16675 10.0003 4.16675C14.2545 4.16675 17.0461 7.92078 17.9839 9.40577C18.0974 9.58547 18.1541 9.67532 18.1859 9.8139C18.2098 9.918 18.2098 10.0822 18.1859 10.1863C18.1541 10.3248 18.0974 10.4147 17.9839 10.5944C17.0461 12.0794 14.2545 15.8334 10.0003 15.8334C5.74617 15.8334 2.95461 12.0794 2.01677 10.5944Z" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.0003 12.5001C11.381 12.5001 12.5003 11.3808 12.5003 10.0001C12.5003 8.61937 11.381 7.50008 10.0003 7.50008C8.61962 7.50008 7.50034 8.61937 7.50034 10.0001C7.50034 11.3808 8.61962 12.5001 10.0003 12.5001Z" stroke="#AAAEB3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
            </div>
        </div>
        <div class="login-button" @click="authUser()">
            <text>Войти</text>
        </div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
            pass: 'password',
            loginUser:{
                login: '',
                password: ''
            }
        }
    },
    methods:{
        authUser(){
            if (this.loginUser.login == 'admin' && this.loginUser.password == 'admin'){
                localStorage.setItem('id', '78a-52d-66s-fdr');
                this.$router.push({name: 'home'})
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 900px){
.mobile-auth-content{display: none;}
.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 456px 1fr;
}
.desktop-auth-content{
    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
        margin-bottom: 146px;
        img{
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    .header{
        text-align: center;
        display: flex;
        flex-direction: column;
        .header-title{
            color: var(--card-title-color);
            font-size: var(--font-32-to-rem);
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.128px; 
        }
        .header-description{
            color: var(--card-title-color);
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: 0.272px;
        }
    }
    .inputs{
        margin-top: 32px;
        margin-bottom: 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: var(--font-14-to-rem);
        width: 100%;
        .form-control{
            position: relative;
            width: 100%;
            label{
                display: block;
                position: absolute;
                left: 15px;
                top: 15px;
                color: var(--placeholder-color);
                -webkit-transition: .2s;
                transition: .2s;
                opacity: .6;
                font-weight: 400;
            }
            input{
                border-radius: 10px;
                border: 1px solid var(--input-border-color);
                background-color: white;
                padding: 16px;
                width: 92%;
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
            svg{
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(-50%, -50%);
                cursor: pointer;
            }
        }
    }
    .login-button{
        width: 94%;
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
}



@media screen and (max-width: 900px){
.desktop-auth-content{display: none;}
.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 337px 1fr;
}
.mobile-auth-content{
    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
        margin-bottom: 100px;
        img{
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    .header{
        text-align: center;
        display: flex;
        flex-direction: column;
        .header-title{
            color: var(--card-title-color);
            font-size: var(--font-20-to-rem);
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.06px;
        }
        .header-description{
            color: var(--card-title-color);
            font-size: var(--font-14-to-rem);
            font-weight: 400;
            letter-spacing: 0.238px;
        }
    }
    .inputs{
        margin-top: 24px;
        margin-bottom: 32px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: var(--font-14-to-rem);
        width: 100%;
        .form-control{
            position: relative;
            width: 100%;
            label{
                display: block;
                position: absolute;
                left: 15px;
                top: 15px;
                color: var(--placeholder-color);
                -webkit-transition: .2s;
                transition: .2s;
                opacity: .6;
                font-size: var(--font-14-to-rem);
                font-weight: 400;
            }
            input{
                border-radius: 10px;
                border: 1px solid var(--input-border-color);
                background-color: white;
                padding: 16px;
                width: 90%;
                &:focus{
                    outline: none;
                }
                &:valid + label,
                &:focus + label{
                    top: 0;
                    font-size: var(--font-12-to-rem);
                    color: var(--placeholder-color);
                    letter-spacing: 0.048px;
                }
            }
            svg{
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(-50%, -50%);
                cursor: pointer;
            }
        }
    }
    .login-button{
        width: 90%;
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
}
</style>