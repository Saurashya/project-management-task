import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const DocumentViewerModal = ({ isOpen, onClose, documentUrl, documentType }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const renderContent = () => {
    if (hasError) {
      return <p className="text-center text-red-500">Unable to load document. Please check the URL.</p>;
    }

    switch (documentType) {
      case 'pdf':
        return (
          <iframe
            src={documentUrl}
            width="100%"
            height="100%"
            onError={() => setHasError(true)}
            title="PDF Viewer"
          />
        );
      case 'image':
        return (
          <img
            src={documentUrl}
            alt="Document"
            className="max-w-full max-h-full object-contain"
            onError={() => setHasError(true)}
          />
        );
      case 'iframe':
      default:
        return (
          <iframe
            src={documentUrl}
            width="100%"
            height="100%"
            onError={() => setHasError(true)}
            title="Document Viewer"
          />
        );
    }
  };

  return (
    <ReactModal
      key={isOpen}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <button onClick={onClose} className="text-xl">×</button>
          <button onClick={toggleFullscreen} className="text-xl">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </ReactModal>
  );
};

export default DocumentViewerModal;
