import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

/**
 * Dynamic background removal using boundary-connected flood-fill.
 * 
 * Scans the 4 corners of an image to detect the background color,
 * then uses a queue-based flood-fill algorithm starting from all boundary pixels.
 * If pixels match the background color within a threshold or are close to pure white,
 * their alpha channel is set to 0 (fully transparent).
 * 
 * @param {HTMLImageElement} img - The raw source image to process.
 * @returns {HTMLCanvasElement} A canvas holding the transparency-processed image.
 */
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
  
  // Sample background color from the 4 corners of the image
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
  
  // Helper to enqueue a pixel coordinates for inspection
  const enqueue = (x, y) => {
    const idx = y * width + x;
    if (!visited[idx]) {
      visited[idx] = 1;
      queue.push(x, y);
    }
  };
  
  // Initialize queue with all boundary pixels along the edges of the image
  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }
  
  // Flood-fill process loop
  let qIdx = 0;
  while (qIdx < queue.length) {
    const x = queue[qIdx++];
    const y = queue[qIdx++];
    
    const pixelIdx = (y * width + x) * 4;
    const r = data[pixelIdx];
    const g = data[pixelIdx + 1];
    const b = data[pixelIdx + 2];
    
    // Calculate Euclidean color distance from target background color
    const dist = Math.sqrt(
      Math.pow(r - targetR, 2) +
      Math.pow(g - targetG, 2) +
      Math.pow(b - targetB, 2)
    );
    
    const isVeryBrightWhite = (r > 242 && g > 242 && b > 242);
    
    // If pixel matches background color within threshold, make it transparent
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
  // Try-on modes: 'camera' (AR webcam overlay) or 'upload' (draggable photo canvas)
  const [tryOnMode, setTryOnMode] = useState('camera');

  // ==========================================
  // Core / Shared State variables
  // ==========================================
  const [selectedJewellery, setSelectedJewellery] = useState(null);
  const [jewelleryList, setJewelleryList] = useState([]);
  const [jewellerySize, setJewellerySize] = useState(100);
  const [loadedJewelleryImg, setLoadedJewelleryImg] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeFaceFilter, setActiveFaceFilter] = useState('none');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // ==========================================
  // Upload Mode State variables
  // ==========================================
  const [uploadedImage, setUploadedImage] = useState(null);
  const [jewelleryPosition, setJewelleryPosition] = useState({ x: 50, y: 30 }); // center location percentage

  // ==========================================
  // Live Camera Mode State variables
  // ==========================================
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [jewelleryOffset, setJewelleryOffset] = useState({ x: 0, y: 0 }); // offset from face landmark points

  // Refs for tracking DOM elements and Web APIs
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const imageCache = useRef({});
  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });

  // Refs to avoid React stale closures in the high-frequency animation frames loop
  const selectedJewelleryRef = useRef(selectedJewellery);
  const jewellerySizeRef = useRef(jewellerySize);
  const jewelleryOffsetRef = useRef(jewelleryOffset);
  const loadedJewelleryImgRef = useRef(null);
  const latestLandmarksRef = useRef(null);
  const smoothedLandmarksRef = useRef(null);
  const activeFaceFilterRef = useRef(activeFaceFilter);

  // Sync state values to references for the animation frame render loop
  useEffect(() => {
    activeFaceFilterRef.current = activeFaceFilter;
  }, [activeFaceFilter]);

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

  /**
   * Run whenever selected jewellery item changes.
   * Resolves optimal size / placement presets and processes the image background.
   */
  useEffect(() => {
    if (!selectedJewellery) {
      setLoadedJewelleryImg(null);
      return;
    }

    const name = (selectedJewellery.name || '').toLowerCase();
    const category = (selectedJewellery.category || '').toLowerCase();
    let defaultSize = 100;
    let defaultOffset = { x: 0, y: 0 };

    // Auto-calculate positions/sizes based on specific product names/types
    if (category === 'necklace') {
      if (name.includes('choker')) {
        defaultSize = 85;
        defaultOffset = { x: 0, y: -25 };
      } else if (name.includes('bridal') || name.includes('set') || name.includes('diamond')) {
        defaultSize = 115;
        defaultOffset = { x: 0, y: 15 };
      } else if (name.includes('pearl')) {
        defaultSize = 95;
        defaultOffset = { x: 0, y: 8 };
      }
    } else if (category === 'earrings' || category === 'earring') {
      if (name.includes('studs') || name.includes('stud')) {
        defaultSize = 65;
        defaultOffset = { x: 5, y: -3 };
      } else if (name.includes('dangle')) {
        defaultSize = 105;
        defaultOffset = { x: -2, y: 12 };
      } else if (name.includes('hoop')) {
        defaultSize = 90;
        defaultOffset = { x: 0, y: 6 };
      }
    }

    setJewellerySize(defaultSize);
    setJewelleryOffset(defaultOffset);

    const src = selectedJewellery.image;
    // Check local image cache
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
        // Strip solid backgrounds automatically using flood-fill
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

  // Clear tracked coordinates when mode or selection changes
  useEffect(() => {
    latestLandmarksRef.current = null;
    smoothedLandmarksRef.current = null;
  }, [isCameraActive, selectedJewellery]);

  // Fetch jewellery data on component mounting and clean up webcam
  useEffect(() => {
    fetchJewellery();
    return () => {
      stopCamera();
    };
  }, []);

  /**
   * Fetches the jewellery list from the backend database APIs
   */
  const fetchJewellery = async () => {
    try {
      const response = await api.get('/jewellery');
      setJewelleryList(response.data);
      if (response.data && response.data.length > 0) {
        setSelectedJewellery(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching jewellery:', error);
    }
  };

  /**
   * Requests camera device access and starts webcam video stream
   */
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

  /**
   * Stops the active webcam media tracks
   */
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    latestLandmarksRef.current = null;
    smoothedLandmarksRef.current = null;
  };

  /**
   * Initializes MediaPipe FaceMesh client helper libraries from global window context
   */
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

  /**
   * High-frequency animation rendering loop for live webcam canvas updates.
   * Draws raw frames from video, applies color grading filters, and triggers AR jewellery overlays.
   */
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

        // Match canvas dimensions to webcam feed resolution
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mirror the camera frame horizontally to feel natural
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        // Apply AR color filter sets
        if (activeFaceFilterRef.current === 'golden') {
          ctx.filter = 'sepia(0.15) brightness(1.06) contrast(1.02) saturate(1.1)';
        } else if (activeFaceFilterRef.current === 'retro') {
          ctx.filter = 'contrast(0.95) saturate(0.85) sepia(0.25) brightness(1.05)';
        } else if (activeFaceFilterRef.current === 'studio') {
          ctx.filter = 'contrast(1.06) saturate(0.92) hue-rotate(-6deg)';
        }
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Apply skin-smoothing blur overlay
        if (activeFaceFilterRef.current === 'smooth') {
          ctx.globalAlpha = 0.35;
          ctx.filter = 'blur(4.5px) brightness(1.02) contrast(0.98)';
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        
        ctx.restore();

        // Overlay jewellery on the canvas if facial landmarks are active
        const landmarks = smoothedLandmarksRef.current || latestLandmarksRef.current;
        const currentJewellery = selectedJewelleryRef.current;
        const loadedImg = loadedJewelleryImgRef.current;
        if (landmarks && currentJewellery && loadedImg) {
          drawJewellery(ctx, canvas, landmarks, currentJewellery, loadedImg);
        } else if (currentJewellery) {
          // Render status instructions text overlay if face tracking is looking
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(0, 0, canvas.width, 35);
          ctx.fillStyle = '#fff';
          ctx.font = '13px Inter, sans-serif';
          ctx.textAlign = 'center';
          const msg = !loadedImg ? 'Loading jewellery details...' : 'Searching for face to place jewellery...';
          ctx.fillText(msg, canvas.width / 2, 22);
        }

        // Send current camera frame to MediaPipe FaceMesh model asynchronously
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

  /**
   * Receives landmarks from FaceMesh and applies Exponential Moving Average (EMA)
   * smoothing to mitigate coordinate jitter.
   */
  const handleFaceMeshResults = (results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const latest = results.multiFaceLandmarks[0];
      latestLandmarksRef.current = latest;
      
      if (!smoothedLandmarksRef.current) {
        smoothedLandmarksRef.current = latest.map(pt => ({ ...pt }));
      } else {
        const smoothed = smoothedLandmarksRef.current;
        const alpha = 0.35; // Jitter smoothing factor (smaller = smoother, larger = faster)
        for (let i = 0; i < latest.length; i++) {
          smoothed[i].x = smoothed[i].x * (1 - alpha) + latest[i].x * alpha;
          smoothed[i].y = smoothed[i].y * (1 - alpha) + latest[i].y * alpha;
          smoothed[i].z = smoothed[i].z * (1 - alpha) + latest[i].z * alpha;
        }
      }
    } else {
      latestLandmarksRef.current = null;
      smoothedLandmarksRef.current = null;
    }
  };

  /**
   * Draws jewellery on the canvas based on dynamic face positioning, roll angle,
   * yaw, and pitch ratios computed from face mesh vertices.
   */
  const drawJewellery = (ctx, canvas, landmarks, currentJewellery, jewelleryImg) => {
    const category = (currentJewellery.category || '').toLowerCase();
    const sizeMultiplier = jewellerySizeRef.current / 100;
    const offsetX = jewelleryOffsetRef.current.x;
    const offsetY = jewelleryOffsetRef.current.y;

    // Retrieve references landmarks to find cheek boundaries and compute scaling metrics
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const faceWidth = Math.abs(leftCheek.x - rightCheek.x) * canvas.width;
    const chin = landmarks[152];
    const forehead = landmarks[10];
    const faceHeight = (chin.y - forehead.y) * canvas.height;

    // Calculate Roll: Head tilt rotation in radians using cheek border vectors
    const dx = (1 - rightCheek.x) * canvas.width - (1 - leftCheek.x) * canvas.width;
    const dy = rightCheek.y * canvas.height - leftCheek.y * canvas.height;
    const rollAngle = Math.atan2(dy, dx);

    // Calculate Yaw: Rotation looking left/right (relative distance from nose tip to left/right cheeks)
    const nose = landmarks[4];
    const leftDist = Math.abs(nose.x - leftCheek.x);
    const rightDist = Math.abs(nose.x - rightCheek.x);
    const totalDist = leftDist + rightDist;
    const yawRatio = totalDist > 0 ? (rightDist - leftDist) / totalDist : 0;

    // Calculate Pitch: Rotation looking up/down
    const foreheadToNose = Math.abs(forehead.y - nose.y);
    const noseToChin = Math.abs(nose.y - chin.y);
    const totalY = foreheadToNose + noseToChin;
    const pitchRatio = totalY > 0 ? (foreheadToNose - noseToChin) / totalY : 0;

    if (category === 'necklace') {
      // Offset horizontal coordinates slightly based on head yaw rotation to center necklace properly
      const chinX = (1 - chin.x) * canvas.width - (faceWidth * yawRatio * 0.15);
      const chinY = chin.y * canvas.height;

      ctx.save();
      // Translate origin to chin and apply manual offset adjustments
      ctx.translate(chinX + offsetX, chinY + offsetY);
      ctx.rotate(rollAngle);

      const width = faceWidth * 1.35 * sizeMultiplier;
      const height = width * (jewelleryImg.height / jewelleryImg.width);

      // Pitch-adjusted vertical shift below chin to avoid overlapping chin when looking down
      const necklaceY = faceHeight * (0.22 + pitchRatio * 0.12);

      ctx.drawImage(jewelleryImg, -width / 2, necklaceY, width, height);
      ctx.restore();

    } else if (category === 'earrings' || category === 'earring') {
      // Split the image if it contains a pair of earrings side-by-side
      const isPair = jewelleryImg.width >= jewelleryImg.height * 0.65;
      const srcWidth = isPair ? jewelleryImg.width / 2 : jewelleryImg.width;

      const width = faceWidth * 0.22 * sizeMultiplier; // width of a single earring
      const height = width * (jewelleryImg.height / srcWidth);

      // Extract left/right ear lobes coordinates from mesh landmarks
      const rightEarX = (1 - landmarks[127].x) * canvas.width;
      const rightEarY = ((landmarks[127].y + landmarks[132].y) / 2) * canvas.height;

      const leftEarX = (1 - landmarks[356].x) * canvas.width;
      const leftEarY = ((landmarks[356].y + landmarks[361].y) / 2) * canvas.height;

      // Compensate shifts based on yaw/pitch rotation angles
      const rightOutwardShift = faceWidth * (0.06 - yawRatio * 0.03);
      const leftOutwardShift = faceWidth * (0.06 + yawRatio * 0.03);
      const verticalShift = faceHeight * (0.02 - pitchRatio * 0.03);

      // 1. Wearer's right earlobe rendering (screen right side)
      const lx = rightEarX + rightOutwardShift + offsetX;
      const ly = rightEarY + verticalShift + offsetY;

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rollAngle);
      // Reduce opacity if the ear is occluded (head turned away)
      const rightOpacity = Math.max(0.15, Math.min(1.0, 1.0 - yawRatio * 0.6));
      ctx.globalAlpha = rightOpacity;
      ctx.drawImage(
        jewelleryImg,
        0, 0, srcWidth, jewelleryImg.height, // source
        -width / 2, 0, width, height // destination
      );
      ctx.restore();

      // 2. Wearer's left earlobe rendering (screen left side)
      const rx = leftEarX - leftOutwardShift - offsetX;
      const ry = leftEarY + verticalShift + offsetY;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(rollAngle);
      // Reduce opacity if the ear is occluded (head turned away)
      const leftOpacity = Math.max(0.15, Math.min(1.0, 1.0 + yawRatio * 0.6));
      ctx.globalAlpha = leftOpacity;
      ctx.drawImage(
        jewelleryImg,
        isPair ? srcWidth : 0, 0, srcWidth, jewelleryImg.height, // source
        -width / 2, 0, width, height // destination
      );
      ctx.restore();
    } else {
      // Default fallback: Center of face (Nose tip landmark 4)
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

  /**
   * Static Upload Mode: Reads file and stores data URI
   */
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  /**
   * Tracks when the user presses down to drag the jewellery on the canvas
   */
  const handleCanvasMouseDown = (e) => {
    if (!selectedJewellery) return;
    
    if (e.cancelable) e.preventDefault();

    setIsDragging(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // In static photo upload mode, update anchor position percentage on click
    if (tryOnMode === 'upload') {
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      setJewelleryPosition({ x, y });
    }

    // Capture starting drag pointers
    dragStartRef.current = { x: clientX, y: clientY };
    offsetStartRef.current = { x: jewelleryOffset.x, y: jewelleryOffset.y };
  };

  /**
   * Tracks drag movements and calculates offset shifts
   */
  const handleCanvasMouseMove = (e) => {
    if (!isDragging || !selectedJewellery) return;
    
    if (e.cancelable) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Calculate movement difference scaled to canvas size
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    const scaleFactorX = (canvas.width / rect.width);
    const scaleFactorY = (canvas.height / rect.height);
    
    const newOffsetX = Math.max(-100, Math.min(100, offsetStartRef.current.x + Math.round(deltaX * scaleFactorX)));
    const newOffsetY = Math.max(-120, Math.min(120, offsetStartRef.current.y + Math.round(deltaY * scaleFactorY)));
    
    setJewelleryOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Redraw static canvas with background image and overlays in Static Upload Mode
   */
  useEffect(() => {
    if (tryOnMode === 'upload' && uploadedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width || 600;
        canvas.height = img.height || 800;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (selectedJewellery && loadedJewelleryImg) {
          const category = (selectedJewellery.category || '').toLowerCase();
          const clickX = (jewelleryPosition.x / 100) * canvas.width;
          const clickY = (jewelleryPosition.y / 100) * canvas.height;

          if (category === 'necklace') {
            const width = canvas.width * 0.45 * (jewellerySize / 100);
            const height = width * (loadedJewelleryImg.height / loadedJewelleryImg.width);
            const x = clickX - width / 2 + jewelleryOffset.x;
            const y = clickY + jewelleryOffset.y;
            ctx.drawImage(loadedJewelleryImg, x, y, width, height);
          } else if (category === 'earrings' || category === 'earring') {
            const isPair = loadedJewelleryImg.width >= loadedJewelleryImg.height * 0.65;
            const srcWidth = isPair ? loadedJewelleryImg.width / 2 : loadedJewelleryImg.width;
            
            const width = canvas.width * 0.08 * (jewellerySize / 100);
            const height = width * (loadedJewelleryImg.height / srcWidth);

            const separation = canvas.width * 0.16 * (jewellerySize / 100) + (jewelleryOffset.x);

            // Screen right earring
            const lx = clickX + separation;
            const ly = clickY + jewelleryOffset.y;
            ctx.save();
            ctx.drawImage(
              loadedJewelleryImg,
              0, 0, srcWidth, loadedJewelleryImg.height,
              lx - width / 2, ly, width, height
            );
            ctx.restore();

            // Screen left earring
            const rx = clickX - separation;
            const ry = clickY + jewelleryOffset.y;
            ctx.save();
            ctx.drawImage(
              loadedJewelleryImg,
              isPair ? srcWidth : 0, 0, srcWidth, loadedJewelleryImg.height,
              rx - width / 2, ry, width, height
            );
            ctx.restore();
          } else {
            const width = 120 * (jewellerySize / 100);
            const height = width * (loadedJewelleryImg.height / loadedJewelleryImg.width);
            const x = clickX - width / 2 + jewelleryOffset.x;
            const y = clickY - height / 2 + jewelleryOffset.y;
            ctx.drawImage(loadedJewelleryImg, x, y, width, height);
          }
        }
      };
      img.src = uploadedImage;
    }
  }, [tryOnMode, uploadedImage, selectedJewellery, loadedJewelleryImg, jewelleryPosition, jewellerySize, jewelleryOffset]);

  /**
   * Resets sizing, positions, offsets and shuts camera off when switching mode tabs
   */
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

  /**
   * Creates a snapshot of the current canvas render and triggers user download
   */
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

      <div className="flex flex-col items-center justify-center w-full">
        {/* Hidden inputs & video refs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          playsInline
          muted
        />

        {/* Viewfinder Container */}
        <div className="flex justify-center bg-[#FFE5EC]/30 rounded-3xl border border-[#FFC2D1] overflow-hidden relative min-h-[480px] w-full max-w-[640px] items-center shadow-2xl bg-black">
          
          {/* 1. Camera Offline Overlay */}
          {tryOnMode === 'camera' && !isCameraActive && (
            <div className="text-center p-8 z-10 text-white flex flex-col items-center">
              <div className="text-6xl mb-4 animate-bounce">📸</div>
              <h3 className="text-lg font-bold text-[#FFE5EC] mb-2">Immersive AR Camera</h3>
              <p className="text-white/70 max-w-sm mb-6 text-sm">Experience our jewellery range live on your face using professional AR filters.</p>
              <button
                onClick={startCamera}
                disabled={isLoadingCamera}
                className="px-6 py-3.5 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-full text-[14px] hover:shadow-[0_8px_20px_rgba(255,46,99,0.25)] hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {isLoadingCamera ? 'Accessing Camera...' : 'Open AR Camera'}
              </button>
              {cameraError && (
                <p className="mt-4 text-xs text-red-400 font-bold bg-black/40 px-3 py-1 rounded-full">{cameraError}</p>
              )}
            </div>
          )}

          {/* 2. Photo Upload Prompt Overlay */}
          {tryOnMode === 'upload' && !uploadedImage && (
            <div className="text-center p-8 z-10 text-white flex flex-col items-center w-full">
              <div className="text-6xl mb-4 animate-pulse">🖼️</div>
              <h3 className="text-lg font-bold text-[#FFE5EC] mb-2">Photo Studio</h3>
              <p className="text-white/70 max-w-sm mb-6 text-sm">Upload a portrait photo or select a sample model face below to start trying on jewellery.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3.5 bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] text-white font-bold rounded-full text-[14px] hover:shadow-[0_8px_20px_rgba(255,46,99,0.25)] hover:scale-105 transition-all duration-300 mb-6"
              >
                Upload Portrait Photo
              </button>

              {/* Sample Models Row */}
              <div className="w-full border-t border-white/10 pt-5 mt-2">
                <p className="text-[11px] font-bold tracking-wider uppercase text-white/50 mb-3">Or try on a sample model:</p>
                <div className="flex justify-center gap-5">
                  {[
                    {
                      id: 'model1',
                      name: 'Aria',
                      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
                    },
                    {
                      id: 'model2',
                      name: 'Liam',
                      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
                    },
                    {
                      id: 'model3',
                      name: 'Chloe',
                      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
                    }
                  ].map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setUploadedImage(model.url)}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden group-hover:border-[#FF2E63] group-hover:scale-105 transition-all duration-300 shadow-md">
                        <img src={model.url} alt={model.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-white/60 mt-1 group-hover:text-white">{model.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. Immersive Viewfinder Canvas & Overlays */}
          {((tryOnMode === 'camera' && isCameraActive) || (tryOnMode === 'upload' && uploadedImage)) && (
            <div className="relative w-full h-full flex justify-center items-center">
              
              {/* Canvas viewport with drag-and-drop repositioning */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onTouchStart={handleCanvasMouseDown}
                onTouchMove={handleCanvasMouseMove}
                onTouchEnd={handleCanvasMouseUp}
                className="w-full max-w-[640px] aspect-[4/3] object-contain cursor-move shadow-inner"
              />

              {/* Close/Stop Button & Filter Toolbar (Top-Left) */}
              <div className="absolute top-4 left-4 flex flex-col gap-3 z-30">
                <button
                  onClick={tryOnMode === 'camera' ? stopCamera : () => { setUploadedImage(null); setSelectedJewellery(null); }}
                  className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-lg transition-all duration-300"
                  title={tryOnMode === 'camera' ? "Stop Camera Feed" : "Choose Another Image"}
                >
                  <i className="ti ti-arrow-left text-lg"></i>
                </button>

                {/* Face Filter Selector */}
                {isCameraActive && (
                  <div className="flex flex-col gap-2.5 bg-black/30 backdrop-blur-sm p-1.5 rounded-full border border-white/10 shadow-lg">
                    <button
                      onClick={() => setActiveFaceFilter('none')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeFaceFilter === 'none' ? 'bg-[#FF2E63] text-white scale-110 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title="Real Face (No Filter)"
                    >
                      <i className="ti ti-camera text-sm"></i>
                    </button>
                    <button
                      onClick={() => setActiveFaceFilter('smooth')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeFaceFilter === 'smooth' ? 'bg-[#FF2E63] text-white scale-110 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title="Beautify & Smooth"
                    >
                      <i className="ti ti-sparkles text-sm"></i>
                    </button>
                    <button
                      onClick={() => setActiveFaceFilter('golden')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeFaceFilter === 'golden' ? 'bg-[#FF2E63] text-white scale-110 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title="Golden Hour Glow"
                    >
                      <i className="ti ti-sun text-sm"></i>
                    </button>
                    <button
                      onClick={() => setActiveFaceFilter('retro')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeFaceFilter === 'retro' ? 'bg-[#FF2E63] text-white scale-110 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title="Retro Vintage"
                    >
                      <i className="ti ti-photo text-sm"></i>
                    </button>
                    <button
                      onClick={() => setActiveFaceFilter('studio')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeFaceFilter === 'studio' ? 'bg-[#FF2E63] text-white scale-110 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title="Studio Cool"
                    >
                      <i className="ti ti-bulb text-sm"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Swap Photo Button (only for upload mode when an image is loaded) */}
              {tryOnMode === 'upload' && uploadedImage && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-16 left-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-30 animate-fadeIn"
                  title="Upload a Different Photo"
                >
                  <i className="ti ti-upload text-lg"></i>
                </button>
              )}

              {/* Adjustments Sidebar Toggle Button (Top-Right) */}
              {selectedJewellery && (
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-30 ${
                    isSettingsOpen ? 'bg-[#FF2E63] text-white rotate-90' : 'bg-black/40 hover:bg-black/60 text-white'
                  } shadow-lg`}
                  title="Toggle Lens Settings"
                >
                  <i className="ti ti-settings text-lg"></i>
                </button>
              )}

              {/* Click-to-reposition tooltip guidance in Upload Mode */}
              {tryOnMode === 'upload' && uploadedImage && selectedJewellery && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white/95 z-20 shadow-md animate-pulse">
                  👆 Click on the photo to position the jewellery
                </div>
              )}

              {/* Drag-to-offset tooltip guidance in Camera Mode */}
              {tryOnMode === 'camera' && isCameraActive && selectedJewellery && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white/95 z-20 shadow-md animate-pulse">
                  👆 Drag the screen to nudge and adjust jewellery position
                </div>
              )}

              {/* Adjustment Overlay Slider Panel (Glassmorphism card) */}
              {isSettingsOpen && selectedJewellery && (
                <div className="absolute top-16 right-4 w-60 bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl z-30 text-white animate-fadeIn">
                  <h4 className="font-extrabold text-[12px] uppercase tracking-wider mb-3.5 flex items-center gap-1.5 text-white/95 border-b border-white/10 pb-2">
                    <i className="ti ti-adjustments-horizontal text-[#FF2E63] text-sm"></i> Lens Settings
                  </h4>
                  <div className="space-y-4">
                    {/* Size Slider */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-white/80 mb-1.5">
                        <span>Scale Size</span>
                        <span className="text-[#FF2E63]">{jewellerySize}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="220"
                        value={jewellerySize}
                        onChange={(e) => setJewellerySize(parseInt(e.target.value))}
                        className="w-full accent-[#FF2E63] bg-white/20 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>

                    {/* Position Offsets sliders (available for both modes) */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-white/80 mb-1.5">
                        <span>
                          {tryOnMode === 'upload' && (selectedJewellery?.category || '').toLowerCase().includes('earring')
                            ? 'Earrings Spread (Width)'
                            : 'Horizontal (X)'}
                        </span>
                        <span className="text-[#FF2E63]">{jewelleryOffset.x}px</span>
                      </div>
                      <input
                        type="range"
                        min={tryOnMode === 'upload' && (selectedJewellery?.category || '').toLowerCase().includes('earring') ? '0' : '-100'}
                        max="100"
                        value={jewelleryOffset.x}
                        onChange={(e) => setJewelleryOffset({ ...jewelleryOffset, x: parseInt(e.target.value) })}
                        className="w-full accent-[#FF2E63] bg-white/20 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-white/80 mb-1.5">
                        <span>Vertical (Y)</span>
                        <span className="text-[#FF2E63]">{jewelleryOffset.y}px</span>
                      </div>
                      <input
                        type="range"
                        min="-120"
                        max="120"
                        value={jewelleryOffset.y}
                        onChange={(e) => setJewelleryOffset({ ...jewelleryOffset, y: parseInt(e.target.value) })}
                        className="w-full accent-[#FF2E63] bg-white/20 rounded-lg appearance-none h-1.5 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Selected filter name bubble */}
              {selectedJewellery && (
                <div className="absolute bottom-[136px] left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-center text-white z-20 shadow-md">
                  <p className="font-extrabold text-[12px] tracking-tight truncate max-w-[200px]">{selectedJewellery.name}</p>
                  <p className="text-[10px] font-black text-[#FF2E63] mt-0.5">Rs. {selectedJewellery.price}</p>
                </div>
              )}

              {/* Snapchat Lens Category Pills (Tab Selector) */}
              <div className="absolute bottom-[96px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 shadow-lg">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategoryFilter === 'all' ? 'bg-[#FF2E63] text-white scale-105' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('earrings')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategoryFilter === 'earrings' ? 'bg-[#FF2E63] text-white scale-105' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Earrings
                </button>
                <button
                  onClick={() => setActiveCategoryFilter('necklace')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategoryFilter === 'necklace' ? 'bg-[#FF2E63] text-white scale-105' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Necklaces
                </button>
              </div>

              {/* Shutter Camera Button (Bottom-Right) */}
              {selectedJewellery && (
                <button
                  onClick={downloadPreview}
                  className="absolute bottom-9 right-4 w-12 h-12 bg-white hover:bg-white/95 rounded-full flex items-center justify-center text-[#FF2E63] hover:scale-110 shadow-2xl transition-all duration-300 z-30"
                  title="Take Snapshot"
                >
                  <i className="ti ti-camera text-xl"></i>
                </button>
              )}

              {/* Snapchat Horizontal Carousel overlay */}
              <div className="absolute bottom-6 left-0 right-0 px-16 flex justify-center z-20">
                <div className="flex items-center gap-3 overflow-x-auto max-w-full py-2 px-4 scrollbar-none scroll-smooth">
                  {jewelleryList
                    .filter((item) => {
                      if (activeCategoryFilter === 'all') return true;
                      const itemCat = (item.category || '').toLowerCase();
                      if (activeCategoryFilter === 'earrings') {
                        return itemCat.includes('earring') || itemCat.includes('earrings');
                      }
                      if (activeCategoryFilter === 'necklace') {
                        return itemCat.includes('necklace') || itemCat.includes('set');
                      }
                      return itemCat === activeCategoryFilter;
                    })
                    .map((item) => {
                      const isActive = selectedJewellery?._id === item._id;
                      return (
                        <button
                          key={item._id}
                          onClick={() => setSelectedJewellery(item)}
                          className={`flex-shrink-0 relative w-16 h-16 rounded-full border-2 transition-all duration-300 ${
                            isActive 
                              ? 'border-[#FF2E63] bg-gradient-to-r from-[#FF2E63] to-[#FF6B8B] scale-110 shadow-[0_0_15px_rgba(255,46,99,0.6)]' 
                              : 'border-white/50 bg-black/40 hover:border-white hover:scale-105'
                          } p-0.5 overflow-hidden`}
                          title={item.name}
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </button>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
