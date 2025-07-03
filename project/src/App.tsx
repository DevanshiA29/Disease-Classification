import React, { useState, useRef, useCallback } from 'react';
import { Upload, Eye, Sparkles, CheckCircle, AlertCircle, Download, Zap, Brain, Image as ImageIcon } from 'lucide-react';

interface AnalysisResult {
  category: string;
  confidence: number;
  insights: string[];
  tags: string[];
  description: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const analyzeImage = useCallback(() => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        category: 'Document Analysis',
        confidence: 94.7,
        insights: [
          'This appears to be a technical document with structured content',
          'High text density suggests informational or instructional material',
          'Professional formatting indicates business or educational context',
          'Multiple sections detected with hierarchical organization'
        ],
        tags: ['Document', 'Technical', 'Professional', 'Text-heavy', 'Structured'],
        description: 'A well-formatted technical document containing structured information with clear visual hierarchy and professional presentation.'
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  }, [selectedImage]);

  const resetAnalysis = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Visionary.AI</h1>
              <p className="text-sm text-purple-200">Intelligent Visual Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-purple-200">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini API</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-4">
                Unlock Visual Intelligence
              </h2>
              <p className="text-lg text-purple-200 mb-8">
                Upload any image and discover deep, contextual insights powered by advanced multimodal AI.
              </p>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 backdrop-blur-sm ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                  : 'border-purple-400/50 bg-white/5 hover:bg-white/10 hover:border-purple-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="image-upload"
              />
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold mb-2">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-purple-200 text-sm">
                    Support for JPG, PNG, GIF, WebP up to 10MB
                  </p>
                </div>
                <label
                  htmlFor="image-upload"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold cursor-pointer hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Select Image
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Preview
                    </h3>
                    <button
                      onClick={resetAnalysis}
                      className="text-purple-200 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border border-white/20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-purple-200">
                      {selectedImage?.name} • {(selectedImage?.size || 0 / 1024 / 1024).toFixed(1)}MB
                    </p>
                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4" />
                          <span>Analyze</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {isAnalyzing && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <h3 className="text-white font-semibold">AI Analysis in Progress</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      'Initializing multimodal analysis...',
                      'Processing visual elements...',
                      'Extracting contextual insights...',
                      'Generating comprehensive report...'
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 animate-in fade-in slide-in-from-left-4"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-purple-200 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-white font-semibold">Analysis Complete</h3>
                    </div>
                    <button className="text-purple-200 hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Category & Confidence */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-200 text-sm">Category</span>
                      <span className="text-white font-semibold">{analysisResult.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">Confidence</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-white/10 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                            style={{ width: `${analysisResult.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-cyan-400 font-semibold text-sm">
                          {analysisResult.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Description</h4>
                    <p className="text-purple-200 text-sm leading-relaxed">
                      {analysisResult.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 text-white text-xs rounded-full border border-purple-400/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Insights</h4>
                    <div className="space-y-2">
                      {analysisResult.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-purple-200 text-sm leading-relaxed">
                            {insight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedImage && !isAnalyzing && !analysisResult && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-300" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-purple-200">
                  Upload an image to begin your visual intelligence journey
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;