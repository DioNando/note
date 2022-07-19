import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { note: Note } = prisma

export default {
    getAll(req, res) {
        Note.findMany({
            orderBy: [
                {
                    id: 'desc',
                },
            ],
        })
            .then((data) => {
                return res.status(200).send(data)
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message || 'Some error occured when retrieving notes',
                })
            })
    },

    get(req, res) {
        const { id } = req.params

        Note.findUnique({
            where: {
                id: parseInt(id),
            },
        })
            .then((data) => {
                if (data) {
                    return res.status(200).send(data)
                } else {
                    return res.status(404).send({
                        message: `Cannot find note with id=${id}`,
                    })
                }
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message || 'Some error occured when retrieving note',
                })
            })
    },

    create(req, res) {
        const { title, description, content } = req.body

        Note.create({
            data: {
                title: title,
                description: description,
                content: content,
            },
        })
            .then(() => {
                return res.status(200).send({
                    message: 'Note was created successfully',
                })
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message || 'Some error occured when creating note',
                })
            })
    },

    update(req, res) {
        const { id } = req.params
        const { title, description, content } = req.body

        Note.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title,
                description: description,
                content: content,
            },
        })
            .then(() => {
                return res.status(200).send({
                    message: 'Note was updated successfully',
                })
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message || 'Some error occured when updating note',
                })
            })
    },

    delete(req, res) {
        const { id } = req.params

        Note.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(() => {
                return res.status(200).send({
                    message: 'Note was deleted successfully',
                })
            })
            .catch((error) => {
                return res.status(500).send({
                    message: error.message || 'Some error occured when deleting note',
                })
            })
    },
}
