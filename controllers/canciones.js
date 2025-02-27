import { conn } from "../db.js";

const getCanciones = async (_, res) => {


    try {
        const [canciones] = await conn.query(
            `SELECT * FROM canciones`
        );
        res.json(canciones);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
};

const getCancion = async (req, res) => {
    try {
        const [cancion] = await conn.query(
            `SELECT * FROM canciones WHERE id = ?`,
            [req.params.id]
        );
        res.json(cancion[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
};

const createCancion = async (req, res) => {

    try {
        await conn.query(
            `INSERT INTO canciones (nombre, album, duracion) VALUES (?, ?, ?)`,
            [req.body.nombre, req.body.album, req.body.duracion,]
        );
        res.json({ message: "Canción creada" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = async (req, res) => {
    try {
        await conn.query(
            `UPDATE canciones SET nombre = ?, album = ?, duracion = ?`,
            [req.body.nombre, req.body.album, req.body.duracion,]
        );
        res.json({ message: "Canción actualizada" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = async (req, res) => {
    try {
        await conn.query(
            `DELETE FROM canciones WHERE id = ?`,
            [req.params.id]
        );
        res.json({ message: "Canción eliminada" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const reproducirCancion = async (req, res) => {
    try {
        await conn.query(
            `UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id = ?`,
            [req.params.id]
        );
        res.json({ message: "Reproducción aumentada" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;
