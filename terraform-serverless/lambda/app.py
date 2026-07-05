import json
import uuid
import boto3
import os
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])


def response(status, body):
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
        },
        "body": json.dumps(body)
    }


def lambda_handler(event, context):

    method = event["requestContext"]["http"]["method"]

    if method == "POST":

        body = json.loads(event["body"])

        task = {
            "taskId": str(uuid.uuid4()),
            "title": body["title"],
            "description": body["description"]
        }

        table.put_item(Item=task)

        return response(200, task)

    elif method == "GET":

        items = table.scan()["Items"]

        return response(200, items)

    return response(400, {"message": "Unsupported Method"})
