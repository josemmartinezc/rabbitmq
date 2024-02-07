
var amqp = require('amqplib/callback_api');


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
    async create(req, res){
        var { url } = req.body;
        var { queueName } = req.body;

        amqp.connect('amqp://' + url, function (error0, connection) {
            if (error0) {
                console.error(error0);
                return res.status(404).send('queqe not found')
                //throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    // throw error1;
                    return res.status(404).send('queqe not found')
                }

                channel.assertQueue(queueName, {
                    durable: true
                });
                   // channel.sendToQueue(queueName, Buffer.from(message));
                    res.status(200).json('queqe create')
                      // console.log(" [x] Sent %s", message);
            });
            setTimeout(function () {
                connection.close();
                // process.exit(0);
            }, 500);
        });




    }

    /**
     * crea la cola si no existe y agrega un elemnto a la cola 
     * @param {*} req 
     * @param {*} res 
     */

    async send(req, res) {

        var { url } = req.body;
        var { queueName } = req.body;
        var { message } = req.body;

        amqp.connect('amqp://' + url, function (error0, connection) {
            if (error0) {
                console.error(error0);
                return res.status(404).send('queqe not found')
                //throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    // throw error1;
                    return res.status(404).send('queqe not found')
                }

                channel.assertQueue(queueName, {
                    durable: true
                });
                    channel.sendToQueue(queueName, Buffer.from(message));
                    res.status(200).json('message insert')
                      // console.log(" [x] Sent %s", message);
            });
            setTimeout(function () {
                connection.close();
                // process.exit(0);
            }, 500);
        });

    }

    /**
     * obtiene un elemento de la cola
     * @param {*} req 
     * @param {*} res 
     */
    async get(req, res) {

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