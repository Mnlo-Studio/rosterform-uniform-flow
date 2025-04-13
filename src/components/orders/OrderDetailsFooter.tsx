
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, SendHorizontal, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderDetailsFooterProps {
  isEditMode: boolean;
  onSaveChanges: () => void;
  onDownloadOriginal: () => void;
  onDownloadUpdated: () => void;
  onSendInvoice: () => void;
}

const OrderDetailsFooter: React.FC<OrderDetailsFooterProps> = ({
  isEditMode,
  onSaveChanges,
  onDownloadOriginal,
  onDownloadUpdated,
  onSendInvoice
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
      <div className="flex items-center space-x-2">
        <Link to="/orders">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
        {isEditMode ? (
          <Button onClick={onSaveChanges} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={onDownloadOriginal}>
              <Download className="h-4 w-4 mr-2" />
              Download Original
            </Button>
            <Button variant="outline" onClick={onDownloadUpdated}>
              <Download className="h-4 w-4 mr-2" />
              Download Updated
            </Button>
            <Button onClick={onSendInvoice} className="bg-blue-600 hover:bg-blue-700">
              <SendHorizontal className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsFooter;
