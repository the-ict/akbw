import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { checkAdmins } from "../middleware/admin.middleware";
import {
    createAskForProductChat,
    createAskForProductMessage,
    createHelpChat,
    createHelpChatMessage,
    getAskForProductChat,
    getHelpChat,
    getAllHelpChats,
    getAllAskForProductChats,
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

// User routes
router.post("/", auth, validate(createHelpChatSchema), createHelpChat);
router.get("/help-chat", auth, getHelpChat);
router.post("/help-chat-message", auth, validate(createHelpMessageSchema), createHelpChatMessage);

router.post("/ask-for-product-chat", auth, validate(createAskForProductChatSchema), createAskForProductChat)
router.get("/ask-for-product-chat", auth, getAskForProductChat);
router.post("/ask-for-product-message", auth, validate(createAskForProductMessageSchema), createAskForProductMessage);

// Admin routes
router.get("/admin/help-chats", checkAdmins, getAllHelpChats);
router.post("/admin/help-chat-message", checkAdmins, validate(createHelpMessageSchema), createHelpChatMessage);

router.get("/admin/ask-for-product-chats", checkAdmins, getAllAskForProductChats);
router.post("/admin/ask-for-product-message", checkAdmins, validate(createAskForProductMessageSchema), createAskForProductMessage);

export default router;