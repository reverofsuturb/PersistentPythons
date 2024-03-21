"""empty message

Revision ID: 97bc3de48fb7
Revises: 806c296e5839
Create Date: 2024-03-20 21:06:13.398896

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97bc3de48fb7'
down_revision = '806c296e5839'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=2000),
               existing_nullable=True)

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.alter_column('body',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=255),
               existing_nullable=True)

    # ### end Alembic commands ###
