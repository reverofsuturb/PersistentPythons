from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, Card
from app.forms import BoardForm, ListForm
from sqlalchemy import select
from sqlalchemy.orm import joinedload

board_routes = Blueprint("boards", __name__)


@board_routes.route("", methods=["GET"])
@login_required
def view_board():
    # stmt = select(Board).join(Board.lists).where(Board.user_id == current_user.id)
    boards = (
        db.session.query(Board)
        .options(
            db.joinedload(Board.lists)
            .joinedload(List.cards_in_list)
            .joinedload(Card.images)
        )
        .filter_by(user_id=current_user.id)
        .all()
    )

    results_list = []

    for board in boards:

        board_info = {
            "id": board.id,
            "user_id": board.user_id,
            "board_name": board.board_name,
            "lists": [
                {
                    "id": _list.id,
                    "title": _list.title,
                    "board_id": _list.board_id,
                    "user_id": _list.user_id,
                    "cards": [
                        {
                            "id": card.id,
                            "list_id": card.list_id,
                            "title": card.title,
                            "labels": card.labels,
                            "notification": card.notification,
                            "description": card.description,
                            "start_date": card.start_date,
                            "end_date": card.end_date,
                            "checklist": card.checklist,
                            "cover_photo": card.cover_photo,
                            "cardimages": [
                                {
                                    "id": image.id,
                                    "card_id": image.card_id,
                                    "image_file": image.image_file
                                }
                                for image in card.images
                            ],
                        }
                        for card in _list.cards_in_list
                    ],
                }
                for _list in board.lists
            ],
        }
        results_list.append(board_info)

    res = jsonify({"Boards": results_list})
    return res


@board_routes.route("/new", methods=["GET", "POST"])
@login_required
def new_board():
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form.data)
    if form.validate_on_submit():
        board = Board(user_id=current_user.id, board_name=form.board_name.data)
        db.session.add(board)
        db.session.commit()
        return jsonify(board.to_dict()), 201

    return jsonify({"errors": form.errors}), 400


@board_routes.route("/<int:board_id>", methods=["GET", "PUT"])
@login_required
def edit_board(board_id):
    stmt = select(Board).where(Board.id == board_id)
    board = db.session.execute(stmt).scalar_one()
    if board.user_id != current_user.id:
        return jsonify({"Not Authorized": "forbidden"}), 403

    if request.method == "PUT":
        form = BoardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            board.board_name = form.board_name.data
            db.session.add(board)
            db.session.commit()
            return jsonify(board.to_dict())
        else:
            return jsonify({"errors": form.errors}), 400
    return jsonify(board.to_dict())


@board_routes.route("/<int:board_id>", methods=["DELETE"])
@login_required
def delete_board(board_id):
    stmt = select(Board).where(Board.id == board_id)
    board_grabber = db.session.execute(stmt).scalar_one()
    if board_grabber.user_id != current_user.id:
        return jsonify({"Not Authorized": "forbidden"}), 403

    db.session.delete(board_grabber)
    db.session.commit()

    return jsonify({"Message": "Board deleted successfully"})


@board_routes.route("/<int:board_id>/list", methods=["GET", "POST"])
@login_required
def new_list(board_id):
    stmt = select(Board).where(Board.id == board_id)
    board_grabber = db.session.execute(stmt).scalar_one()
    if board_grabber.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403

    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        list = List(user_id=current_user.id, board_id=board_id, title=form.title.data)
        db.session.add(list)
        db.session.commit()

        return jsonify({"New List": list.to_dict()})

    return jsonify({"errors": form.errors}), 400
