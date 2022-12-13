import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

import winston from 'npm:winston@^3.8.2';
import SendinBlueTransport from './sendinblueTransport.ts';

const logger = winston.createLogger({
    level: "info",
    format: Deno.env.get("DENO_ENV") === "production" ? winston.format.json() : winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new SendinBlueTransport(
            {
                subject: "Example of Error Email Subject",
                from: {
                    name: "John Doe",
                    email: Deno.env.get("SENDER_EMAIL")!
                },
                to: {
                    name: "John Doe 2",
                    email: Deno.env.get("EMAIL_TO")!,
                }
            },
            {
                level: "error",
                format: winston.format.printf((info) => `${new Date()} [LEVEL]: ${info.level.toUpperCase()} [MSG]: ${info.message}`)
            }
        )
    ]
});

export default logger;