import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3001;

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: string;
};

const mockUsers: User[] = Array.from({ length: 73 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  age: 18 + (i % 10),
  createdAt: new Date(2023, i % 12, 1).toISOString(),
}));

app.get("/api/users", (req, res) => {
  const {
    page = 1,
    size = 10,
    sortBy = "id",
    sortOrder = "asc",
    search = "",
  } = req.query;

  let result = [...mockUsers];

  if (search) {
    result = result.filter((u) =>
      u.name.toLowerCase().includes(String(search).toLowerCase())
    );
  }

  if (sortBy) {
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof User];
      const bVal = b[sortBy as keyof User];

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const pageInt = parseInt(String(page), 10);
  const sizeInt = parseInt(String(size), 10);
  const start = (pageInt - 1) * sizeInt;
  const paginated = result.slice(start, start + sizeInt);

  res.json({
    status: true,
    data: { records: paginated },
    total: result.length,
    current: pageInt,
    pages: Math.ceil(result.length / sizeInt),
    size: sizeInt,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Mock server running at http://localhost:${PORT}`);
});
