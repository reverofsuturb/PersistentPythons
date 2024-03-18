from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User , Card
from app.forms import CardForm
from sqlalchemy import select

card_routes = Blueprint("card" , __name__)

@card_routes.route("/" , methods=["GET"])
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


@card_routes.route('/<int:card_id>', methods=['GET', 'PUT'])
@login_required
def edit_card(card_id):
    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()
    if card.user_id != current_user.id:
        return jsonify({
        "Not Authorized": "Forbidden"
        }), 403
    if request.method == "PUT":
        form = CardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            card.title = form.title.data
            card.labels = form.labels.data
            card.notification = form.notification.data
            card.description = form.description.data
            card.start_date = form.start_date.data
            card.end_date = form.end_date.data
            card.checklist = form.checklist.data

            db.session.add(card)
            db.session.commit()

            return jsonify({
                "Edited Card": card.to_dict()
            })
        return jsonify({
            "errors": form.errors
        }), 400

@card_routes.route("/<int:card_id>", methods=["DELETE"])
@login_required
def delete_card(card_id):
    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()
    if card.user_id != current_user.id:
          return jsonify({
            "Not Authorized": "Forbidden"
        }), 403

    db.session.delete(card)
    db.session.commit()

    return jsonify({
        "Card Deleted": "Deletion Successful",
        "Old Card": card.to_dict()
    })
