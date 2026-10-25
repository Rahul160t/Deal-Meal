import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  UserCheck,
  Store,
  HeartHandshake,
  ArrowRight,
  AlertCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { PUNE_LOCATIONS } from '../data/initialData';

export const SignupPage = () => {
  const { signup } = useApp();
  const [role, setRole] = useState('consumer'); // 'consumer', 'business', 'charity'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Koregaon Park',
    businessName: '',
    businessType: 'Bakery & Cafe',
    address: '',
    organizationName: '',
    registrationNumber: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError('Please provide an email address.');
      return;
    }

    if (role === 'consumer' && !formData.name) {
      setError('Please provide your name.');
      return;
    }

    if (role === 'business' && !formData.businessName) {
      setError('Please provide your business or outlet name.');
      return;
    }

    if (role === 'charity' && !formData.organizationName) {
      setError('Please provide your NGO or organization name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newUser = signup({ ...formData, role });
      setIsSubmitting(false);

      if (role === 'business') navigate('/business/dashboard');
      else if (role === 'charity') navigate('/charity/dashboard');
      else navigate('/consumer/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-limebrand-300" />
            </div>
            <span className="text-2xl font-black text-forest-950">
              Deal <span className="text-forest-600">Meal</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Your Demo Account
          </h2>
          <p className="text-xs text-slate-500">
            Select your role in the food surplus network to configure your experience.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            Choose Your Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole('consumer')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'consumer'
                  ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserCheck className={`w-5 h-5 ${role === 'consumer' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span className="text-xs font-bold">Consumer</span>
              <span className="text-[10px] text-slate-400">Rescue Food</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('business')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'business'
                  ? 'border-amber-600 bg-amber-50/80 text-amber-950 ring-2 ring-amber-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Store className={`w-5 h-5 ${role === 'business' ? 'text-amber-700' : 'text-slate-400'}`} />
              <span className="text-xs font-bold">Business</span>
              <span className="text-[10px] text-slate-400">List Surplus</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('charity')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                role === 'charity'
                  ? 'border-purple-600 bg-purple-50/80 text-purple-950 ring-2 ring-purple-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <HeartHandshake className={`w-5 h-5 ${role === 'charity' ? 'text-purple-700' : 'text-slate-400'}`} />
              <span className="text-xs font-bold">Charity / NGO</span>
              <span className="text-[10px] text-slate-400">Claim Free</span>
            </button>
          </div>
        </div>

        {/* Dynamic Signup Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Role-specific Fields */}
          {role === 'consumer' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Rahul Patil"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>
            </>
          )}

          {role === 'business' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business / Store Name
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="e.g. Blue Tokai Cafe / German Bakery"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Category
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
                >
                  <option value="Bakery & Cafe">Bakery & Cafe</option>
                  <option value="Restaurant & Dining">Restaurant & Dining</option>
                  <option value="Grocery & Organic Farm">Grocery & Organic Farm</option>
                  <option value="Dairy & Sweet Mart">Dairy & Sweet Mart</option>
                  <option value="Other Provider">Other Food Vendor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Store Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="e.g. Lane 7, Koregaon Park, Pune"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                />
              </div>
            </>
          )}

          {role === 'charity' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  NGO / Foundation Name
                </label>
                <div className="relative">
                  <HeartHandshake className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    placeholder="e.g. Pune Food Rescue Mission"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  NGO Registration / 80G No. (Demo)
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="e.g. MAH/PUN/2020/8912"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                />
              </div>
            </>
          )}

          {/* Shared Contact & Location Fields */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Locality (Pune)
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
              >
                {PUNE_LOCATIONS.filter((l) => l !== 'All Locations').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-forest-700 hover:bg-forest-800 text-white shadow-md transition flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? 'Creating profile...' : `Register as ${role.toUpperCase()}`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-forest-700 font-bold hover:underline">
            Go to 1-click login
          </Link>
        </p>
      </div>
    </div>
  );
};
