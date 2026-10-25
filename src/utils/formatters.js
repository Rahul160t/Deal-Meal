// Formatting and calculation helpers

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const calculateDiscount = (originalPrice, surplusPrice) => {
  if (!originalPrice || originalPrice <= 0 || !surplusPrice) return 0;
  const discount = Math.round(((originalPrice - surplusPrice) / originalPrice) * 100);
  return Math.max(0, Math.min(99, discount));
};

export const generatePickupCode = (prefix = 'DM') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
};

export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};
