from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User , Card
from app.forms import CardForm
from sqlalchemy import select

card_routes = Blueprint("card" , __name__)

@card_routes.route("" , methods=["GET"])
@login_required
def view_cards():
    stmt = select(Card).where(Card.user_id == current_user.id)

    cards_list = []

    for row in db.session.execute(stmt):
        results = row.Card
        results_info = {
            "id": results.id,
            "list_id": results.list_id,
            "user_id": results.user_id,
            "title": results.title,
            "labels": results.labels,
            "notification": results.notification,
            "description": results.description,
            "start_date": results.start_date,
            "end_date": results.end_date,
            "checklist": results.checklist
        }
        cards_list.append(results_info)

    return jsonify({
        "Cards": cards_list
    })

