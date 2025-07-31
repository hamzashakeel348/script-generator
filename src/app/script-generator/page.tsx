"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";

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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateScript = () => {
    setScript(
      `Introducing ${form.productName}! Perfect for ${form.audience}.\n\nKey Benefits:\n${form.benefits}\n\nCall to Action: ${form.cta}`
    );
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Box sx={{ maxWidth: "lg", margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Form Panel */}
          <Box sx={{ flex: 1 }}>
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
                  sx={{ fontWeight: "bold" }}
                >
                  Industry*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Platform*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Script Type*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Video Duration*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Product Name*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Key Benefits*
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
                  sx={{ fontWeight: "bold" }}
                >
                  Target Audience*
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

                <Button variant="contained" onClick={generateScript}>
                  Generate Script
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Right Script Output Panel */}
          <Box sx={{ flex: 1 }}>
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
                Your generated script will appear in the box below. You can
                edit, copy or save it to the library once you are happy with the
                end result.
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
                    border: "2px dashed lightgray", // <-- apply custom border here
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray", // optional hover effect
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black", // optional focus effect
                  },
                }}
              />

              <Box display="flex" gap={2} mt={3}>
                <Button
                  variant="contained"
                  onClick={() => navigator.clipboard.writeText(script)}
                >
                  Copy
                </Button>
                <Button variant="outlined" onClick={generateScript}>
                  Regenerate
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => alert("Saved to library!")}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
