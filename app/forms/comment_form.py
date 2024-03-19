from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    # user_id = IntegerField("User ID", validators=[DataRequired()])
    # card_id = IntegerField("Card ID", validators=[DataRequired()])
    body = TextAreaField("Body", validators=[DataRequired()])
