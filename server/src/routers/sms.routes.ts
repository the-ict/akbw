import {
    Router,
} from "express";
import {
    send,
    verify
} from "../controllers/sms.controller";
import { validate } from "../middleware/validate.middleware";
import { sendSmsSchema, verifySmsSchema } from "../validators/sms.validator";

const router = Router();

router.post("/send", validate(sendSmsSchema), send);
router.post("/verify", validate(verifySmsSchema), verify)

export default router;