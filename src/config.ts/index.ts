import config from "./config"

const appMap = () => {
    return (
        {
            app: {
                NODE_ENV: config("NODE_ENV"),
                PORT: config('PORT'),
                API_KEY: config('API_KEY'),
                FILE_PATH: config('FILE_PATH'),
                HOST: '',
                BASE_URL: config('BASE_URL'),
                API_VERSION: config('API_VERSION'),
                GATE_WAY_ENDPOINT: config('GATE_WAY_ENDPOINT'),
                SECRET: config('CRYPTO_SECRET'),
                SALT: config('SALT'),
                REDIS_HOST: config('REDIS_HOST'),
                CRYPTO_SECRET: config('CRYPTO_SECRET'),
                IV: config('IV')
            },
            jwt: {
                SECRET: config('SECRET')
            },
            crypto: {
                CRYPTO_SECRET: config('CRYPTO_SECRET'),
                SALT: config('SALT'),
                hashALGORITHM: config('hashALGORITHM'),
                encALGORITHM: config('encALGORITHM')

            },
            mailer: {
                MAIL_PORT: config("MAIL_PORT"),
                MAIL_HOST: config("MAIL_HOST"),
                MAIL_USER: config("MAIL_USER"),
                MAIL_PASS: config('MAIL_PASS'),
                TEMPLATE_SRC: config('TEMPLATE_SRC')
            },
            google: {
                CLIENT_SECRET: config("CLIENT_SECRET"),
                CLIENT_ID: config("CLIENT_ID"),
                SSO_REDIRECT: config("SSO_REDIRECT"),
                SSO_REDIRECT_FE: config("SSO_REDIRECT_FE")
            }
        })
}


const appConfig = appMap()
export default appConfig