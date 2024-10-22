const db = require("../config/db");

class CommentStorage {
    static saveComment(comments) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO comments (comment, board_id, member_id, modify_regdate, date, answernum, parentnum, ref, step)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(query, [
                comments.comment,
                comments.board_id,
                comments.member_id,
                comments.modify_regdate,
                comments.date,
                comments.answernum,
                comments.parentnum,
                comments.ref,
                comments.step,
            ], (err, result) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static getCommentsByPostId(board_id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM comments 
                WHERE board_id = ? 
                ORDER BY IF(parentnum = 0, commentsID, parentnum), date ASC
            `;
            db.query(query, [board_id], (err, results) => {
                if (err) reject(`${err}`);
                resolve(results);
            });
        });
    }    

    static getCommentById(commentsID) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM comments WHERE commentsID = ?";
            db.query(query, [commentsID], (err, result) => {
                if (err) reject(`${err}`);
                resolve(result[0]);
            });
        });
    }
}

module.exports = CommentStorage;