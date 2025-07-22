import {Router} from "express";
import {saveContact, getAllContacts} from "../controllers/contact.controller";

const contactRouter: Router = Router();

contactRouter.get("/all", getAllContacts);
contactRouter.post("/save", saveContact)

export default contactRouter;