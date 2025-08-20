// components/EditProfileModal.js
"use client";

import { useState, useEffect } from "react";
import useEditProfileModal from "@/store/useEditProfileModal";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { avatars } from "@/lib/avatarData"; // <-- Import avatars
import Image from "next/image";

export default function EditProfileModal() {
  const { isOpen, closeModal } = useEditProfileModal();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.name || "");
      setEmail(session.user.email || "");
      setSelectedAvatar(session.user.image || ""); // NextAuth session uses `image`
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, avatarUrl: selectedAvatar }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update profile.");
      }
      toast.success("Profile updated successfully!");
      closeModal();
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state on close
    if (session?.user) {
      setUsername(session.user.name || "");
      setEmail(session.user.email || "");
      setSelectedAvatar(session.user.image || "");
    }
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Your Profile
        </h2>

        {/* Avatar Selection Grid */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Choose Your Avatar
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.url)}
                className={`p-1 rounded-full focus:outline-none transition-all ${
                  selectedAvatar === avatar.url
                    ? "ring-2 ring-amber-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <Image
                  src={avatar.url}
                  alt={`Avatar ${avatar.id}`}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form fields for username, email, mobile number */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                value={session?.user?.mobileNumber || ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

// // components/EditProfileModal.js
// "use client";

// import { useState, useEffect } from 'react';
// import useEditProfileModal from '@/store/useEditProfileModal';
// import { useSession } from 'next-auth/react';
// import { X } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// export default function EditProfileModal() {
//   const { isOpen, closeModal } = useEditProfileModal();
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Pre-fill the form with user data when the session loads
//     if (session?.user) {
//       setUsername(session.user.name || '');
//       setEmail(session.user.email || '');
//     }
//   }, [session]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const res = await fetch('/api/profile', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, email }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || 'Failed to update profile.');
//       }

//       toast.success('Profile updated successfully!');
//       closeModal();
//       router.refresh(); // Refresh the page to show updated session data in NavBar

//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClose = () => {
//     // Reset fields to session data when closing without saving
//     if (session?.user) {
//       setUsername(session.user.name || '');
//       setEmail(session.user.email || '');
//     }
//     closeModal();
//   }

//   if (!isOpen || status !== 'authenticated') {
//     return null;
//   }

//   return (
//     <div
//       onClick={handleClose}
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-6">Edit Your Profile</h2>

//         {/* Avatar Section Placeholder */}
//         <div className="flex flex-col items-center mb-6">
//             <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
//                 <span className="text-gray-500">Avatar</span>
//             </div>
//             <button className="text-sm text-amber-800 hover:underline">Choose Avatar</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//               <input
//                 id="mobile"
//                 type="tel"
//                 value={session?.user?.mobileNumber || ''}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full mt-6 bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:bg-gray-400 transition duration-200"
//           >
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>
//           {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
