import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { PUNE_LOCATIONS, CATEGORIES } from '../../data/initialData';
import {
  Store,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  Power,
  X,
  Upload,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';

export const BusinessListings = ({ onOpenMobileSidebar }) => {
  const { listings, currentUser, addListing, updateListing, deleteListing, toggleListingStatus } =
    useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [deleteConfirmListing, setDeleteConfirmListing] = useState(null);

  // Form State
  const initialFormState = {
    item: '',
    description: '',
    category: 'Bakery',
    quantity: 5,
    originalPrice: 300,
    surplusPrice: 120,
    expiry: 'Today, 10:00 PM',
    pickupWindow: 'Today, 8:00 PM - 10:00 PM',
    location: currentUser?.location?.split(',')[0] || 'Koregaon Park',
    address: currentUser?.address || 'Lane 5, Koregaon Park, Pune',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegetarian'],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Filter listings for this business
  const myListings = listings.filter(
    (l) => l.businessId === currentUser?.uid || l.businessId === 'user_business_1'
  );

  const openCreateModal = () => {
    setEditingListing(null);
    setFormData(initialFormState);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setFormData({
      item: listing.item,
      description: listing.description,
      category: listing.category,
      quantity: listing.quantity,
      originalPrice: listing.originalPrice,
      surplusPrice: listing.surplusPrice,
      expiry: listing.expiry,
      pickupWindow: listing.pickupWindow,
      location: listing.location,
      address: listing.address,
      image: listing.image,
      dietary: listing.dietary || ['Vegetarian'],
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.item.trim()) errors.item = 'Food item name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (Number(formData.quantity) <= 0) errors.quantity = 'Quantity must be at least 1';
    if (Number(formData.originalPrice) <= 0) errors.originalPrice = 'Original price must be positive';
    if (Number(formData.surplusPrice) <= 0) errors.surplusPrice = 'Surplus price must be positive';
    if (Number(formData.surplusPrice) >= Number(formData.originalPrice)) {
      errors.surplusPrice = 'Surplus price must be lower than original price';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingListing) {
      updateListing(editingListing.listingId, {
        ...formData,
        quantity: Number(formData.quantity),
        originalPrice: Number(formData.originalPrice),
        surplusPrice: Number(formData.surplusPrice),
      });
    } else {
      addListing({
        ...formData,
        quantity: Number(formData.quantity),
        originalPrice: Number(formData.originalPrice),
        surplusPrice: Number(formData.surplusPrice),
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteConfirmListing) {
      deleteListing(deleteConfirmListing.listingId);
      setDeleteConfirmListing(null);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Manage Surplus Food Listings"
        subtitle="Publish, edit, and track real-time inventory of your surplus portions in Pune."
        onOpenMobileSidebar={onOpenMobileSidebar}
        actions={
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-sm transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Add New Listing
          </button>
        }
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmListing && (
        <ConfirmationModal
          isOpen={!!deleteConfirmListing}
          title="Delete Surplus Listing?"
          message={`Are you sure you want to remove "${deleteConfirmListing.item}"? This listing will immediately disappear from the consumer explore page.`}
          confirmText="Yes, Delete"
          isDestructive={true}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirmListing(null)}
        />
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingListing ? 'Edit Surplus Food Listing' : 'Publish New Surplus Portion'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in accurate portion information for conscious consumers & charities.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Food Item Name *
                </label>
                <input
                  type="text"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  placeholder="e.g. Sourdough Loaf & Blueberry Muffins Box"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                />
                {formErrors.item && <p className="text-[11px] text-rose-500 mt-1">{formErrors.item}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description & Portions Details *
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe freshness, ingredients, packaging, and portion size."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                />
                {formErrors.description && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Category & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Available Quantity / Portions *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                  {formErrors.quantity && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.quantity}</p>
                  )}
                </div>
              </div>

              {/* Original & Surplus Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                  {formErrors.originalPrice && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.originalPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Surplus Deal Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.surplusPrice}
                    onChange={(e) => setFormData({ ...formData, surplusPrice: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                  {formErrors.surplusPrice && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.surplusPrice}</p>
                  )}
                </div>
              </div>

              {/* Pickup Window & Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pickup Window *
                  </label>
                  <input
                    type="text"
                    value={formData.pickupWindow}
                    onChange={(e) => setFormData({ ...formData, pickupWindow: e.target.value })}
                    placeholder="e.g. Today, 8:30 PM - 10:00 PM"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expiry Notice *
                  </label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    placeholder="e.g. Today, 10:30 PM"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              {/* Image Preview & URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Food Photo (Image URL or Upload Preview)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image web URL"
                      className="w-full text-xs px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-emerald-50 file:text-forest-700 hover:file:bg-emerald-100"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-md transition"
                >
                  {editingListing ? 'Update Listing' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listings Table / Cards */}
      <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
        {myListings.length === 0 ? (
          <EmptyState
            icon={Store}
            title="No surplus listings published"
            description="Create your first surplus listing to connect with local buyers and reduce food waste."
            actionLabel="Add Your First Listing"
            onAction={openCreateModal}
          />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Active & Archived Surplus Portions ({myListings.length})
                </h3>
                <p className="text-xs text-slate-500">Live inventory synchronized with LocalStorage</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-bold tracking-wider">
                    <th className="py-3 px-4">Item & Photo</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Remaining</th>
                    <th className="py-3 px-4">Deal Price</th>
                    <th className="py-3 px-4">Pickup Window</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myListings.map((listing) => (
                    <tr key={listing.listingId} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={listing.image}
                            alt={listing.item}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{listing.item}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {listing.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {listing.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-xs ${
                            listing.quantity > 0
                              ? 'bg-emerald-50 text-forest-800'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {listing.quantity} portions
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-bold text-forest-800">
                          {formatCurrency(listing.surplusPrice)}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through block">
                          {formatCurrency(listing.originalPrice)}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-600">{listing.pickupWindow}</td>

                      <td className="py-3 px-4">
                        <StatusBadge status={listing.status} size="sm" />
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleListingStatus(listing.listingId)}
                            title={listing.status === 'active' ? 'Pause Listing' : 'Activate Listing'}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditModal(listing)}
                            title="Edit Listing"
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-forest-700 transition"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmListing(listing)}
                            title="Delete Listing"
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
