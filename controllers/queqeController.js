
//const amqp = require('amqplib/callback_api');
const amqp = require('amqplib');


class QueqeController {

    /**
     * Constructor
     */
    constructor() { }


    /**
     * crea una cola
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
        var { url } = req.body;
        var { queueName } = req.body;

        let response = {
            code: '',
            message: '',
            queqe: ''
        }

        try {

            const connection = await amqp.connect('amqp://' + url);
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName, {
                durable: true
            });

            await channel.close();
            await connection.close();

            response.code = 200;
            response.message = 'queqe created';
            response.queqe = queueName
            res.status(200).json(response)

        } catch (error) {
            console.error(error)
            response.code = 404;
            response.message = error.toString();
            response.queqe = queueName
            res.status(404).send(response)
        }

    }

    /**
     * crea la cola si no existe y agrega un elemento a la cola 
     * @param {*} req 
     * @param {*} res 
     */

    async inserIntoQueue(req, res) {

        var { url } = req.body;
        var { queueName } = req.body;
        var { message } = req.body;

        let response = {
            code: '',
            message: '',
            queqe: ''
        }

        try {

            const connection = await amqp.connect('amqp://' + url);
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName, {
                durable: true
            });

            channel.sendToQueue(queueName, Buffer.from(message));

            await channel.close();
            await connection.close();

            response.code = 200;
            response.message = 'message created';
            response.queqe = queueName
            res.status(200).json(response)

        } catch (error) {
            console.error(error)
            response.code = 404;
            response.message = error.toString();
            response.queqe = queueName
            res.status(404).send(response)
        }
    }

    /**
     * obtiene un elemento de la cola
     * @param {*} req 
     * @param {*} res 
     */
    async getElementFromQueue(req, res) {

        var { url } = req.body;
        var { queueName } = req.body;


        let response = {
            code: '',
            message: '',
            queqe: ''
        }

        try {

            const connection = await amqp.connect('amqp://' + url);
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName);

            const message = await channel.get(queueName);
            if (message) {
                response.code = 200;
                response.message = message.content.toString();
                response.queqe = queueName
                res.status(200).json(response)
                channel.ack(message);
            } else {
                response.code = 200;
                response.message = '';
                response.queqe = queueName
                res.status(200).json(response)
            }

            await channel.close();
            await connection.close();

        } catch (error) {
            console.error(error)
            response.code = 404;
            response.message = error.toString();
            response.queqe = queueName
            res.status(404).send(response)
        }





    }

    /**
     * Elimina una cola y todos sus elementos
     * @param {*} req 
     * @param {*} res 
     */
    async deleteQueqe(req, res) {

    }

}

module.exports = QueqeController;