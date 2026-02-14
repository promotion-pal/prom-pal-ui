// import Image, { ImageProps } from "next/image";
// import { forwardRef } from "react";

// interface PromPhotoProps extends Omit<ImageProps, "alt"> {
//   alt?: string;
//   promotionText?: string;
//   badge?: string;
// }

// const PromPhoto = forwardRef<HTMLImageElement, PromPhotoProps>(
//   ({ promotionText, badge, alt = "Promotion image", ...props }, ref) => {
//     return (
//       <div className="relative">
//         <Image ref={ref} alt={alt} {...props} />
//         {promotionText && (
//           <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-center">
//             {promotionText}
//           </div>
//         )}
//         {badge && (
//           <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//             {badge}
//           </div>
//         )}
//       </div>
//     );
//   },
// );

// PromPhoto.displayName = "PromPhoto";

// export { PromPhoto };
