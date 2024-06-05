import pika
import pymongo
import os
import json
import time
from collections import defaultdict

# Environment variables
rabbitmq_url = os.getenv('RABBITMQ_URL', 'amqp://stockmarket:supersecret123@localhost:5672/')
mongodb_url = os.getenv('MONGODB_URL', 'mongodb://mongo:27017/')
queue_name = os.getenv('QUEUE_NAME')  # Only consume from the specified queue

# Wait for RabbitMQ to become available
while True:
    try:
        connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
        break
    except pika.exceptions.AMQPConnectionError:
        print("Waiting for RabbitMQ...")
        time.sleep(3)

channel = connection.channel()

# Ensure the queue exists
channel.queue_declare(queue=queue_name, durable=True)

mongo_client = pymongo.MongoClient(mongodb_url)
db = mongo_client.stockmarket
collection = db.stocks

buffers = defaultdict(list)
buffer_size = 1000

def process_buffer(queue_name):
    if len(buffers[queue_name]) >= buffer_size:
        avg_price = sum(item['price'] for item in buffers[queue_name]) / buffer_size
        aggregated_data = {
            'company': queue_name,
            'avg_price': avg_price
            }
        collection.insert_one(aggregated_data)
        buffers[queue_name].clear()

def callback(ch, method, properties, body):
    message = json.loads(body)
    buffers[queue_name].append(message)

    process_buffer(queue_name)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue=queue_name, on_message_callback=callback)

print(f'Waiting for messages from {queue_name}...')
channel.start_consuming()
