-- SweetERP Accounting Foundation Migration


-- المستخدمون والصلاحيات

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'USER',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
);


-- الفترات المحاسبية

CREATE TABLE IF NOT EXISTS fiscal_periods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    status TEXT DEFAULT 'OPEN',
    created_at TEXT DEFAULT (datetime('now'))
);



-- مراكز التكلفة

CREATE TABLE IF NOT EXISTS cost_centers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    name TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
);



-- توسيع القيود المحاسبية

ALTER TABLE journal_entries
ADD COLUMN user_id INTEGER;

ALTER TABLE journal_entries
ADD COLUMN fiscal_period_id INTEGER;

ALTER TABLE journal_entries
ADD COLUMN cost_center_id INTEGER;



-- توسيع سطور القيود

ALTER TABLE journal_lines
ADD COLUMN cost_center_id INTEGER;



-- الحسابات الافتراضية

INSERT OR IGNORE INTO accounts
(company_id, code, name, account_type)
VALUES
(1,'1000','النقدية','ASSET'),
(1,'1100','البنك','ASSET'),
(1,'1200','العملاء','ASSET'),
(1,'1300','المخزون خامات','ASSET'),
(1,'1400','مخزون منتجات تامة','ASSET'),
(1,'2000','الموردون','LIABILITY'),
(1,'3000','رأس المال','EQUITY'),
(1,'4000','المبيعات','REVENUE'),
(1,'5000','تكلفة المبيعات','EXPENSE'),
(1,'6000','مصروفات تشغيلية','EXPENSE');



-- مستخدم مدير مالي افتراضي

INSERT OR IGNORE INTO users
(username,password,full_name,role)
VALUES
('finance','1234','المدير المالي','FINANCE_MANAGER');



-- فترة محاسبية حالية

INSERT OR IGNORE INTO fiscal_periods
(name,start_date,end_date)
VALUES
(
'2026',
'2026-01-01',
'2026-12-31'
);



-- مركز تكلفة افتراضي

INSERT OR IGNORE INTO cost_centers
(code,name)
VALUES
('MAIN','المصنع الرئيسي');