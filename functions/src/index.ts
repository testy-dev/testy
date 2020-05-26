import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

// On sign up.
export { default as processSignUp } from "./processSignUp";
// Make paths from blocks
export { default as processBlocksToPaths } from "./processBlocksToPaths";
