from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

currdate = datetime.today()

def seed_cards():

    card1 = Card(
        list_id=1,
        user_id=1,
        title="Important Stuff",
        labels="Dope",
        notification=True,
        description="Everything is great I love life",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Check",
    )
    card2 = Card(
        list_id=2,
        user_id=2,
        title="Semi-Important Things",
        labels="Not Dope",
        notification=False,
        description="Everything is not great, however, life is bearable",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Not Check",
    )
    card3 = Card(
        list_id=3,
        user_id=3,
        title="assert",
        labels="async",
        notification=False,
        description="def all that",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Shrood",
    )
    card4 = Card(
        list_id=4,
        user_id=1,
        title="Confusion",
        labels="Put One Here",
        notification=False,
        description="Because I hate notifications",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist=" ",
    )
    card5 = Card(
        list_id=5,
        user_id=2,
        title="Living Freely",
        labels="It is what it is",
        notification=True,
        description="Alert me always",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist=" ",
    )
    card6 = Card(
        list_id=6,
        user_id=3,
        title="Grocery Shopping",
        labels="To Buy",
        notification=False,
        description="Buy essentials for the week",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="To Buy",
    )
    card7 = Card(
        list_id=7,
        user_id=1,
        title="Work Tasks",
        labels="In Progress",
        notification=False,
        description="Complete pending assignments",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="In Progress",
    )
    card8 = Card(
        list_id=8,
        user_id=2,
        title="Home Improvement",
        labels="To-Do",
        notification=False,
        description="Fix that leaky faucet",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="To-Do",
    )
    card9 = Card(
        list_id=9,
        user_id=3,
        title="Fitness Goals",
        labels="Completed Sets",
        notification=False,
        description="Daily workout routine",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Completed Sets",
    )
    card10 = Card(
        list_id=10,
        user_id=1,
        title="Travel Plans",
        labels="Upcoming Trips",
        notification=False,
        description="Book flights and accommodations",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Upcoming Trips",
    )

    card11 = Card(
        list_id=11,
        user_id=1,
        title="Creative Projects",
        labels="Ideas",
        notification=False,
        description="Write that novel",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Ideas",
    )

    card12 = Card(
        list_id=12,
        user_id=2,
        title="Financial Management",
        labels="Expenses",
        notification=False,
        description="Review budget",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Expenses",
    )

    card13 = Card(
        list_id=13,
        user_id=3,
        title="Health Tracker",
        labels="Progress",
        notification=False,
        description="Log daily meals and exercise",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Progress",
    )

    card14 = Card(
        list_id=14,
        user_id=1,
        title="Home Decor",
        labels="Options",
        notification=False,
        description="Choose new curtains",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Options",
    )

    card15 = Card(
        list_id=15,
        user_id=2,
        title="Random Thoughts",
        labels="Notes",
        notification=False,
        description="Brainstorm ideas",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Notes",
    )
    card16 = Card(
        list_id=1,
        user_id=1,
        title="Daily Journal",
        labels="Reflection",
        notification=False,
        description="Record thoughts and experiences",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Entries",
    )

    card17 = Card(
        list_id=2,
        user_id=2,
        title="Recipe Collection",
        labels="Cooking",
        notification=False,
        description="Compile favorite recipes",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Ingredients",
    )

    card18 = Card(
        list_id=3,
        user_id=3,
        title="Gardening Tasks",
        labels="Green Thumb",
        notification=False,
        description="Plant new seeds and water plants",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Tasks",
    )

    card19 = Card(
        list_id=4,
        user_id=1,
        title="Language Learning",
        labels="Polyglot",
        notification=False,
        description="Practice vocabulary and grammar",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Lessons",
    )

    card20 = Card(
        list_id=5,
        user_id=2,
        title="Pet Care",
        labels="Furry Friends",
        notification=False,
        description="Feed, groom, and play with pets",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Pet Tasks",
    )

    card21 = Card(
        list_id=6,
        user_id=3,
        title="Home Office Setup",
        labels="Productivity",
        notification=False,
        description="Organize desk and supplies",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Workspace",
    )

    card22 = Card(
        list_id=7,
        user_id=1,
        title="Book Recommendations",
        labels="Literature",
        notification=False,
        description="Share favorite reads",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Books",
    )

    card23 = Card(
        list_id=8,
        user_id=2,
        title="Outdoor Adventures",
        labels="Exploration",
        notification=False,
        description="Hike, bike, or camp",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Gear",
    )

    card24 = Card(
        list_id=9,
        user_id=3,
        title="Photography Projects",
        labels="Shutterbug",
        notification=False,
        description="Capture moments and edit photos",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Themes",
    )

    card25 = Card(
        list_id=10,
        user_id=1,
        title="Random Quotes",
        labels="Inspiration",
        notification=False,
        description="Collect memorable quotes",
        start_date=currdate.strftime('%Y-%m-%d'),
        end_date=currdate.strftime('%Y-%m-%d'),
        checklist="Quotes",
    )

    all_cards = [
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7,
        card8,
        card9,
        card10,
        card11,
        card12,
        card13,
        card14,
        card15,
        card16,
        card17,
        card18,
        card19,
        card20,
        card21,
        card22,
        card23,
        card24,
        card25,
    ]
    [db.session.add(card) for card in all_cards]
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
