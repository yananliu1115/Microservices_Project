import pika, json

params = pika.URLParameters('amqps://mxodroxr:MZoGlc3-Gg27A4mmL55hwHZbuLjnYXC8@toad.rmq.cloudamqp.com/mxodroxr')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body), properties=properties)