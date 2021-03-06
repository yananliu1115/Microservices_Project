"""empty message

Revision ID: f0ece4114acc
Revises: 843c810aec1f
Create Date: 2022-04-28 04:30:18.485966

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

revision = 'f0ece4114acc'
down_revision = '843c810aec1f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('book',
    sa.Column('id', sa.Integer(), autoincrement=False, nullable=False),
    sa.Column('title', sa.String(length=200), nullable=True),
    sa.Column('image', sa.String(length=200), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('book_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('book_id_list', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('product')
    op.drop_table('product_user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product_user',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('product_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('product',
    sa.Column('id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('title', mysql.VARCHAR(length=200), nullable=True),
    sa.Column('image', mysql.VARCHAR(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('book_user')
    op.drop_table('book')
