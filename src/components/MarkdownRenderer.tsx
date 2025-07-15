import React from "react";
import Markdown from "markdown-to-jsx";
import { Paper } from "@mui/material";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => (
  <Paper elevation={0} sx={{ p: 2, background: "#fafbfc" }}>
    <Markdown
      options={{
        overrides: {
          h1: { component: "h2", props: { style: { color: "#1976d2" } } },
          code: {
            props: {
              style: {
                background: "#f5f5f5",
                padding: "2px 4px",
                borderRadius: 4,
              },
            },
          },
        },
      }}
    >
      {content}
    </Markdown>
  </Paper>
);

export default MarkdownRenderer;
