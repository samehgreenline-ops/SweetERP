# SweetERP_PROJECT_STATUS

> **المرجع الرسمي للمشروع**
>
> يجب اعتبار هذا الملف المرجع الأساسي في أي محادثة جديدة وعدم البدء من الصفر.
>
> يتم تحديثه بعد كل مرحلة مستقرة وبعد كل Git Commit و Git Push ناجحين.

---

# معلومات المشروع

**اسم المشروع**

SweetERP

**الهدف**

إنشاء نظام ERP عربي متكامل لإدارة مصانع ومحلات الحلويات يشمل:

* إدارة الأصناف
* الوصفات
* الإنتاج
* المخزون
* المشتريات
* المبيعات
* الموردين
* العملاء
* التكاليف
* التقارير
* الحسابات (مرحلة لاحقة)
* المستخدمين والصلاحيات
* النسخ الاحتياطي

---

# مسار المشروع

```text
C:\Users\sameh\Desktop\SweetERP
```

---

# مستودع GitHub

https://github.com/samehgreenline-ops/SweetERP

الفرع المستخدم:

```text
main
```

---

# الإصدار الحالي

**Version**

0.3 Stable

**آخر Commit مستقر**

```text
ef81eed
```

**Commit Message**

```text
Add stable backend API and database
```

هذه هي نقطة الرجوع الرسمية في حالة حدوث أي مشكلة.

---

# هيكل المشروع

## Frontend الرسمي

```text
frontend_new
```

> هذا هو المشروع الذي يتم تطويره.

---

## Frontend القديم

```text
frontend
```

> لا يتم التعديل عليه إلا إذا كان هناك سبب واضح.

---

## Backend

```text
backend
```

---

# التقنيات المستخدمة

## Frontend

* React
* Vite
* Material UI
* JavaScript

## Backend

* Node.js
* Express

## Database

* SQLite
* better-sqlite3

## Version Control

* Git
* GitHub

---

# حالة النظام الحالية

## Backend

يعمل بنجاح.

التشغيل:

```text
npm start
```

العنوان:

```text
http://localhost:3001
```

تم اختبار الاتصال بنجاح.

---

## Frontend

يعمل بنجاح.

التشغيل:

```text
npm run dev
```

مرتبط مباشرة بالـ Backend.

---

## قاعدة البيانات

SQLite

المسار:

```text
backend/db/sweeterp.db
```

تم إنشاء:

* database.js
* schema.sql
* migrate.js

ويتم تنفيذ التحديثات تلقائياً.

---

# الجداول الموجودة

* items
* recipes
* recipe_items
* inventory_movements
* production_orders
* suppliers
* customers
* purchases
* purchase_items
* sales
* sale_items

---

# الوحدات المنجزة

## 1. الأصناف (Items)

مكتملة.

تشمل:

* إضافة صنف
* تعديل صنف
* حذف صنف
* عرض الأصناف
* أنواع الأصناف
* الوحدات
* أسعار الشراء
* أسعار البيع
* المخزون
* تتبع المخزون
* Reorder Level
* Notes

مرتبطة بالكامل بقاعدة البيانات.

---

## 2. Backend API

تم إنشاء Routes التالية:

* items
* recipes
* inventory
* production
* purchases
* sales
* suppliers
* customers
* reports

---

## 3. قاعدة البيانات

تم إنشاء وربط قاعدة البيانات بنجاح.

---

## 4. Git

تم إنشاء نقاط حفظ مستقرة ورفعها إلى GitHub.

---

# ما تم اختباره

✔ تشغيل Backend

✔ تشغيل Frontend

✔ الاتصال بينهما

✔ API

✔ إضافة صنف

✔ تعديل صنف

✔ حذف صنف

✔ حفظ البيانات داخل SQLite

✔ الاتصال بين Frontend و Backend

✔ Git Commit

✔ Git Push

---

# المرحلة الحالية

Recipes Module

سيتم تنفيذ:

* مراجعة شاشة الوصفات.
* ربط الوصفات بقاعدة البيانات.
* إضافة الخامات.
* حساب تكلفة الوصفة.
* دعم تحويل الوحدات.
* اختبار كامل.
* Git Commit.
* Git Push.

---

# المراحل القادمة

بعد الانتهاء من Recipes:

1. Production
2. Inventory
3. Purchases
4. Sales
5. Reports
6. Accounting
7. Users & Permissions
8. Backup & Restore

---

# Known Issues

حالياً لا توجد مشاكل معروفة تعيق المشروع.

أي مشكلة جديدة يتم تسجيلها هنا حتى لا يتم نسيانها.

---

# Future Improvements

* Barcode
* QR Code
* Dashboard احترافي
* صلاحيات المستخدمين
* تعدد الفروع
* الطباعة الاحترافية
* تصدير PDF
* تصدير Excel
* النسخ الاحتياطي التلقائي

---

# قواعد العمل

يلتزم المشروع بالقواعد التالية:

1. إرسال الملفات كاملة عند التعديل، وليس أجزاءً منها.
2. عدم إعادة تنفيذ أي مرحلة مكتملة.
3. اختبار كل مرحلة قبل الانتقال للمرحلة التالية.
4. بعد نجاح أي مرحلة يتم تنفيذ:

```text
git status
git add
git commit
git push
```

5. بعد كل Commit ناجح يتم تحديث هذا الملف.
6. يعتبر هذا الملف المرجع الرسمي للمشروع.
7. Frontend الرسمي هو frontend_new فقط.
8. مصدر البيانات الرسمي هو Backend + SQLite.
9. لا يتم استخدام LocalStorage إلا إذا كان ذلك مقصوداً.

---

# سجل الإصدارات

## Version 0.3 Stable

تم إنجاز:

* Backend كامل
* Database
* API
* Items Module
* الربط بين Frontend و Backend
* GitHub Stable Backup

---

# آخر تحديث

13 يوليو 2026

آخر Commit مستقر:

```text
ef81eed
```

Commit Message:

```text
Add stable backend API and database
```

الحالة:

المشروع مستقر ويمكن استكمال التطوير مباشرة من وحدة Recipes دون إعادة أي خطوة سابقة.
