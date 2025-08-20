"use client";

import React, { useState } from "react";

const Franchise = () => {
  const fields = [
    {
      label: "Your Name",
      name: "name",
      required: true,
      hint: "Enter your full name",
    },
    {
      label: "Contact Number",
      name: "contact",
      required: true,
      hint: "Enter your primary phone number",
    },
    {
      label: "Alternate Contact Number",
      name: "altContact",
      required: true,
      hint: "Secondary phone number",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      type: "email",
      hint: "We'll contact you here",
    },
    {
      label: "ID Proof (PAN/Aadhaar)",
      name: "idProof",
      hint: "Upload a scanned copy",
    },
    {
      label: "Temporary Address",
      name: "tempAddress",
      required: true,
      hint: "Your current address",
    },
    {
      label: "Permanent Address",
      name: "permAddress",
      hint: "If different from temporary address",
    },
    {
      label: "Educational Qualification",
      name: "education",
      required: true,
      hint: "Your highest qualification",
    },
    {
      label: "Your Photo",
      name: "photo",
      required: true,
      type: "file",
      hint: "Passport-sized photo",
    },
    {
      label: "Professional Background",
      name: "background",
      required: true,
      hint: "Work experience, field, etc.",
    },
    {
      label: "Spouse Name",
      name: "spouseName",
      required: true,
      hint: "Full name",
    },
    {
      label: "Spouse Qualification",
      name: "spouseQual",
      required: true,
      hint: "Education background",
    },
    {
      label: "Father's Name",
      name: "fatherName",
      required: true,
      hint: "Full name",
    },
    {
      label: "Father's Residence",
      name: "fatherResidence",
      required: true,
      hint: "City and address",
    },
    {
      label: "Family Business and Brief",
      name: "familyBusiness",
      required: true,
      type: "textarea",
      hint: "Describe briefly",
    },
    {
      label: "Preferred Franchise City",
      name: "preferredCity",
      required: true,
      hint: "City where you want the franchise",
    },
    {
      label: "Why Franchise?",
      name: "franchiseWhy",
      required: true,
      type: "textarea",
      hint: "Tell us your motivation",
    },
    {
      label: "Why This Category?",
      name: "categoryWhy",
      required: true,
      type: "textarea",
      hint: "Why F&B, why coffee?",
    },
    {
      label: "Expected Monthly Sales",
      name: "expectedSales",
      required: true,
      hint: "Your expected monthly revenue",
    },
    {
      label: "ITR 2022-23",
      name: "itr2022",
      type: "file",
      hint: "Upload the document (optional)",
    },
    {
      label: "ITR 2023-24",
      name: "itr2023",
      type: "file",
      hint: "Upload the document (optional)",
    },
  ];
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {});

  const [form, setForm] = useState(initialFormState);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    fields.forEach((field) => {
      if (field.required) {
        const value = form[field.name];
        const isFile = field.type === "file";
        const isEmpty = isFile ? !value : value.trim() === "";
        if (isEmpty) {
          newErrors[field.name] = `This ${field.label} field is required.`;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", form);
      setForm(initialFormState);
      // Add email or database logic here
    }
  };

  const renderField = (field, index) => {
    const { label, name, required, hint, type = "text" } = field;

    const commonProps = {
      name,
      required,
      onChange: handleChange,
      className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
      placeholder: hint,
    };

    const isHalf = index < 14;

    return (
      <div
        key={index}
        className={`p-2 ${isHalf ? "w-full md:w-1/2" : "w-full"}`}
      >
        <label className="block font-medium text-gray-700 mb-1 text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === "textarea" ? (
          <textarea {...commonProps} rows={4} />
        ) : (
          <input type={type} {...commonProps} />
        )}

        {errors[name] && (
          <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Get Started with Us</h1>
        <h1 className="text-4xl font-bold mb-16">
          Coffee Heaven Franchise Form
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">{fields.map(renderField)}</div>

        <div className="w-full mt-6 p-2">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:scale-95 duration-300"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Franchise;
