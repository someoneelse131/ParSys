import pika
import pymongo
import os
import json
import time

rabbitmq_url = os.getenv('RABBITMQ_URL', 'amqp://stockmarket:supersecret123@localhost:5672/')
mongodb_url = os.getenv('MONGODB_URL', 'mongodb://mongo:27017/')
queue_name = os.getenv('QUEUE_NAME', 'AAPL')

# Wait for RabbitMQ to become available
while True:
    try:
        connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
        break
    except pika.exceptions.AMQPConnectionError:
        print("Waiting for RabbitMQ...")
        time.sleep(5)

channel = connection.channel()

# Ensure the queue exists (optional, as it should be created by the producer)
channel.queue_declare(queue=queue_name, durable=True)

mongo_client = pymongo.MongoClient(mongodb_url)
db = mongo_client.stockmarket
collection = db.stocks

def callback(ch, method, properties, body):
    message = json.loads(body)
    collection.insert_one(message)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue=queue_name, on_message_callback=callback)

print('Waiting for messages...')
channel.start_consuming()
