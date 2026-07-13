export const ITEM_TYPES = [
  { value: "RAW_MATERIAL", label: "خامة" },
  { value: "FINISHED_PRODUCT", label: "منتج نهائي" },
  { value: "SEMI_FINISHED", label: "نصف مصنع" },
  { value: "PACKAGING", label: "مادة تعبئة" },
  { value: "SERVICE", label: "خدمة" },
];

export const UNITS = [
  { value: "KG", label: "كيلو جرام" },
  { value: "GRAM", label: "جرام" },
  { value: "LITER", label: "لتر" },
  { value: "PIECE", label: "قطعة" },
];

export const MOVEMENT_TYPES = {
  IN: "إدخال",
  OUT: "إخراج",
  PURCHASE: "مشتريات",
  SALE: "مبيعات",
  PRODUCTION_IN: "إنتاج (إضافة)",
  PRODUCTION_OUT: "إنتاج (استهلاك)",
};


export function getTypeLabel(value) {
  const type = ITEM_TYPES.find(
    (item) => item.value === value
  );

  return type ? type.label : value || "-";
}


export function getUnitLabel(value) {
  const unit = UNITS.find(
    (item) => item.value === value
  );

  return unit ? unit.label : value || "-";
}


export function formatMoney(amount) {
  return `${Number(amount || 0).toFixed(2)} جنيه`;
}


export function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("ar-EG");
}