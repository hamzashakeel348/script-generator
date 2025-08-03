"use client";

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";

export default function ScriptGeneratorPage() {
  const [form, setForm] = useState({
    industry: "",
    platform: "",
    type: "",
    duration: "",
    productName: "",
    benefits: "",
    audience: "",
    cta: "",
  });

  const [script, setScript] = useState("");

  const handleReset = () => {
    setForm({
      industry: "",
      platform: "",
      type: "",
      duration: "",
      productName: "",
      benefits: "",
      audience: "",
      cta: "",
    });
    setScript("");
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateScript = async () => {
    setScript(
      `Introducing ${form.productName}! Perfect for ${form.audience}.\n\nKey Benefits:\n${form.benefits}\n\nCall to Action: ${form.cta}`
    );
  };

  const handleSave = async () => {
    try {
      await fetch("/api/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Script",
          content: script,
          type: form.type,
        }),
      });
      toast.success("Script saved");
      handleReset();
    } catch (error) {
      toast.error("Failed to save script");
    }
  };

  const typographyStyle = {
    fontWeight: "600",
    color: "black",
    fontSize: "14px",
    textTransform: "none",
  };

  const buttonStyle = {
    width: "33%",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "black",
    fontWeight: "500",
    fontStyle: "Medium",
    fontSize: "14px",
    textTransform: "none",
    border: "1px solid #D9D9D999",
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Form Panel */}
      <Box
        sx={{
          border: "1px solid #D9D9D999",
          borderRadius: 3,
          width: "35%",
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Script Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Configure your script's parameters and content requirements
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Industry or niche*
            </Typography>
            <Select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">Select Industry</MenuItem>
              <MenuItem value="Fitness">Fitness</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
            </Select>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Primary platform*
            </Typography>
            <Select
              name="platform"
              value={form.platform}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">Select Platform</MenuItem>
              <MenuItem value="YouTube">YouTube</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
            </Select>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Script type*
            </Typography>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">Select Script Type</MenuItem>
              <MenuItem value="Promo">Promo</MenuItem>
              <MenuItem value="Tutorial">Tutorial</MenuItem>
            </Select>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Video duration*
            </Typography>
            <Select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">Select Video Duration</MenuItem>
              <MenuItem value="15s">15 sec</MenuItem>
              <MenuItem value="30s">30 sec</MenuItem>
            </Select>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Product name*
            </Typography>
            <TextField
              name="productName"
              label="Product Name"
              value={form.productName}
              onChange={handleChange}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Key Benefits (3-5)*
            </Typography>
            <TextField
              name="benefits"
              label="Key Benefits (3-5)"
              multiline
              rows={3}
              value={form.benefits}
              onChange={handleChange}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              Target audience*
            </Typography>
            <TextField
              name="audience"
              label="Target Audience"
              value={form.audience}
              onChange={handleChange}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Desired CTA*
            </Typography>
            <TextField
              name="cta"
              label="Call To Action"
              value={form.cta}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              onClick={generateScript}
              sx={{
                backgroundColor: "#2463EB",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "none",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              Generate Script
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Right Script Output Panel */}
      <Box
        sx={{
          flex: 1,
          border: "1px solid #D9D9D999",
          borderRadius: 3,
          width: "60%",
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Generated Script
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your generated script will appear in the box below. You can edit,
            copy or save it to the library once you are happy with the end
            result.
          </Typography>

          <TextField
            multiline
            rows={12}
            fullWidth
            value={script}
            variant="outlined"
            onChange={(e) => setScript(e.target.value)}
            sx={{
              mt: 2,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px dashed lightgray",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            }}
          />

          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(script);
                toast.success("Script copied to clipboard");
              }}
              sx={{
                ...buttonStyle,
                backgroundColor: "#2463EB",
                color: "white",
              }}
            >
              Copy
            </Button>
            <Button
              variant="outlined"
              onClick={generateScript}
              sx={buttonStyle}
            >
              Regenerate Script
            </Button>
            <Button variant="outlined" onClick={handleSave} sx={buttonStyle}>
              Save to library
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
