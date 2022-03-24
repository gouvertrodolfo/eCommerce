import { Router } from 'express'

const routesInfo = new Router();

info.get('/', (req, res) => {

    const info = {
        'Path': process.execPath,
        'SO:': process.platform,
        'id_proceso ': process.pid,
        'Node_version': process.version,
        'Carpeta_Proyecto': process.cwd(),
        'Memoria': process.memoryUsage().rss
    }

    res.render('pages/info',{info})
});


export default routesInfo;