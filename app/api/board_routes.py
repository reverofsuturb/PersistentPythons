from flask import Blueprint
from flask_login import login_required
from app.models import db

board_routes = Blueprint('boards', __name__)

@user_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new():
