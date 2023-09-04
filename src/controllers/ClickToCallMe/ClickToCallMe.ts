import {Request, Response} from "express";
import asteriskManager from 'asterisk-manager';
import asteriskConfig from "../../config/asteriskConfig";

export class ClickToCallMe {
    async handle(request: Request, response: Response) {
        const {number} = request.params;

        const ami = asteriskManager(
            asteriskConfig.port,
            asteriskConfig.host,
            asteriskConfig.user,
            asteriskConfig.password,
        )

        ami.action({
            'action': 'originate',
            'channel': `SIP/${asteriskConfig.prefix}${number}@${asteriskConfig.channel_ip}`,
            'context': 'from-internal',
            'exten': '600',
            'priority': 1,
        }, function(err: any, res: any)  {
            console.log(err);
            console.log('------')
            console.log(res)
        })

        return response.json('running call')
    }
}