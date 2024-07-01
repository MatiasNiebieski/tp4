import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    try {
        const [albumes] = await conn.query(
            `SELECT * FROM albumes`
        );
        res.json(albumes);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
};

const getAlbum = async (req, res) => {
    try {
        const [album] = await conn.query(
            `SELECT * FROM albumes WHERE id = ?`,
            [req.params.id]
        );
        res.json(album[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
};

const createAlbum = async (req, res) => {
    try {
        const [result] = await conn.query(
            `INSERT INTO albumes (nombre, artista) VALUES (?, ?)`,
            [req.body.nombre, req.body.artista]
        );
        res.json({ id: result.insertId});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const updateAlbum = async (req, res) => {
    try {
        await conn.query(
            `UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?`,
            [req.body.nombre, req.body.artista, req.params.id]
        );
        res.json({ id: req.params.id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = async (req, res) => {
    try {
        await conn.query(
            `DELETE FROM albumes WHERE id = ?`,
            [req.params.id]
        );
        res.json({ message: "Album eliminado" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getCancionesByAlbum = async (req, res) => {
    try {
        const [canciones] = await conn.query(
            `SELECT * FROM canciones WHERE album = ?`,
            [req.params.id]
        );
        res.json(canciones);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
