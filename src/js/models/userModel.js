import db from '../config/db.js';

export const createUser = async (userData) => {
    const { first_name, last_name, email, password } = userData;
    const query = `INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    return db.query(query, [first_name, last_name, email, password]);
};

export const getAllUsers = async () => {
    const query = `SELECT * FROM User`;
    const result = await db.query(query);
    return result[0];
};

export const findUserById = async (id) => {
    const query = `SELECT * FROM User WHERE id = ${id}`;
    const result = await db.query(query, [id]);
    return result[0];
};

export const updateUserById = async (id, userData) => {
    const fields = Object.keys(userData);
    const values = Object.values(userData);

    const setClause = fields
        .map((field) => `${field} = ?`)
        .join(', ');

    // Обновляем пользователя
    const updateQuery = `
        UPDATE User
        SET ${setClause}
        WHERE id = ?;
    `;
    await db.execute(updateQuery, [...values, id]);

    const selectQuery = `
        SELECT * 
        FROM User
        WHERE id = ?;
    `;
    const [rows] = await db.execute(selectQuery, [id]);

    return rows[0];
};

export const deleteUserById = async (id) => {
    const query = `DELETE FROM User WHERE id = ${id}`;
    await db.query(query, [id]);
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM User WHERE email = '${email}'`;
    const result = await db.query(query, [email]);
    return result[0];
};