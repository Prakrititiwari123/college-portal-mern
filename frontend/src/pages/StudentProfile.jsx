// import React, { useEffect, useState } from 'react';
// import ProtectedRoute from '../components/ProtectedRoute';
// import { useAuth } from '../context/AuthContext';

// function Inner() {
//     const { getProfile, updateProfile, user, setUser } = useAuth();
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [form, setForm] = useState({ phone: '', address: '' });

//     useEffect(() => {
//         const load = async () => {
//             setLoading(true);
//             try {
//                 const data = await getProfile();
//                 setProfile(data);
//                 setForm({ phone: data.phone || '', address: data.address || '' });
//             } catch (err) {
//                 setError(err.message || 'Failed to load profile');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         load();
//     }, [getProfile]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setMessage('');
//         try {
//             const res = await updateProfile(form);
//             setMessage('Profile updated');
//             setProfile(res.user);
//             // update local user display if changed
//             if (setUser && res.user) setUser(res.user);
//         } catch (err) {
//             setError(err.message || 'Failed to update');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!profile) return <div className="p-8">{loading ? 'Loading...' : 'No profile'}</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
//                 <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//                 {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
//                 {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Name</label>
//                         <div className="p-2 border rounded">{profile.name}</div>
//                     </div>
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Email</label>
//                         <div className="p-2 border rounded">{profile.email}</div>
//                     </div>
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Roll No</label>
//                         <div className="p-2 border rounded">{profile.roll_no || '-'}</div>
//                     </div>
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Branch</label>
//                         <div className="p-2 border rounded">{profile.branch || '-'}</div>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Phone</label>
//                         <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 border rounded" />
//                     </div>
//                     <div>
//                         <label className="block text-sm text-gray-600 mb-1">Address</label>
//                         <input value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} className="w-full px-3 py-2 border rounded" />
//                     </div>
//                     <button className="py-2 px-4 bg-indigo-600 text-white rounded" disabled={loading}>{loading? 'Updating...' : 'Update Profile'}</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default function StudentProfile() {
//     return (
//         <ProtectedRoute requiredRole="STUDENT">
//             <Inner />
//         </ProtectedRoute>
//     );
// }


import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

function Inner() {
  const { getProfile, updateProfile, user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProfile();
        if (!mounted) return;
        setProfile(data);
        setForm({ phone: data.phone || '', address: data.address || '' });
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [getProfile]);

  const validate = () => {
    if (form.phone && !/^\d{7,15}$/.test(form.phone)) {
      setError('Phone should contain 7-15 digits only.');
      return false;
    }
    if (form.address && form.address.length > 500) {
      setError('Address is too long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!validate()) return;
    const updates = {};
    if (form.phone !== (profile.phone || '')) updates.phone = form.phone;
    if (form.address !== (profile.address || '')) updates.address = form.address;
    if (Object.keys(updates).length === 0) {
      setMessage('No changes to save.');
      return;
    }

    setSaving(true);
    try {
      const res = await updateProfile(updates);
      setProfile(res.user);
      if (setUser) setUser(res.user); // update global user if needed
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (!profile) return <div className="p-8">No profile available.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <div className="p-2 border rounded">{profile.name}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="p-2 border rounded">{profile.email}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Roll No</label>
            <div className="p-2 border rounded">{profile.roll_no || '-'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Branch</label>
            <div className="p-2 border rounded">{profile.branch || '-'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Semester</label>
            <div className="p-2 border rounded">{profile.semester ?? '-'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Enrollment Year</label>
            <div className="p-2 border rounded">{profile.enrollment_year || '-'}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={4}
              placeholder="Enter address"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded disabled:opacity-60"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Update Profile'}
            </button>
            <button
              type="button"
              className="py-2 px-4 border rounded text-gray-700"
              onClick={() => {
                setForm({ phone: profile.phone || '', address: profile.address || '' });
                setMessage('');
                setError('');
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StudentProfile() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <Inner />
    </ProtectedRoute>
  );
}
