"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/board", ctrl.output.board);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/post_view", ctrl.output.postView);
router.get("/community", ctrl.output.community);
router.get("/message", ctrl.output.message);
router.get("/message_chat", ctrl.output.messageChat);
router.post("/message/chat/send", ctrl.process.sendMessage);

// POST 요청 처리 추가
router.post("/board/write", ctrl.process.writePost); // board/write 경로 추가

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

// 게시글 삭제 처리
router.delete("/delete-post/:postnum", ctrl.process.deletePost);

// 메시지 추출 처리 추가
router.post("/message/chat/extract", ctrl.process.extractMessages); // 새로운 경로 추가

module.exports = router;
