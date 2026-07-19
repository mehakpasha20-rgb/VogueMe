import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

// Dynamic background removal using boundary-connected flood-fill
const makeBackgroundTransparent = (img) => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0);
  
  const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imgData.data;
  const width = tempCanvas.width;
  const height = tempCanvas.height;
  
  // Sample background color from the 4 corners
  const cornerIndices = [
    0, // top-left
    (width - 1) * 4, // top-right
    (height - 1) * width * 4, // bottom-left
    ((height - 1) * width + (width - 1)) * 4 // bottom-right
  ];
  
  let bgR = 0, bgG = 0, bgB = 0;
  cornerIndices.forEach(idx => {
    bgR += data[idx];
    bgG += data[idx + 1];
    bgB += data[idx + 2];
  });
  bgR = Math.round(bgR / 4);
  bgG = Math.round(bgG / 4);
  bgB = Math.round(bgB / 4);
  
  // If the sampled color is not bright (not white/light gray), default to white
  const isBgLight = (bgR + bgG + bgB) / 3 > 180;
  const targetR = isBgLight ? bgR : 255;
  const targetG = isBgLight ? bgG : 255;
  const targetB = isBgLight ? bgB : 255;
  
  const threshold = 35; // color distance threshold
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  const enqueue = (x, y) => {
    const idx = y * width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  };
  
  // Add all boundary pixels as starting points
  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }
  
  let qIdx = 0;
  while (qIdx < queue.length) {
    const x = queue[qIdx++];
    const y = queue[qIdx++];
    
    const pixelIdx = (y * width + x) * 4;
    const r = data[pixelIdx];
    const g = data[pixelIdx + 1];
    const b = data[pixelIdx + 2];
    
    const dist = Math.sqrt(
      Math.pow(r - targetR, 2) +
      Math.pow(g - targetG, 2) +
      Math.pow(b - targetB, 2)
    );
    
    const isVeryBrightWhite = (r > 242 && g > 242 && b > 242);
    
    if (dist < threshold || isVeryBrightWhite) {
      data[pixelIdx + 3] = 0; // Transparent
      
      // Enqueue 4 neighbors
      if (x > 0) enqueue(x - 1, y);
      if (x < width - 1) enqueue(x + 1, y);
      if (y > 0) enqueue(x, y - 1);
      if (y < height - 1) enqueue(x, y + 1);
    }
  }
  
  tempCtx.putImageData(imgData, 0, 0);
  return tempCanvas;
};

