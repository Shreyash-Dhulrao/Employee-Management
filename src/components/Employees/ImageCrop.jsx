import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, setImageName }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");

  // Function to handle setting canvas preview
  const setCanvasPreview = (image, canvas, crop) => {
    if (!crop || !canvas || !image) return;

    const ctx = canvas.getContext("2d");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  };

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
      setImageName(reader.result.toString(), file.name);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    if (width && height) {
      const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

      const initialCrop = makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
      );
      const centeredCrop = centerCrop(initialCrop, width, height);

      setCrop(centeredCrop);
    }
  };

  const handleCropImage = () => {
    setCanvasPreview(
      imgRef.current,            // HTMLImageElement
      previewCanvasRef.current,   // HTMLCanvasElement
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    // Check if the canvas has any content
    if (!previewCanvasRef.current) {
      console.error("Canvas reference is missing or not set.");
      return;
    }

    try {
      const imageFormat = "image/jpeg"; // Change to "image/png" if you need PNG
      const newImageSrc = previewCanvasRef.current.toDataURL(imageFormat);

      if (!newImageSrc.startsWith("data:image")) {
        console.error("Failed to generate image from canvas.");
        return;
      }

      const newImage = new Image();
      newImage.src = newImageSrc;
      setImageName(newImage)
      closeModal();
    } catch (error) {
      console.error("Error generating image from canvas:", error);
    }
  };


  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="inputImg"
        onChange={onSelectFile}
        className="hidden"
      />
      <label className="my-3 mx-2" htmlFor="inputImg">
        <div className="font-noto bg-zinc-200 dark:bg-zinc-900 rounded-lg border-dotted border-2 border-sky-400 items-center justify-center flex flex-col gap h-24 w-full">
        <i className="far fa-file w-10 h-10 text-4xl " ></i>
        Select an Image
        </div>
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            type="button"
            className="text-white font-noto text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={handleCropImage}
          >
            Crop Image
          </button>
          <div>
            <canvas ref={previewCanvasRef} className="mt-4 border w-96 h-96" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
