from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.api.aws import ALLOWED_EXTENSIONS

class CardImageForm(FlaskForm):
    card_id = IntegerField("Card ID", validators=[DataRequired()])
    image_file = FileField("Image URL", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    cover = BooleanField("Is this going to be the cover photo?", default=False)
