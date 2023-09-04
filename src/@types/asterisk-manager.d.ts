declare module 'asterisk-manager' {
    export default function Ami(
        port: number,
        host: string,
        user: string,
        password: string
    ): any
}