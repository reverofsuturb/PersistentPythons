from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User, Card
from app.forms import ListForm , CardForm
from sqlalchemy import select

list_routes = Blueprint("list", __name__)







@list_routes.route("", methods=["GET"])
@login_required
def view_lists():
    stmt = select(List).join(List.cards_in_list).where(List.user_id == current_user.id)

    lists_list = []

    for row in db.session.execute(stmt):
        print("This is our data:", row.List.to_dict())
        print("This is our data:", row.List.cards_in_list())
        print("This is our data:", row.List)
        results = row.List
        # print(row.cards_in_list.title)

        results_info = {
            "id": results.id,
            "title": results.title,
            "board_id": results.board_id,
            "user_id": results.user_id,
            "cards_in_list":results.cards_in_list
        }

        lists_list.append(results_info)

    return jsonify({
        "Lists": lists_list
    })







@list_routes.route('/<int:list_id>', methods=["GET","PUT"])
@login_required
def edit_list(list_id):
    stmt = select(List).where(List.id == list_id)
    list = db.session.execute(stmt).scalar_one()
    if list.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "Forbidden"
        }), 403

    if request.method == "PUT":
        form = ListForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            list.title = form.title.data
            db.session.add(list)
            db.session.commit()
            return jsonify(
                {
                    "Edited List" : list.to_dict()
                }
            )
        return jsonify({'errors': form.errors}) , 400

@list_routes.route('/<int:list_id>', methods=["DELETE"])
@login_required
def delete_list(list_id):
    stmt = select(List).where(List.id == list_id)
    list = db.session.execute(stmt).scalar_one()
    if list.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    db.session.delete(list)
    db.session.commit()

    return jsonify({
        "List Deleted" : list.to_dict()
    })

@list_routes.route("/<int:list_id>/card" , methods=["GET","POST"])
@login_required
def new_card(list_id):
    stmt = select(List).where(List.id == list_id)
    list = db.session.execute(stmt).scalar_one()

    if list.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "Forbidden"
        }), 403

    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        card = Card(
            user_id = current_user.id,
            list_id = list_id,
            title = form.title.data,
            labels = form.labels.data,
            notification = form.notification.data,
            description = form.description.data,
            start_date = form.start_date.data,
            end_date = form.end_date.data,
            checklist = form.checklist.data
        )
        db.session.add(card)
        db.session.commit()

        return jsonify({
            "New Card": card.to_dict()
        })

    return jsonify({'errors': form.errors}), 400
