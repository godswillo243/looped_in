import { useState, type ChangeEvent } from "react";
import { Camera, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileImageUploader() {
  const [image, setImage] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-4 shadow-lg rounded-2xl text-center">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 border-2 border-dashed border-gray-300">
              <Camera className="text-gray-400" size={32} />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            <Camera size={16} />
            {image ? "Change Photo" : "Upload Photo"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
