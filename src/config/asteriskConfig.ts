export default {
    port: Number(process.env.ASTERISK_PORT) || 5038,
    host: process.env.ASTERISK_HOST || '',
    user: process.env.ASTERISK_USER || '',
    password: process.env.ASTERISK_PASS || '',
    prefix: process.env.ASTERISK_CHANNEL_PREFIX || '',
    channel_ip: process.env.ASTERISK_CHANNEL_IP || '',
}