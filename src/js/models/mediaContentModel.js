import db from '../config/db.js';
import AppError from '../utils/appError.js';

export const insertMediaContent = async (contentData) => {
    const { title, description, body, content_type, user_id } = contentData;
    const query = `
    INSERT INTO MediaContent (title, description, body, content_type, user_id)
    VALUES (?, ?, ?, ?, ?);
  `;
    const result = await db.query(query, [title, description, body, content_type, user_id]);
    return result[0];
};

export const getAllMediaContents = async () => {
    const query = `SELECT * FROM MediaContent`;
    const result = await db.query(query);
    return result[0];
};

export const getMediaContentById = async (id) => {
    const query = `SELECT * FROM MediaContent WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0] || null;
};

export const updateMediaContentById = async (id, contentData) => {
    const fields = Object.keys(contentData);
    const values = Object.values(contentData);

    if (!fields.length) {
        throw new AppError('Nothing to update', 400);
    }

    const setClause = fields
        .map((field) => `${field} = ?`)
        .join(', ');

    // Обновляем пользователя
    const updateQuery = `
        UPDATE MediaContent
        SET ${setClause}
        WHERE id = ?;
    `;
    await db.execute(updateQuery, [...values, id]);

    const selectQuery = `
        SELECT * 
        FROM MediaContent
        WHERE id = ?;
    `;
    const [rows] = await db.execute(selectQuery, [id]);

    return rows[0];
};

export const deleteMediaContentById = async (id) => {
    const query = `DELETE FROM MediaContent WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0] || null;
};