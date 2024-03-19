from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List
from app.forms import BoardForm, ListForm
from sqlalchemy import select

board_routes = Blueprint("boards", __name__)



@board_routes.route("", methods=["GET"])
@login_required
def view_board():
    stmt = select(Board).where(Board.user_id == current_user.id)
    print(stmt)

    results_list = []

    for row in db.session.execute(stmt):
        results = row.Board
        results_info = {
            "id": results.id,
            "user_id": results.user_id,
            "board_name": results.board_name,
        }
        results_list.append(results_info)

    res = jsonify({"Boards": results_list})
    return res


@board_routes.route("/new", methods=["GET", "POST"])
@login_required
def new_board():
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form.data)
    if form.validate_on_submit():
        board = Board(
            user_id=current_user.id,
            board_name=form.board_name.data
            )
        db.session.add(board)
        db.session.commit()
        return jsonify(
          board.to_dict()
        )  # This converts our dictionary into a JSON response

    return jsonify({'errors': form.errors}), 400


@board_routes.route("/<int:board_id>", methods=["GET", "PUT"])
@login_required
def edit_board(board_id):
    stmt = select(Board).where(Board.id == board_id)
    board = db.session.execute(stmt).scalar_one()
    if board.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    if request.method == "PUT":
        form = BoardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
          board.board_name = form.board_name.data
          db.session.add(board)
          db.session.commit()
          return jsonify(
            {
                "Edited Board" : board.to_dict()
            })

        return jsonify({'errors': form.errors}), 400
    return jsonify(board.to_dict())



@board_routes.route("/<int:board_id>", methods=["DELETE"])
@login_required
def delete_board(board_id):
    board = select(Board).where(Board.id == board_id)
    if board.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403
    stmt = select(Board).where(Board.id ==id)
    board_grabber = db.session.execute(stmt).scalar_one()

    db.session.delete(board_grabber)
    db.session.commit()

    return jsonify({
        "Board Deleted" : board_grabber.to_dict()
    })



@board_routes.route("/<int:board_id>/list", methods=["GET","POST"])
@login_required
def new_list(board_id):
    board = select(Board).where(Board.id == board_id)
    if board.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        list = List(
            user_id=current_user.id,
            board_id=board_id,
            title=form.title.data
        )
        db.session.add(list)
        db.session.commit()

        return jsonify({
            "New List": list.to_dict()
        })

    return jsonify({'errors': form.errors}), 400
