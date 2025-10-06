import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; content: string }> = ({
    isOpen,
    onClose,
    title,
    content,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose} // Close modal when clicking outside the content
      >
        <div
          className="bg-gradient-to-br from-pink-200 via-rose-200 to-indigo-200 rounded-lg w-full max-w-3xl mx-4 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 bg-pink-400 rounded-full"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <X />
          </button>
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h3 className="text-xl font-semibold text-pink-600 mt-4 mb-2" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h4 className="text-lg font-semibold text-pink-600 mt-3 mb-2" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h5 className="text-base font-semibold text-pink-600 mt-3 mb-2" {...props} />
                ),
                p: ({ ...props }) => <p className="mb-3" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-inside mb-3" {...props} />,
                li: ({ ...props }) => <li className="mb-1" {...props} />,
                strong: ({ ...props }) => (
                  <strong className="font-semibold text-pink-700" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
};

export default Modal
