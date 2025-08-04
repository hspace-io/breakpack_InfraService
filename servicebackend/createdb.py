# 예: init_db.py 또는 main.py에서 한 번 실행
from models.Databasemodels import GameInstance, Base
from database.get_db import engine

Base.metadata.create_all(bind=engine)
