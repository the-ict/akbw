import { Router } from "express";
import {
    createAskForProductChat,
    createAskForProductMessage,
    createHelpChat,
    createHelpChatMessage,
} from "../controllers/chat.controller";
import {
    validate
} from "../middleware/validate.middleware";
import {
    createAskForProductChatSchema,
    createAskForProductMessageSchema,
    createHelpChatSchema,
    createHelpMessageSchema
} from "../validators/chat.validator";

const router = Router();

router.post("/", validate(createHelpChatSchema), createHelpChat);
router.post("/help-chat-message", validate(createHelpMessageSchema), createHelpChatMessage);
router.post("/ask-for-product-chat", validate(createAskForProductChatSchema), createAskForProductChat)
router.post("/ask-for-product-message", validate(createAskForProductMessageSchema), createAskForProductMessage);


export default router;