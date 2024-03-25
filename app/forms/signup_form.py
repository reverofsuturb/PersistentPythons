from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,  ValidationError , Length
from app.models import User



def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def validate_email(form, field):
    if '@' not in field.data:
        raise ValidationError('Email address must contain "@" symbol.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('firstName' , validators=[DataRequired(message="Please provide your first name.")])
    last_name = StringField("lastName" , validators=[DataRequired(message="Please provide your last name.")])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists , validate_email])
    password = StringField('password', validators=[DataRequired(message="Password is required") , Length(min=6 , message="Password must be longer than 6 characters")])
