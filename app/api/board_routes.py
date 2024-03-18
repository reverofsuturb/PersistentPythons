from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User
from app.forms import BoardForm
from sqlalchemy import select

board_routes = Blueprint("boards", __name__)


@board_routes.route("/", methods=["GET"])
@login_required
def view_board():
    stmt = select(Board).where(Board.user_id == User.id)
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
        board = Board(user_id=current_user.id, board_name=form.board_name.data)
        db.session.add(board)
        db.session.commit()
        return jsonify(
            {"New Board": board.to_dict()}
        )  # This converts our dictionary into a JSON response


@board_routes.route("/<int:id>", methods=["GET", "PUT"])
@login_required
def edit_board(id):
    stmt = select(Board).where(Board.id == id)
    board = db.session.execute(stmt).scalar_one()
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
