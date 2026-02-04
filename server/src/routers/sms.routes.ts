import {
    Router,
    type NextFunction,
    type Response,
    type Request
} from "express";
import {
    randomNumbers
} from "../utils/random.utils";
import {
    telegramSms
} from "../services/sms.service";
import {
    prisma
} from "../db/client.js";
import {
    sendSmsSchema,
    verifySmsSchema
} from "../validators/sms.validator.js";

const router = Router();

router.post("/send", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = sendSmsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0]?.message });
        }

        console.log("request: ", req.body);

        const randomDigitCode = randomNumbers();

        const existingVerify = await prisma.verify.findUnique({
            where: {
                phone: req.body.phone
            }
        });

        if (existingVerify) {
            const currentTime = Date.now();
            const expiresDate = existingVerify.createdAt.getTime() + 60 * 1000;
            if (currentTime < expiresDate) {
                return res.status(400).json({
                    message: "Please wait 1 minute before sending another code"
                });
            } else {
                await prisma.verify.delete({
                    where: {
                        phone: req.body.phone
                    }
                })
            }
        };

        const verifyCode = await prisma.verify.upsert({
            where: {
                phone: req.body.phone
            },
            update: {
                code: String(randomDigitCode),
                createdAt: new Date() // Reset createdAt to extend validity
            },
            create: {
                code: String(randomDigitCode),
                phone: req.body.phone
            }
        });

        const text = `SIZNING AKBW UCHUN TASDIQLASH KODINGIZ: ${randomDigitCode}`;

        telegramSms(text);

        return res.status(201).json({
            message: "Code created Successfully",
            ok: true,
            code: verifyCode.id
        });
    } catch (error) {
        next(error);
    }
});

router.post("/verify", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = verifySmsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0]?.message });
        }

        const verifyCode = await prisma.verify.findUnique({
            where: {
                phone: req.body.phone,
            }
        });

        if (!verifyCode?.id) {
            return res.status(404).json({
                message: "Code not found",
                ok: false,
            });
        }

        const currentTime = Date.now();
        const expiresDate = verifyCode.createdAt.getTime() + 60 * 1000;

        if (currentTime > expiresDate) {
            return res.status(400).json({
                message: "Code expired",
                ok: false,
            });
        }

        if (verifyCode.code !== req.body.code) {
            return res.status(400).json({
                message: "Invalid code",
                ok: false,
            });
        }

        await prisma.verify.delete({
            where: {
                id: verifyCode.id
            }
        });

        return res.status(200).json({
            message: "Code verified successfully",
            ok: true,
        });
    } catch (error) {
        next(error);
    }
})

export default router;