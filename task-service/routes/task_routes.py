from flask import Blueprint
from flask import jsonify
from flask import request
from middleware.auth_middleware import token_required
from services.task_service import (create_new_task,fetch_tasks,update_existing_task,delete_existing_task)
task_bp = Blueprint("tasks",__name__)

@task_bp.route("/tasks",methods=["POST"])
@token_required
def create_task():
    data = request.get_json()
    create_new_task(request.user["userId"],data["task"],data["description"])
    return jsonify({
        "message": "Task Created"
    })


@task_bp.route("/tasks",methods=["GET"])
@token_required
def get_tasks():
    tasks = fetch_tasks(request.user["userId"])
    return jsonify(tasks)


@task_bp.route("/tasks/<int:task_id>",methods=["PUT"])
@token_required
def update_task(task_id):
    data = request.get_json()
    update_existing_task(task_id,request.user["userId"],data["task"],data["description"],data["completed"])
    return jsonify({
        "message": "Task Updated"
    })



@task_bp.route( "/tasks/<int:task_id>",methods=["DELETE"])
@token_required
def delete_task(task_id):
    delete_existing_task(task_id,request.user["userId"])
    return jsonify({
        "message": "Task Deleted"
    })