
import React, { useState } from "react";
import { Calendar, Clock, MapPin, MessageSquare, User } from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";

interface BookingFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  counselors: { id: string; name: string; department: string }[];
  className?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  onSubmit, 
  onCancel, 
  counselors,
  className 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    counselorId: "",
    date: "",
    time: "",
    duration: "30",
    location: "Online",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.counselorId) newErrors.counselorId = "Please select a counselor";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Session Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border ${
              errors.title ? "border-destructive" : "border-input"
            } bg-background`}
            placeholder="e.g., Academic Performance Review"
          />
          {errors.title && (
            <p className="text-destructive text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="counselorId" className="block text-sm font-medium mb-1">
            Select Counselor
          </label>
          <div className="relative">
            <select
              id="counselorId"
              name="counselorId"
              value={formData.counselorId}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-md border appearance-none ${
                errors.counselorId ? "border-destructive" : "border-input"
              } bg-background`}
            >
              <option value="">Select a counselor</option>
              {counselors.map((counselor) => (
                <option key={counselor.id} value={counselor.id}>
                  {counselor.name} - {counselor.department}
                </option>
              ))}
            </select>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
          {errors.counselorId && (
            <p className="text-destructive text-xs mt-1">{errors.counselorId}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                  errors.date ? "border-destructive" : "border-input"
                } bg-background`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              {errors.date && (
                <p className="text-destructive text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Time
            </label>
            <div className="relative">
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                  errors.time ? "border-destructive" : "border-input"
                } bg-background`}
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              {errors.time && (
                <p className="text-destructive text-xs mt-1">{errors.time}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-1">
              Duration
            </label>
            <div className="relative">
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background appearance-none"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <div className="relative">
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background appearance-none"
              >
                <option value="Online">Online Meeting</option>
                <option value="Office">Faculty Office</option>
                <option value="Library">Library</option>
                <option value="Study Room">Study Room</option>
              </select>
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background min-h-[100px]"
              placeholder="Briefly describe what you'd like to discuss"
            />
            <MessageSquare className="absolute left-3 top-3 text-muted-foreground" size={16} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <CustomButton
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton type="submit">
          Schedule Session
        </CustomButton>
      </div>
    </form>
  );
};

export default BookingForm;
