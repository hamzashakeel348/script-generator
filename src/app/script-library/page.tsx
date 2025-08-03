"use client";

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import toast from "react-hot-toast";

type Script = {
  _id: string;
  content: string;
  title: string;
  type: string;
};

export default function ScriptLibraryPage() {
  const [scripts, setScripts] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");

  const [script, setScript] = useState<Script>({
    _id: "",
    content: "",
    title: "",
    type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const fetchScripts = async () => {
    const response = await fetch(
      `/api/scripts?page=${page}&limit=${pageSize}&type=${type}`
    );
    const data = await response.json();
    setScripts(data.scripts);
    setTotalPages(data.pagination.totalPages);
    setPage(data.pagination.page);
    setPageSize(data.pagination.pageSize);
  };

  useEffect(() => {
    if (page && pageSize) {
      fetchScripts();
    }
  }, [page, pageSize, type]);

  const handleSave = async () => {
    try {
      await fetch(`/api/scripts/${script._id}`, {
        method: "PATCH",
        body: JSON.stringify({ content: script.content }),
      });
      toast.success("Script saved");
      setModalOpen(false);
      fetchScripts();
    } catch (error) {
      toast.error("Failed to save script");
    }
  };

  return (
    <Box>
      <Box className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Script Library
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here you can find all your scripts. You can click on each one to edit
          it or copy it so you can use it straight away.
        </Typography>
      </Box>
      <Box className="flex gap-2 bg-white p-4 rounded-lg shadow-md mt-4 items-center justify-between">
        <div>
          Scripts per page:
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Filter by Script Type*
          </Typography>
          <Select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Promo">Promo</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
          </Select>
        </div>
        <div>
          Page {page} of {totalPages}
          <Button onClick={() => setPage(page - 1)}>Previous</Button>{" "}
          <Button onClick={() => setPage(page + 1)}>Next</Button>{" "}
        </div>
      </Box>
      <Box>
        {scripts.map((script: Script) => {
          return (
            <Box
              key={script._id}
              className="bg-white p-4 rounded-lg shadow-md mt-4"
            >
              <Typography>{script?.title}</Typography>
              <Typography>{script?.content}</Typography>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(script.content);
                    toast.success("Script copied to clipboard");
                  }}
                >
                  Copy script
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setModalOpen(true);
                    setScript(script);
                  }}
                >
                  Edit script
                </Button>
              </div>
            </Box>
          );
        })}
      </Box>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="flex items-center justify-center"
      >
        <Box className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 w-1/2">
          <Typography variant="h6">Edit Script</Typography>
          <Typography variant="body2" color="text.secondary">
            Title: {script?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {script?.type}
          </Typography>
          <TextField
            value={script?.content || ""}
            onChange={(e) => setScript({ ...script, content: e.target.value })}
            multiline
            rows={10}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
