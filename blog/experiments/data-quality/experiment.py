import sqlite3
import csv
from collections import Counter

def inputs():
    for i in range(1, 1001):
        salary = 2000 + i % 3000
        kind = 'valid'
        value = salary
        dept = 'ENG'
        name = f'Employee {i}'
        if i % 100 == 1: kind, value = 'range', 30000
        elif i % 100 == 2: kind, value = 'missing', None
        elif i % 100 == 3: kind, dept = 'category', 'UNKNOWN'
        elif i % 100 == 4: kind, value = 'type', 'abc'
        elif i % 100 == 5: kind, value = 'plausible', salary + 100
        yield (i, name, dept, value, salary, kind)
def valid(row):
    i, name, dept, value, _, _ = row
    return bool(name) and dept in ('ENG','HR') and type(value) in (int,float) and 1500 <= value <= 9999

def run():
    rows = list(inputs())
    db = sqlite3.connect(':memory:')
    db.execute("CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT NOT NULL, dept TEXT NOT NULL CHECK(dept IN ('ENG','HR')), salary REAL NOT NULL CHECK(typeof(salary) IN ('real','integer') AND salary BETWEEN 1500 AND 9999)) STRICT")
    accepted = []
    for row in rows:
        try:
            db.execute('INSERT INTO employees VALUES (?,?,?,?)', row[:4])
            accepted.append(row)
        except sqlite3.IntegrityError:
            pass
    app = [r for r in rows if valid(r)]
    assert accepted == app
    truth = sum(r[4] for r in rows)
    print('Input classes:', Counter(r[5] for r in rows))
    print('Ground truth payroll:', truth)
    for label, retained in [('Uncontrolled intake',rows),('SQLite constraints',accepted),('Python validation',app),('Downstream filter',app)]:
        invalid = sum(not valid(r) for r in retained)
        residual = sum(r[5] != 'valid' for r in retained)
        total = sum(r[3] for r in retained) if all(type(r[3]) in (int,float) for r in retained) else None
        print(label, len(retained), invalid, residual, total)
    with open('results.csv','w',newline='') as f:
        w=csv.writer(f); w.writerow(['id','name','department','entered_salary','true_salary','kind','passes_validation']);w.writerows([(*r,valid(r)) for r in rows])
if __name__=='__main__':
    run()
