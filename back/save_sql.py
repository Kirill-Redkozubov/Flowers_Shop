import sqlite3
import pandas as pd

df = pd.read_csv("bouquets.csv")

con = sqlite3.connect("bouquets.db")
df.to_sql("bouquets", con, if_exists="replace", index=False)
con.close()