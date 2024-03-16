from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Board, List, User
from app.forms import BoardForm
from sqlalchemy import select

board_routes = Blueprint('boards', __name__)

@board_routes.route('/', methods=['GET'])
# @login_required
def view_board():
    stmt = select(Board).where(Board.user_id == User.id)
    print(stmt)

    results_list=[]

    for row in db.session.execute(stmt):
        results = row.Board
        results_info = {
            "Board name": results.board_name
        }
        results_list.append(results_info)

    res = jsonify({"Boards":results_list})
    return res









# @board_routes.route('/new', methods=['GET', 'POST'])
# # @login_required
# def new_board():
#     form = BoardForm()

#     if form.validate_on_submit():
#         board = Board(
#             user_id = form.user_id.data,
#             board_name = form.board_name.data
#         )
#         db.session.add(board)
#         db.session.commit()
#         return jsonify({"New Board": board.to_dict()}) # This converts our dictionary into a JSON response
