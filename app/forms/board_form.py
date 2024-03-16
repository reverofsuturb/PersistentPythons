from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    board_name = StringField('Board Name', validators=[DataRequired()])
