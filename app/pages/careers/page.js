"use client";

import { useState } from "react";
import { MapPin, Clock, CalendarDays, X } from "lucide-react";
import { defaultHead } from "next/head";

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: null,
    jobTitle: "",
  };

  const [form, setForm] = useState(defaultForm);

  const jobOpenings = [
    {
      title: "Barista",
      location: "Jaipur, India",
      type: "Full-time",
      date: "May 10, 2025",
    },
    {
      title: "Brand Manager",
      location: "Mumbai, India",
      type: "Freelancer",
      date: "May 7, 2025",
    },
    {
      title: "Cafe Intern",
      location: "Delhi, India",
      type: "Internship",
      date: "May 5, 2025",
    },
    {
      title: "Customer Support",
      location: "Bangalore, India",
      type: "Full-time",
      date: "May 2, 2025",
    },
    {
      title: "Content Strategist",
      location: "Remote",
      type: "Freelancer",
      date: "May 1, 2025",
    },
    {
      title: "Operations Executive",
      location: "Hyderabad, India",
      type: "Full-time",
      date: "April 29, 2025",
    },
  ];

  const sendEmail = async (formData) => {
    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("✅ Your message was sent. We'll get back to you soon!");
      } else {
        alert("❌ Failed to send: " + result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf0] px-8 py-20 transition-all duration-200">
      <h1 className="text-4xl font-semibold text-center mb-5 text-gray-800">
        Careers
      </h1>
      <h2 className="text-2xl font-semibold text-center mb-12 text-gray-800">
        Current Openings
      </h2>
      {isModalOpen && (
        <div
          onClick={() => {
            setForm(defaultForm);
            setIsModalOpen(false);
          }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Apply for Barista</h2>
              <button
                onClick={() => {
                  setForm(defaultForm);
                  setIsModalOpen(false);
                }}
                className="text-red-500"
              >
                <X className="w-6 h-6 mr-2" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="name" className="block text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border p-2 mt-1 rounded-lg text-sm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border p-2 mt-1 rounded-lg text-sm"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="phone" className="block text-sm">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border p-2 mt-1 rounded-lg text-sm"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="resume" className="block text-sm">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resume"
                    className="w-full border p-2 mt-1 rounded-lg text-xs"
                    onChange={(e) =>
                      setForm({ ...form, resume: e.target.files[0] })
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full border p-2 mt-1 rounded-lg text-sm"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  disabled={
                    !(
                      form.name &&
                      form.email &&
                      form.phone &&
                      form.address &&
                      form.resume
                    )
                  }
                  className={`mt-8 py-2 w-2/5 rounded-lg font-semibold ${
                    form.name &&
                    form.email &&
                    form.phone &&
                    form.address &&
                    form.resume
                      ? "bg-amber-950 text-white hover:bg-amber-900 ease-in-out duration-200"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    // sendEmail(form);
                    setForm(defaultForm);
                    setIsModalOpen(false);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobOpenings.map((job, idx) => (
          <div
            key={idx}
            className="card p-6 bg-white border-[1px] border-amber-700 rounded-2xl"
          >
            <h3 className="font-bold text-lg mb-4 uppercase">{job.title}</h3>

            <div className="flex items-center text-md text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center text-md text-gray-600 mt-2">
              <Clock className="w-4 h-4 mr-2" />
              <span>{job.type}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-md text-gray-600 mt-2">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>Posted on: {job.date}</span>
              </div>

              <button
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    jobTitle: job.title,
                  }));
                  setIsModalOpen(true);
                }}
                className="bg-amber-800 text-white py-2 px-4 rounded-md text-sm hover:bg-amber-700 transition duration-200 ease-in-out"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
