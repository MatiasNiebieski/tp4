import { conn } from "../db.js";

const getArtistas = async (_, res) => {

    try {
        const [artistas] = await conn.query(
            `SELECT * FROM artistas`
        );
        res.json(artistas);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
};

const getArtista = async (req, res) => {
    try {
        const [artista] = await conn.query(
            `SELECT * FROM artistas WHERE id = ?`,
            [req.params.id]
        );
        res.json(artista[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
};

const createArtista = async (req, res) => {

    try {
        const [result] = await conn.query(
            `INSERT INTO artistas (nombre) VALUES (?)`,
            [req.body.nombre]
        );
        res.json({ id: result.insertId });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = async (req, res) => {

    try {
        await conn.query(
            `UPDATE artistas SET nombre = ? WHERE id = ?`,
            [req.body.nombre, req.params.id]
        );
        res.json({ message: "Artista actualizado" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
};

const deleteArtista = async (req, res) => {

    try {
        await conn.query(
            `DELETE FROM artistas WHERE id = ?`,
            [req.params.id]
        );
        res.json({ message: "Artista eliminado" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getAlbumesByArtista = async (req, res) => {

    try {
        const [albumes] = await conn.query(
            `SELECT * FROM albumes WHERE artista = ?`,
            [req.params.id]
        );
        res.json(albumes);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
};

const getCancionesByArtista = async (req, res) => {

    try {

        const [canciones] = await conn.query(
            `SELECT c.* FROM canciones c JOIN albumes a ON c.album = a.id WHERE a.artista = ?`,
            [req.params.id]
        );
        res.json(canciones);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
