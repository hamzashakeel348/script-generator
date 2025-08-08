"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function SupportPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box className="flex flex-col gap-2 bg-white p-8 rounded-lg shadow-md">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Contact Support
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here you can contact our support team for anything related to your
          account.
        </Typography>
      </Box>

      <Box className="flex flex-col gap-2 p-8 mt-4 rounded-lg shadow-md">
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Support
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill out this form with as much detail as possible. We typically
            respond within 30 minutes.
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={handleInputChange("name")}
            required
            disabled={loading}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            disabled={loading}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Subject"
              value={formData.subject}
              onChange={handleInputChange("subject")}
              required
              disabled={loading}
              variant="outlined"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={6}
              value={formData.message}
              onChange={handleInputChange("message")}
              required
              disabled={loading}
              variant="outlined"
              placeholder="Please describe your issue or question in detail..."
            />
          </Box>

          <Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                width: "50%",
                backgroundColor: "#2463EB",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "none",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              {loading ? "Sending..." : "Contact Support"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
