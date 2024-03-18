from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User
from app.forms import ListForm
from sqlalchemy import select

list_routes = Blueprint("list", __name__)

@list_routes.route("/", methods=["GET"])
@login_required
def view_lists():
    stmt = select(List).where(List.user_id == current_user.id)

    lists_list = []

    for row in db.session.execute(stmt):
        results = row.List
        results_info = {
            "id": results.id,
            "title": results.title,
            "board_id": results.board_id,
            "user_id": results.user_id
        }
        lists_list.append(results_info)

    return jsonify({
        "Lists": lists_list
    })


@list_routes.route('/')
