
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AlertDialog = ({ open, onOpenChange, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          {children}
        </div>
      )}
    </AnimatePresence>
  );
};

export const AlertDialogContent = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={`relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
));
AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = ({ className = "", ...props }) => (
  <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogFooter = ({ className = "", ...props }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 ${className}`} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h2 ref={ref} className={`text-lg font-semibold text-gray-900 ${className}`} {...props} />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-500 ${className}`} {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = React.forwardRef(({ className = "", ...props }, ref) => (
   <button ref={ref} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 mt-2 sm:mt-0 ${className}`} {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = React.forwardRef(({ className = "", ...props }, ref) => (
  <button ref={ref} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2 mt-2 sm:mt-0 ${className}`} {...props} />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
