from flask.cli import AppGroup
from .users import seed_users, undo_users
from .lists import seed_lists, undo_lists
from .comments import seed_comments, undo_comments
from .cards import seed_cards, undo_cards
from .card_images import card_images_seeds, undo_card_images
from .boards import seed_boards, undo_boards



from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_card_images()
        undo_comments()
        undo_cards()
        undo_lists()
        undo_boards()
        undo_users()
    seed_users()
    seed_boards()
    seed_lists()
    seed_cards()
    seed_comments()
    card_images_seeds()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_boards()
    undo_lists()
    undo_cards()
    undo_comments()
    undo_card_images()
    # Add other undo functions here
