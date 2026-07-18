import { useState } from "react";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      image: "/images/REC 2.jpg",
      title: "Completed 4 Bedroom Mansion",
    },
    {
      id: 2,
      image: "/images/Catapiller.jpg",
      title: "Catapiller",
    },
    {
      id: 3,
      image: "/images/Architectural drawings 2.jpg",
      title: "Skyscraper Architectural drawings",
    },
    {
      id: 4,
      image: "/images/Ongoing works.jpg",
      title: "Ongoing Construction Site",
    },
    {
      id: 5,
      image: "/images/Architectural drawings.jpg",
      title: "Architectural Drawings for a 3 bedroom house",
    },
    {
      id: 6,
      image: "/images/Concrete mixer 2.jpg",
      title: "Lorry Concrete mixer",
    },
  ];

  return (
    <>
      <UserNavbar />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="uppercase tracking-[0.3em] text-[#1495CC] font-semibold">
            Gallery
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            OUR PROJECT GALLARY
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Explore our construction projects, machinery operations,
            building plans, and completed developments.
          </p>

        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-3xl shadow-lg bg-white"
                onClick={() => setSelectedImage(item)}
              >
                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />

            <div className="text-center mt-4 text-white">
              <h2 className="text-2xl font-bold">
                {selectedImage.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default GalleryPage;