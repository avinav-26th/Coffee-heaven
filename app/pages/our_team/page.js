"use client";

const teamMembers = [
  {
    name: "Avinav Prasad",
    designation: "Founder and CEO",
    image: "/images/team/aman-jain.jpg",
  },
  {
    name: "Rohan Kumar Pandey",
    designation: "Co-founder and CEO",
    image: "/images/team/avinav-prasad.jpg",
  },
  {
    name: "Ankit Kumar",
    designation: "Co-founder and CEO",
    image: "/images/team/avinav-prasad.jpg",
  },
  {
    name: "Siddhant Raj",
    designation: "CTO",
    image: "/images/team/avinav-prasad.jpg",
  },
  {
    name: "Prachi Kumari",
    designation: "Head of Operations",
    image: "/images/team/riya-sharma.jpg",
  },
  {
    name: "Aditi Prasad",
    designation: "Lead Product Designer",
    image: "/images/team/rahul-mehta.jpg",
  },
  {
    name: "Priya Verma",
    designation: "Lead Developer",
    image: "/images/team/priya-verma.jpg",
  },
  {
    name: "Neeraj Kumar",
    designation: "Business Analyst",
    image: "/images/team/neeraj-kumar.jpg",
  },
  {
    name: "Sneha Kapoor",
    designation: "Operations Manager",
    image: "/images/team/sneha-kapoor.jpg",
  },
  {
    name: "Sarthak Gupta",
    designation: "Tech Advisor",
    image: "/images/team/sarthak-gupta.jpg",
  },
];

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