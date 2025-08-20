// app/our-team/page.js
import { teamMembers } from '@/lib/teamData'; // Import data
import Image from 'next/image';

// // No "use client". This is a fast Server Component.
// export default function OurTeam() {
//   return (
//     <div className="min-h-screen bg-[#fffbf0] px-8 py-20">
//       <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">
//         Our Team
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md ...">
//             <Image // Use Next.js Image component
//               src={member.image}
//               alt={member.name}
//               width={400}
//               height={400}
//               className="w-full h-60 object-cover rounded-lg mb-4"
//             />
//             <h2 className="text-lg ...">{member.name}</h2>
//             <p className="text-sm ...">{member.designation}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



const OurTeam = () => {
  return (
    <div className="min-h-screen bg-[#fffbf0] px-8 py-20">
      <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">
        Our Team
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900 text-center">
              {member.name}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {member.designation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;