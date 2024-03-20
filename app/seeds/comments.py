from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        user_id=1,
        card_id=1,
        body="Everyone is wonderful, life is truly majestic COMMENT 1",
    )
    comment2 = Comment(
        user_id=2,
        card_id=2,
        body="Everyone is wonderful, life is truly majestic COMMENT 2",
    )
    comment3 = Comment(
        user_id=3,
        card_id=3,
        body="Everyone is wonderful, life is truly majestic COMMENT 3",
    )
    comment4 = Comment(
        user_id=1,
        card_id=4,
        body="Everyone is wonderful, life is truly majestic COMMENT 4",
    )
    comment5 = Comment(
        user_id=2,
        card_id=5,
        body="Everyone is wonderful, life is truly majestic COMMENT 5",
    )


    all_comments = [comment1, comment2, comment3, comment4, comment5]
    [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        user_id=1,
        card_id=1,
        body="Everyone is wonderful, life is truly majestic COMMENT 1",
    )
    comment2 = Comment(
        user_id=2,
        card_id=2,
        body="Everyone is wonderful, life is truly majestic COMMENT 2",
    )
    comment3 = Comment(
        user_id=3,
        card_id=3,
        body="Everyone is wonderful, life is truly majestic COMMENT 3",
    )
    comment4 = Comment(
        user_id=1,
        card_id=4,
        body="Everyone is wonderful, life is truly majestic COMMENT 4",
    )
    comment5 = Comment(
        user_id=2,
        card_id=5,
        body="Everyone is wonderful, life is truly majestic COMMENT 5",
    )
    comment6 = Comment(
        user_id=1,
        card_id=6,
        body="The world is full of magic and wonder COMMENT 6",
    )

    comment7 = Comment(
        user_id=2,
        card_id=7,
        body="Life's beauty lies in the simplest moments COMMENT 7",
    )

    comment8 = Comment(
        user_id=3,
        card_id=8,
        body="Every sunrise brings new possibilities COMMENT 8",
    )

    comment9 = Comment(
        user_id=1,
        card_id=9,
        body="Kindness is like sunlight for the soul COMMENT 9",
    )

    comment10 = Comment(
        user_id=2,
        card_id=10,
        body="In the dance of life, we are all stars COMMENT 10",
    )

    comment11 = Comment(
        user_id=3,
        card_id=11,
        body="Nature whispers secrets to those who listen COMMENT 11",
    )

    comment12 = Comment(
        user_id=1,
        card_id=12,
        body="Love is the thread that weaves us together COMMENT 12",
    )

    comment13 = Comment(
        user_id=2,
        card_id=13,
        body="Dreams are the constellations of our hearts COMMENT 13",
    )

    comment14 = Comment(
        user_id=3,
        card_id=14,
        body="Laughter is the music of the universe COMMENT 14",
    )

    comment15 = Comment(
        user_id=1,
        card_id=15,
        body="Embrace the journey; the destination is just a pause COMMENT 15",
    )
    comment16 = Comment(
        user_id=1,
        card_id=16,
        body="Stars are the freckles on the face of the night COMMENT 16",
    )

    comment17 = Comment(
        user_id=2,
        card_id=17,
        body="Rainbows are bridges between sky and earth COMMENT 17",
    )

    comment18 = Comment(
        user_id=3,
        card_id=18,
        body="Hope blooms like wildflowers in unexpected places COMMENT 18",
    )

    comment19 = Comment(
        user_id=1,
        card_id=19,
        body="Sunsets are love letters written in colors COMMENT 19",
    )

    comment20 = Comment(
        user_id=2,
        card_id=20,
        body="Whispers of the wind carry secrets of ancient trees COMMENT 20",
    )

    comment21 = Comment(
        user_id=3,
        card_id=21,
        body="Kindness is the compass that guides lost souls COMMENT 21",
    )

    comment22 = Comment(
        user_id=1,
        card_id=22,
        body="Moonlight weaves dreams into the fabric of reality COMMENT 22",
    )

    comment23 = Comment(
        user_id=2,
        card_id=23,
        body="Mountains cradle the sky, whispering tales of time COMMENT 23",
    )

    comment24 = Comment(
        user_id=3,
        card_id=24,
        body="Laughter dances like fireflies on warm summer nights COMMENT 24",
    )

    comment25 = Comment(
        user_id=1,
        card_id=25,
        body="In the symphony of existence, we are all notes COMMENT 25",
    )
    comment26 = Comment(
        user_id=2,
        card_id=26,
        body="Dandelion seeds ride the breeze, chasing dreams COMMENT 26",
    )

    comment27 = Comment(
        user_id=3,
        card_id=27,
        body="Ocean waves whisper secrets to the moon COMMENT 27",
    )

    comment28 = Comment(
        user_id=1,
        card_id=28,
        body="Fireflies illuminate the night with stardust COMMENT 28",
    )

    comment29 = Comment(
        user_id=2,
        card_id=29,
        body="Mountains wear crowns of snow, ancient and regal COMMENT 29",
    )

    comment30 = Comment(
        user_id=3,
        card_id=30,
        body="Raindrops are love letters from the sky COMMENT 30",
    )

    comment31 = Comment(
        user_id=1,
        card_id=31,
        body="In the forest's embrace, time dances slowly COMMENT 31",
    )

    comment32 = Comment(
        user_id=2,
        card_id=32,
        body="Sunflowers turn their faces toward the sun COMMENT 32",
    )

    comment33 = Comment(
        user_id=3,
        card_id=33,
        body="Stars are breadcrumbs left by celestial wanderers COMMENT 33",
    )

    comment34 = Comment(
        user_id=1,
        card_id=34,
        body="The moon cradles nightfall in its silver arms COMMENT 34",
    )

    comment35 = Comment(
        user_id=2,
        card_id=35,
        body="Kindness blooms like wildflowers in the cracks of life COMMENT 35",
    )


    all_comments = [
        comment1, comment2, comment3, comment4, comment5,
        comment6, comment7, comment8, comment9, comment10,
        comment11, comment12, comment13, comment14, comment15,
        comment16, comment17, comment18, comment19, comment20,
        comment21, comment22, comment23, comment24, comment25,
        comment26, comment27, comment28, comment29, comment30,
        comment31, comment32, comment33, comment34, comment35
    ]
    [db.session.add(comment) for comment in all_comments]
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
