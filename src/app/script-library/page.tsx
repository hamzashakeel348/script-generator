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
  CircularProgress,
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
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);

  const [script, setScript] = useState<Script>({
    _id: "",
    content: "",
    title: "",
    type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const fetchScripts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/scripts?page=${page}&limit=${pageSize}&type=${type}`
      );
      const data = await response.json();
      console.log(data);
      setScripts(data.scripts);
      setTotalPages(data.pagination.totalPages);
      setPage(data.pagination.page);
      setPageSize(data.pagination.pageSize);
    } catch (error) {
      toast.error("Failed to fetch scripts");
    } finally {
      setLoading(false);
    }
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

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/scripts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Script deleted");
      setModalOpen(false);
      fetchScripts();
    } catch (error) {
      toast.error("Failed to delete script");
    }
  };

  const buttonStyle = {
    backgroundColor: "#2463EB",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "none",
    borderRadius: "10px",
    padding: "5px 10px",
  };

  const selectStyle = {
    marginLeft: "10px",
    width: "100px",
    height: "30px",
    borderRadius: "10px",
    padding: "5px 10px",
    border: "1px solid #D9D9D999",
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
      <Box className="flex gap-2  p-4 mt-4 items-center justify-between">
        <div>
          Scripts per page:
          <Select
            sx={selectStyle}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
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
            sx={selectStyle}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Unboxing">Unboxing</MenuItem>
            <MenuItem value="Product Review">Product Review</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
            <MenuItem value="Testimonial">Testmonial</MenuItem>
          </Select>
        </div>
        <div>
          <Button onClick={() => setPage(page - 1)}>Previous</Button> Page{" "}
          {page} of {totalPages}
          <Button onClick={() => setPage(page + 1)}>Next</Button>{" "}
        </div>
      </Box>
      {loading ? (
        <CircularProgress className="mt-4 text-center" />
      ) : scripts?.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-center p-4"
        >
          No scripts found
        </Typography>
      ) : (
        <>
          <Box>
            {scripts?.map((script: Script) => {
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
                      sx={buttonStyle}
                      onClick={() => {
                        navigator.clipboard.writeText(script.content);
                        toast.success("Script copied to clipboard");
                      }}
                    >
                      Copy script
                    </Button>
                    <Button
                      sx={{
                        ...buttonStyle,
                        color: "black",
                        backgroundColor: "white",
                        border: "1px solid #D9D9D999",
                      }}
                      onClick={() => {
                        setModalOpen(true);
                        setScript(script);
                      }}
                    >
                      Edit script
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(script._id)}
                      sx={{
                        ...buttonStyle,
                        color: "black",
                        backgroundColor: "white",
                        border: "1px solid #D9D9D999",
                      }}
                    >
                      Delete
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
            <Box className="bg-white p-8 rounded-[16px] shadow-md flex flex-col gap-4 w-1/2">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontStyle: "SemiBold",
                  fontSize: "24px",
                  leadingTrim: "NONE",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {script?.title}
              </Typography>

              <TextField
                value={script?.content || ""}
                onChange={(e) =>
                  setScript({ ...script, content: e.target.value })
                }
                multiline
                rows={10}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ ...buttonStyle, width: "100%" }}
              >
                Save
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}
