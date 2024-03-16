from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Board
from app.forms import BoardForm

board_routes = Blueprint('boards', __name__)

@board_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new():
    form = BoardForm()

    if form.validate_on_submit():
        board = Board(
            user_id = form.user_id.data,
            board_name = form.board_name.data
        )
        db.session.add(board)
        db.session.commit()
        return jsonify({"New Board": board.to_dict()}) # This converts our dictionary into a JSON response
