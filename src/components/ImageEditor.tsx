import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageEditorProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (editedImage: Blob) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  open,
  onClose,
  imageUrl,
  onSave,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSave = async () => {
    if (!imageRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar o canvas com as dimensões da área de corte
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    canvas.width = crop.width
      ? crop.width * scaleX
      : imageRef.current.naturalWidth;
    canvas.height = crop.height
      ? crop.height * scaleY
      : imageRef.current.naturalHeight;

    // Aplicar rotação se necessário
    if (rotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    // Desenhar a imagem com os ajustes
    ctx.drawImage(
      imageRef.current,
      crop.x ? crop.x * scaleX : 0,
      crop.y ? crop.y * scaleY : 0,
      crop.width ? crop.width * scaleX : imageRef.current.naturalWidth,
      crop.height ? crop.height * scaleY : imageRef.current.naturalHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Converter para blob e salvar
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onSave(blob);
          onClose();
        }
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajustar Imagem</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ width: "100%", maxHeight: "500px", overflow: "auto" }}>
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1}>
              <img
                ref={imageRef}
                src={imageUrl}
                style={{
                  maxWidth: "100%",
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: "transform 0.3s",
                }}
                alt="Imagem para edição"
              />
            </ReactCrop>
          </Box>

          <Box sx={{ px: 2 }}>
            <Typography gutterBottom>Zoom</Typography>
            <Slider
              value={zoom}
              onChange={(_, newValue) => setZoom(newValue as number)}
              min={0.5}
              max={2}
              step={0.1}
              marks
              valueLabelDisplay="auto"
            />

            <Typography gutterBottom>Rotação</Typography>
            <Slider
              value={rotation}
              onChange={(_, newValue) => setRotation(newValue as number)}
              min={-180}
              max={180}
              step={90}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageEditor;
