"use client";

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Leaf, 
  Calendar,
  Hash,
  User,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, className = "" }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
  </div>
);

const CardBody = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "primary", 
  className = "",
  ...props 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2";
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:cursor-not-allowed",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white"
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default function BuyerRetirePage() {
  const [retireQuantity, setRetireQuantity] = useState('');
  const [isRetiring, setIsRetiring] = useState(false);
  const [retireStatus, setRetireStatus] = useState(null);
  const [availableCredits, setAvailableCredits] = useState(1250); // Mock available credits
  const [retiredCredits, setRetiredCredits] = useState([]);
  const [certificate, setCertificate] = useState(null);

  // Mock user data - in real app this would come from auth context
  const userData = {
    name: "EcoTech Solutions",
    email: "contact@ecotech.com",
    id: "BYR-001"
  };

  const handleRetire = async () => {
    // Validation
    if (!retireQuantity || retireQuantity <= 0) {
      setRetireStatus({
        type: 'error',
        message: 'Please enter a valid quantity to retire'
      });
      return;
    }

    if (parseInt(retireQuantity) > availableCredits) {
      setRetireStatus({
        type: 'error',
        message: `Cannot retire ${retireQuantity} credits. Available: ${availableCredits}`
      });
      return;
    }

    setIsRetiring(true);
    setRetireStatus(null);

    try {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // Generate certificate data
      const newCertificate = {
        id: `CERT-${Date.now()}`,
        quantity: parseInt(retireQuantity),
        retiredBy: userData.name,
        retiredDate: new Date().toLocaleDateString(),
        retiredTime: new Date().toLocaleTimeString(),
        impactStatement: `This certificate represents the retirement of ${retireQuantity} carbon credits, equivalent to removing approximately ${Math.round(retireQuantity * 0.001)} tons of CO2 from the atmosphere.`,
        certificateNumber: `BC-RET-${Date.now().toString().slice(-8)}`
      };

      // Update states
      setAvailableCredits(prev => prev - parseInt(retireQuantity));
      setRetiredCredits(prev => [newCertificate, ...prev]);
      setCertificate(newCertificate);
      
      setRetireStatus({
        type: 'success',
        message: `Successfully retired ${retireQuantity} credits!`
      });
      
      setRetireQuantity('');
      
    } catch (error) {
      setRetireStatus({
        type: 'error',
        message: 'Failed to retire credits. Please try again.'
      });
    } finally {
      setIsRetiring(false);
    }
  };

  const downloadCertificate = (cert) => {
    // Create a new window for the PDF content
    const printWindow = window.open('', '_blank');
    
    const certificateHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Carbon Credit Retirement Certificate</title>
        <meta charset="UTF-8">
        <style>
            @page {
                size: A4;
                margin: 20mm;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #2c3e50;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .certificate {
                background: white;
                width: 210mm;
                min-height: 297mm;
                padding: 30mm;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .certificate::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 8mm;
                background: linear-gradient(90deg, #10b981, #059669, #047857);
            }
            
            .certificate::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 8mm;
                background: linear-gradient(90deg, #10b981, #059669, #047857);
            }
            
            .header {
                text-align: center;
                margin-bottom: 40px;
                position: relative;
            }
            
            .logo {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #10b981, #059669);
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 36px;
                font-weight: bold;
                box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
            }
            
            .certificate-title {
                font-size: 32px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 3px;
                position: relative;
            }
            
            .subtitle {
                font-size: 18px;
                color: #059669;
                font-weight: 500;
                margin-bottom: 30px;
            }
            
            .certificate-number {
                background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
                padding: 15px 30px;
                border-radius: 50px;
                display: inline-block;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 16px;
                color: #374151;
                border: 2px solid #d1d5db;
                margin-bottom: 40px;
            }
            
            .content {
                background: #f8fafc;
                padding: 30px;
                border-radius: 15px;
                margin-bottom: 40px;
                border-left: 6px solid #10b981;
                position: relative;
            }
            
            .content::before {
                content: '🌱';
                position: absolute;
                top: -10px;
                right: 20px;
                font-size: 40px;
                opacity: 0.7;
            }
            
            .retirement-statement {
                font-size: 20px;
                text-align: center;
                margin-bottom: 30px;
                color: #1f2937;
                font-weight: 500;
                line-height: 1.7;
            }
            
            .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
                margin-bottom: 30px;
            }
            
            .detail-item {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                border: 1px solid #e5e7eb;
            }
            
            .detail-label {
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                font-weight: 600;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }
            
            .detail-value {
                font-size: 16px;
                color: #1f2937;
                font-weight: 600;
            }
            
            .impact-section {
                background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                padding: 25px;
                border-radius: 15px;
                margin: 30px 0;
                border: 2px solid #10b981;
                position: relative;
            }
            
            .impact-section::before {
                content: '🌍';
                position: absolute;
                top: -15px;
                left: 20px;
                font-size: 30px;
                background: white;
                padding: 5px 10px;
                border-radius: 50%;
            }
            
            .impact-title {
                font-size: 18px;
                color: #065f46;
                font-weight: bold;
                margin-bottom: 10px;
                margin-left: 40px;
            }
            
            .impact-text {
                color: #047857;
                font-size: 14px;
                line-height: 1.6;
                font-style: italic;
            }
            
            .verification-section {
                margin-top: 50px;
                text-align: center;
                padding: 25px;
                border: 2px dashed #d1d5db;
                border-radius: 10px;
                background: #fafafa;
            }
            
            .verification-text {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 20px;
                font-style: italic;
            }
            
            .footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
            }
            
            .platform-info {
                color: #059669;
                font-weight: 600;
                font-size: 16px;
            }
            
            .generation-date {
                color: #6b7280;
                font-size: 12px;
            }
            
            .decorative-border {
                position: absolute;
                top: 15mm;
                left: 15mm;
                right: 15mm;
                bottom: 15mm;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                pointer-events: none;
            }
            
            .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 100px;
                color: rgba(16, 185, 129, 0.05);
                font-weight: bold;
                pointer-events: none;
                z-index: 0;
            }
            
            @media print {
                body {
                    background: white !important;
                    padding: 0 !important;
                }
                
                .certificate {
                    box-shadow: none !important;
                    border-radius: 0 !important;
                    width: 100% !important;
                    min-height: 100vh !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="decorative-border"></div>
            <div class="watermark">RETIRED</div>
            
            <div class="header">
                <div class="logo">🌊</div>
                <div class="certificate-title">Carbon Credit Retirement Certificate</div>
                <div class="subtitle">Blue Carbon Platform</div>
                <div class="certificate-number">Certificate No: ${cert.certificateNumber}</div>
            </div>
            
            <div class="content">
                <div class="retirement-statement">
                    This certifies that <strong>${cert.retiredBy}</strong> has permanently retired 
                    <strong style="color: #059669; font-size: 24px;">${cert.quantity}</strong> carbon credits
                    on <strong>${cert.retiredDate}</strong> at <strong>${cert.retiredTime}</strong>
                </div>
                
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Retirement ID</div>
                        <div class="detail-value">${cert.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Credits Retired</div>
                        <div class="detail-value" style="color: #059669;">${cert.quantity} Credits</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Retired By</div>
                        <div class="detail-value">${cert.retiredBy}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Retirement Date</div>
                        <div class="detail-value">${cert.retiredDate} ${cert.retiredTime}</div>
                    </div>
                </div>
            </div>
            
            <div class="impact-section">
                <div class="impact-title">Environmental Impact Statement</div>
                <div class="impact-text">
                    ${cert.impactStatement}
                </div>
            </div>
            
            <div class="verification-section">
                <div class="verification-text">
                    This certificate serves as immutable proof that the above-mentioned carbon credits 
                    have been permanently retired from circulation and cannot be traded, sold, or used again. 
                    The retirement has been recorded on the Blue Carbon Platform's blockchain ledger.
                </div>
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px;">
                    <div style="text-align: center;">
                        <div style="width: 150px; height: 2px; background: #d1d5db; margin: 0 auto 5px;"></div>
                        <div style="font-size: 12px; color: #6b7280;">Platform Verification</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 150px; height: 2px; background: #d1d5db; margin: 0 auto 5px;"></div>
                        <div style="font-size: 12px; color: #6b7280;">Digital Signature</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <div class="platform-info">Blue Carbon Platform</div>
                <div class="generation-date">Generated on ${new Date().toLocaleString()}</div>
            </div>
        </div>
        
        <script>
            // Auto-print when page loads
            window.onload = function() {
                window.print();
            }
            
            // Close window after printing
            window.onafterprint = function() {
                window.close();
            }
        </script>
    </body>
    </html>`;
    
    // Write the HTML content and trigger print
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRetire();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Retire Credits
          </h1>
          <p className="text-gray-600 mt-2">Make a lasting environmental impact by retiring your carbon credits</p>
        </div>

        {/* Available Credits Display */}
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold opacity-90">Available Credits</h3>
                <p className="text-3xl font-bold">{availableCredits.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white/20 rounded-full">
                <Leaf className="h-8 w-8" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Retirement Form */}
        <Card>
          <CardHeader title="Generate Retirement Certificate" />
          <CardBody>
            {retireStatus && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                retireStatus.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {retireStatus.type === 'success' ? 
                  <CheckCircle className="h-5 w-5 flex-shrink-0" /> : 
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                }
                <span>{retireStatus.message}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity to Retire
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={retireQuantity}
                    onChange={(e) => setRetireQuantity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter quantity"
                    className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="1"
                    max={availableCredits}
                  />
                  <Button
                    onClick={handleRetire}
                    disabled={isRetiring || !retireQuantity}
                    className="h-12 px-8"
                  >
                    {isRetiring ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Retiring...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Retire Credits</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Maximum available: {availableCredits.toLocaleString()} credits
                </p>
              </div>

              {/* Impact Preview */}
              {retireQuantity && retireQuantity > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2 flex items-center">
                    <Leaf className="h-4 w-4 mr-2" />
                    Environmental Impact Preview
                  </h4>
                  <p className="text-emerald-700 text-sm">
                    Retiring {retireQuantity} credits will remove approximately{' '}
                    <strong>{Math.round(retireQuantity * 0.001)} tons of CO2</strong> equivalent 
                    from circulation, representing your commitment to environmental stewardship.
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Latest Certificate */}
        {certificate && (
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardHeader title="🎉 Latest Retirement Certificate" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0" />
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Certificate #:</span>
                  <code className="font-mono font-semibold">{certificate.certificateNumber}</code>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{certificate.retiredDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-emerald-600">{certificate.quantity} credits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Retired by:</span>
                  <span className="font-semibold">{certificate.retiredBy}</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-700 italic">
                  {certificate.impactStatement}
                </p>
              </div>

              <Button
                onClick={() => downloadCertificate(certificate)}
                variant="success"
                className="w-full"
              >
                <Download className="h-4 w-4" />
                <span>Download Certificate</span>
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Retirement History */}
        {retiredCredits.length > 0 && (
          <Card>
            <CardHeader title="Retirement History" />
            <CardBody>
              <div className="space-y-4">
                {retiredCredits.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{cert.quantity} credits retired</p>
                        <p className="text-sm text-gray-600">{cert.retiredDate} • {cert.certificateNumber}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadCertificate(cert)}
                      variant="secondary"
                      className="h-8 px-3 text-xs"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

      </div>
    </div>
  );
}