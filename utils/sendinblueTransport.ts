import Transports from 'npm:winston-transport';

import { sendEmail, User } from '../deps.ts';

interface ISendinblueTransportOpts {
    to: User;
    from: User;
    subject: string;
}

class SendinBlueTransport extends Transports {
    private options: ISendinblueTransportOpts;

    constructor(options: ISendinblueTransportOpts, winstonOptions?: Transports.TransportStreamOptions) {
        super(winstonOptions);

        this.options = options;
    }

    public log(info: { message: string, level: string }, next: () => void) {
        const { message } = info;
        sendEmail({
            to: [{ name: this.options.to.name, email: this.options.to.email }],
            htmlContent: `<p>${message}</p>`,
            subject: this.options.subject,
            sender: {
                email: this.options.from.email,
                name: this.options.from.name
            }
        }, false).finally(() => {
            next();
        });
    }

}

export default SendinBlueTransport;