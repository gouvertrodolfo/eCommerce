import OrdenesApi from '../api/OrdenesApi.js'
const ordenesApi = new OrdenesApi();

export async function obtener(req, res) {
    const { email } = req.user

    try {
        const orden = await ordenesApi.obtener(email)
        res.status(200).json(orden)
    } catch (err) {
        res.status(err.estado).json(err)
    }
}
export async function agregar(req, res) {
    const { email } = req.user

    try {
        const orden = await ordenesApi.agregar(email)
        res.status(201).json(orden)
    } catch (err) {
        res.status(err.estado).json(err)
    }
}