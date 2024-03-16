from flask import Blueprint
from flask_login import login_required
from app.models import db, Board
from app.forms import BoardForm

board_routes = Blueprint('boards', __name__)

@user_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new():
    form = BoardForm()

    if form.validate_onS_submit():
        board = Board(
            user_id = form.user_id.data,
            board_name = form.board_name.data
        )
        db.session.add(board)
        db.session.commit
        return {"New Board": board}