const VirtualTryOn = () => {
  // Tabs: 'camera' or 'upload'
  const [tryOnMode, setTryOnMode] = useState('camera');

  // Common State
  const [selectedJewellery, setSelectedJewellery] = useState(null);
  const [jewelleryList, setJewelleryList] = useState([]);
  const [jewellerySize, setJewellerySize] = useState(100);
  const [loadedJewelleryImg, setLoadedJewelleryImg] = useState(null);

  // Upload Mode State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [jewelleryPosition, setJewelleryPosition] = useState({ x: 50, y: 30 });

  // Camera Mode State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [jewelleryOffset, setJewelleryOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const imageCache = useRef({});

  // Refs to avoid React stale closures in requestAnimationFrame loops
  const selectedJewelleryRef = useRef(selectedJewellery);
  const jewellerySizeRef = useRef(jewellerySize);
  const jewelleryOffsetRef = useRef(jewelleryOffset);
  const loadedJewelleryImgRef = useRef(null);
  const latestLandmarksRef = useRef(null);

  // Keep refs updated on state change
  useEffect(() => {
    selectedJewelleryRef.current = selectedJewellery;
  }, [selectedJewellery]);

  useEffect(() => {
    jewellerySizeRef.current = jewellerySize;
  }, [jewellerySize]);

  useEffect(() => {
    jewelleryOffsetRef.current = jewelleryOffset;
  }, [jewelleryOffset]);

  useEffect(() => {
    loadedJewelleryImgRef.current = loadedJewelleryImg;
  }, [loadedJewelleryImg]);

  // Load and process jewellery image whenever selected item changes
  useEffect(() => {
    if (!selectedJewellery) {
      setLoadedJewelleryImg(null);
      return;
    }

    const src = selectedJewellery.image;
    if (imageCache.current[src]) {
      setLoadedJewelleryImg(imageCache.current[src]);
      return;
    }

    setLoadedJewelleryImg(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      try {
        const transparentCanvas = makeBackgroundTransparent(img);
        imageCache.current[src] = transparentCanvas;
        setLoadedJewelleryImg(transparentCanvas);
      } catch (e) {
        console.error('Failed to make background transparent, falling back:', e);
        imageCache.current[src] = img;
        setLoadedJewelleryImg(img);
      }
    };
    img.onerror = (err) => {
      console.error('Error loading jewellery image:', err);
      imageCache.current[src] = img;
      setLoadedJewelleryImg(img);
    };
  }, [selectedJewellery]);

  // Clear landmarks when camera stops or selected item changes
  useEffect(() => {
    latestLandmarksRef.current = null;
  }, [isCameraActive, selectedJewellery]);

  useEffect(() => {
    fetchJewellery();
    return () => {
      stopCamera();
    };
  }, []);

  const fetchJewellery = async () => {
    try {
      const response = await api.get('/jewellery');
      setJewelleryList(response.data);
    } catch (error) {
      console.error('Error fetching jewellery:', error);
    }
  };

  // Webcam Controls
  const startCamera = async () => {
    setIsLoadingCamera(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      initializeMediaPipe();
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setCameraError('Could not access camera. Please check permissions.');
    } finally {
      setIsLoadingCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    latestLandmarksRef.current = null;
  };

  // MediaPipe FaceMesh Initialization
  const initializeMediaPipe = () => {
    if (faceMeshRef.current) return;

    if (!window.FaceMesh) {
      console.error('MediaPipe FaceMesh not loaded from index.html scripts');
      return;
    }

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(handleFaceMeshResults);
    faceMeshRef.current = faceMesh;
  };

  // Process frames and render camera to canvas continuously using requestAnimationFrame
  useEffect(() => {
    let active = true;
    let animationId;
    let isProcessing = false;

    const renderLoop = async () => {
      if (!active || !isCameraActive || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d');

        // Match canvas dimensions to video aspect
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw mirrored camera frame
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Draw overlay if landmarks exist
        const landmarks = latestLandmarksRef.current;
        const currentJewellery = selectedJewelleryRef.current;
        const loadedImg = loadedJewelleryImgRef.current;
        if (landmarks && currentJewellery && loadedImg) {
          drawJewellery(ctx, canvas, landmarks, currentJewellery, loadedImg);
        } else if (currentJewellery) {
          // If jewelry is selected but face not detected yet, display feedback
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(0, 0, canvas.width, 35);
          ctx.fillStyle = '#fff';
          ctx.font = '13px Inter, sans-serif';
          ctx.textAlign = 'center';
          const msg = !loadedImg ? 'Loading jewellery details...' : 'Searching for face to place jewellery...';
          ctx.fillText(msg, canvas.width / 2, 22);
        }

        // Send frame to FaceMesh for tracking in the background
        if (faceMeshRef.current && !isProcessing) {
          isProcessing = true;
          faceMeshRef.current.send({ image: video })
            .catch(e => console.error('FaceMesh tracking error:', e))
            .finally(() => {
              isProcessing = false;
            });
        }
      }

      if (active && isCameraActive) {
        animationId = requestAnimationFrame(renderLoop);
      }
    };

    if (isCameraActive) {
      renderLoop();
    }

    return () => {
      active = false;
      cancelAnimationFrame(animationId);
    };
  }, [isCameraActive]);

  // Handle results from MediaPipe FaceMesh
  const handleFaceMeshResults = (results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      latestLandmarksRef.current = results.multiFaceLandmarks[0];
    } else {
      latestLandmarksRef.current = null;
    }
  };

  // Draw jewellery using face landmarks
  const drawJewellery = (ctx, canvas, landmarks, currentJewellery, jewelleryImg) => {
    const category = (currentJewellery.category || '').toLowerCase();
    const sizeMultiplier = jewellerySizeRef.current / 100;
    const offsetX = jewelleryOffsetRef.current.x;
    const offsetY = jewelleryOffsetRef.current.y;

    // Calculate face width, height, and head roll tilt angle using cheek borders (234 and 454)
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const faceWidth = Math.abs(leftCheek.x - rightCheek.x) * canvas.width;
    const chin = landmarks[152];
    const forehead = landmarks[10];
    const faceHeight = (chin.y - forehead.y) * canvas.height;

    // Calculate roll angle of head (in radians)
    // Left cheekbone is on screen left (index 234), right cheekbone on screen right (index 454)
    const dx = (1 - rightCheek.x) * canvas.width - (1 - leftCheek.x) * canvas.width;
    const dy = rightCheek.y * canvas.height - leftCheek.y * canvas.height;
    const rollAngle = Math.atan2(dy, dx);

    if (category === 'necklace') {
      // Position: Centered horizontally at chin, offset vertically below chin along the rotated axis
      const chinX = (1 - chin.x) * canvas.width;
      const chinY = chin.y * canvas.height;

      ctx.save();
      // Translate to chin + manual offset
      ctx.translate(chinX + offsetX, chinY + offsetY);
      ctx.rotate(rollAngle);

      const width = faceWidth * 1.35 * sizeMultiplier;
      const height = width * (jewelleryImg.height / jewelleryImg.width);

      // Draw necklace centered horizontally, shifted down vertically relative to chin along the rotated axis
      // Typically, neck center is around faceHeight * 0.38 below the chin
      ctx.drawImage(jewelleryImg, -width / 2, faceHeight * 0.38 - height / 2, width, height);
      ctx.restore();

    } else if (category === 'earrings' || category === 'earring') {
      // Check if image represents a pair side-by-side (landscape ratio)
      const isPair = jewelleryImg.width > jewelleryImg.height * 1.1;
      const srcWidth = isPair ? jewelleryImg.width / 2 : jewelleryImg.width;

      const width = faceWidth * 0.22 * sizeMultiplier; // Single earring width
      const height = width * (jewelleryImg.height / srcWidth);

      // Left Earlobe (wearer's left / screen left) using zygomatic landmark 127
      const leftEarAnchor = landmarks[127];
      const lx = (1 - leftEarAnchor.x) * canvas.width - (faceWidth * 0.12) + offsetX;
      const ly = leftEarAnchor.y * canvas.height + (faceHeight * 0.12) + offsetY;

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rollAngle);
      ctx.drawImage(
        jewelleryImg,
        0, 0, srcWidth, jewelleryImg.height, // source
        -width / 2, 0, width, height // destination (hangs below earlobe anchor)
      );
      ctx.restore();

      // Right Earlobe (wearer's right / screen right) using zygomatic landmark 356
      const rightEarAnchor = landmarks[356];
      const rx = (1 - rightEarAnchor.x) * canvas.width + (faceWidth * 0.12) - offsetX; // mirrored offset
      const ry = rightEarAnchor.y * canvas.height + (faceHeight * 0.12) + offsetY;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(rollAngle);
      ctx.drawImage(
        jewelleryImg,
        isPair ? srcWidth : 0, 0, srcWidth, jewelleryImg.height, // source
        -width / 2, 0, width, height // destination (hangs below earlobe anchor)
      );
      ctx.restore();
    } else {
      // Default: Center of face (Nose tip - landmark 4)
      const nose = landmarks[4];
      const x = (1 - nose.x) * canvas.width + offsetX;
      const y = nose.y * canvas.height + offsetY;
      const width = 120 * sizeMultiplier;
      const height = width * (jewelleryImg.height / jewelleryImg.width);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rollAngle);
      ctx.drawImage(jewelleryImg, -width / 2, -height / 2, width, height);
      ctx.restore();
    }
  };

  // Upload Mode: File Input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    if (tryOnMode !== 'upload' || !uploadedImage || !selectedJewellery) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setJewelleryPosition({ x, y });
  };

  // Trigger draw for Upload Mode
  useEffect(() => {
    if (tryOnMode === 'upload' && uploadedImage && selectedJewellery && loadedJewelleryImg && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = 600;
        canvas.height = 800;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const size = (jewellerySize / 100) * 180;
        const x = (jewelleryPosition.x / 100) * canvas.width - size / 2;
        const y = (jewelleryPosition.y / 100) * canvas.height - size / 2;
        ctx.drawImage(loadedJewelleryImg, x, y, size, size);
      };
      img.src = uploadedImage;
    }
  }, [tryOnMode, uploadedImage, selectedJewellery, loadedJewelleryImg, jewelleryPosition, jewellerySize]);

  // Handle Tab Switch
  const handleTabSwitch = (mode) => {
    setTryOnMode(mode);
    setSelectedJewellery(null);
    setJewellerySize(100);
    setJewelleryOffset({ x: 0, y: 0 });
    setJewelleryPosition({ x: 50, y: 30 });
    if (mode === 'upload') {
      stopCamera();
    }
  };

  // Download Snapshot
  const downloadPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `vogueme-tryon-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-8 py-12 animate-fadeIn flex-1">
      <div className="mb-4 flex items-center gap-3">
        <i className="ti ti-sparkles text-[#FF2E63] text-2xl animate-pulse"></i>
        <h1 className="text-[36px] font-extrabold text-[#4A0E17] tracking-tight">Virtual Jewellery Try-On</h1>
      </div>
      <p className="text-[#7D3E4D] mb-8 font-semibold">Try on premium jewellery products instantly using your camera or an uploaded image.</p>

      {/* Tabs */}
      <div className="flex border-b border-[#FFC2D1] mb-8 space-x-6">
        <button
          onClick={() => handleTabSwitch('camera')}
          className={`pb-4 text-[16px] font-bold transition-all duration-300 ${
            tryOnMode === 'camera'
              ? 'text-[#FF2E63] border-b-2 border-[#FF2E63]'
              : 'text-[#7D3E4D] hover:text-[#FF2E63]'
          }`}
        >
          📷 Live Camera Try-On
        </button>
        <button
          onClick={() => handleTabSwitch('upload')}
          className={`pb-4 text-[16px] font-bold transition-all duration-300 ${
            tryOnMode === 'upload'
              ? 'text-[#FF2E63] border-b-2 border-[#FF2E63]'
              : 'text-[#7D3E4D] hover:text-[#FF2E63]'
          }`}
        >
          🖼️ Upload Photo Try-On
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Controls */}
        <div className="space-y-6">
          {/* Mode Specific Controls */}
          {tryOnMode === 'camera' ? (
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)]">
              <h2 className="text-[16px] font-extrabold text-[#4A0E17] mb-4">1. Camera Controller</h2>
              {!isCameraActive ? (
                <button
                  onClick={startCamera}
                  disabled={isLoadingCamera}
                  className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold py-[14px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,46,99,0.3)] transition-all duration-300 disabled:opacity-50"
                >
                  {isLoadingCamera ? 'Starting camera...' : 'Start Camera Feed'}
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="w-full bg-[#4A0E17] hover:bg-[#601A2E] text-white text-[14px] font-bold py-[14px] rounded-xl shadow-md transition-all duration-300"
                >
                  Stop Camera Feed
                </button>
              )}
              {cameraError && (
                <p className="mt-3 text-sm text-red-500 font-bold">{cameraError}</p>
              )}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)]">
              <h2 className="text-[16px] font-extrabold text-[#4A0E17] mb-4">1. Upload Profile Photo</h2>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white text-[14px] font-bold py-[14px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,46,99,0.3)] transition-all duration-300"
              >
                Choose Image
              </button>
            </div>
          )}

          {/* Jewellery Selection List */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)]">
            <h2 className="text-[16px] font-extrabold text-[#4A0E17] mb-4">2. Select Jewellery Item</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {jewelleryList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedJewellery(item)}
                  className={`cursor-pointer flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                    selectedJewellery?._id === item._id
                      ? 'bg-[#FFE5EC] border-[#FF2E63] shadow-sm'
                      : 'bg-white border-transparent hover:bg-[#FFE5EC]/50 hover:border-[#FFC2D1]'
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#4A0E17] text-[14px] truncate">{item.name}</p>
                    <p className="text-xs text-[#7D3E4D] mt-0.5">{item.category}</p>
                    <p className="text-[14px] font-black text-[#FF2E63] mt-1">Rs. {item.price}</p>
                  </div>
                </div>
              ))}
              {jewelleryList.length === 0 && (
                <p className="text-[#7D3E4D] text-sm text-center py-4">No jewellery items loaded. Check database connection.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Canvas Output & Adjustment Sliders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#FFC2D1] shadow-[0_10px_30px_rgba(255,46,99,0.04)]">
            <h2 className="text-[16px] font-extrabold text-[#4A0E17] mb-4">3. Preview Frame</h2>

            {/* Canvas Area */}
            <div className="flex justify-center bg-[#FFE5EC]/30 rounded-2xl border border-[#FFC2D1] overflow-hidden relative min-h-[380px] items-center">
              {/* Hidden Video element for streaming camera */}
              <video
                ref={videoRef}
                style={{ display: 'none' }}
                playsInline
                muted
              />

              {tryOnMode === 'camera' && !isCameraActive && (
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">📸</div>
                  <p className="text-[#7D3E4D] font-bold mb-4">Start your camera and select an item to experience live try-on!</p>
                  <button
                    onClick={startCamera}
                    disabled={isLoadingCamera}
                    className="px-6 py-3 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-xl text-[14px] hover:shadow-[0_8px_20px_rgba(255,46,99,0.25)] transition-all"
                  >
                    Start Live Video
                  </button>
                </div>
              )}

              {tryOnMode === 'upload' && !uploadedImage && (
                <div className="text-center p-8">
                  <div className="text-5xl mb-4">🖼️</div>
                  <p className="text-[#7D3E4D] font-bold mb-4">Upload a clear front-facing portrait photo to start overlaying jewellery.</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-xl text-[14px] hover:shadow-[0_8px_20px_rgba(255,46,99,0.25)] transition-all"
                  >
                    Upload Portrait
                  </button>
                </div>
              )}

              {/* Active Canvas */}
              {((tryOnMode === 'camera' && isCameraActive) || (tryOnMode === 'upload' && uploadedImage)) && (
                <canvas
                  ref={canvasRef}
                  className="w-full max-w-[640px] aspect-[4/3] object-contain cursor-crosshair shadow-inner"
                />
              )}
            </div>

            {tryOnMode === 'upload' && uploadedImage && (
              <p className="text-xs text-[#7D3E4D] text-center mt-3 font-bold">
                Click anywhere on your face/neck image to reposition the selected jewellery.
              </p>
            )}

            {/* Adjustments Panel */}
            {selectedJewellery && ((tryOnMode === 'camera' && isCameraActive) || (tryOnMode === 'upload' && uploadedImage)) && (
              <div className="mt-6 border-t border-[#FFC2D1] pt-6 space-y-5">
                <h3 className="font-extrabold text-[#4A0E17] text-[15px]">Fine-Tune Overlay Adjustments</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Size Control */}
                  <div>
                    <div className="flex justify-between text-[13px] font-bold text-[#4A0E17] mb-1.5">
                      <span>Scaling Size</span>
                      <span className="text-[#FF2E63]">{jewellerySize}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="220"
                      value={jewellerySize}
                      onChange={(e) => setJewellerySize(parseInt(e.target.value))}
                      className="w-full accent-[#FF2E63] bg-[#FFE5EC] rounded-lg appearance-none h-2 cursor-pointer"
                    />
                  </div>

                  {/* Offset X/Y Control */}
                  {tryOnMode === 'camera' && (
                    <>
                      <div>
                        <div className="flex justify-between text-[13px] font-bold text-[#4A0E17] mb-1.5">
                          <span>Horizontal Offset (X)</span>
                          <span className="text-[#FF2E63]">{jewelleryOffset.x}px</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={jewelleryOffset.x}
                          onChange={(e) => setJewelleryOffset({ ...jewelleryOffset, x: parseInt(e.target.value) })}
                          className="w-full accent-[#FF2E63] bg-[#FFE5EC] rounded-lg appearance-none h-2 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[13px] font-bold text-[#4A0E17] mb-1.5">
                          <span>Vertical Offset (Y)</span>
                          <span className="text-[#FF2E63]">{jewelleryOffset.y}px</span>
                        </div>
                        <input
                          type="range"
                          min="-120"
                          max="120"
                          value={jewelleryOffset.y}
                          onChange={(e) => setJewelleryOffset({ ...jewelleryOffset, y: parseInt(e.target.value) })}
                          className="w-full accent-[#FF2E63] bg-[#FFE5EC] rounded-lg appearance-none h-2 cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={downloadPreview}
                    className="w-full bg-gradient-to-r from-[#4A0E17] to-[#7D3E4D] text-white text-[14px] font-bold py-[14px] rounded-xl hover:shadow-[0_8px_25px_rgba(74,14,23,0.3)] transition-all duration-300"
                  >
                    📥 Save & Download Snapshot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
