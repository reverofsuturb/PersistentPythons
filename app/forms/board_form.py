from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    board_name = StringField('Board Name', validators=[DataRequired()])
